import React, { useState, useEffect } from 'react';
import { Relationship } from '../../types/mindmap';
import './RelationshipEditor.css';

const RELATIONSHIP_TYPES = [
  'Family',
  'Friend',
  'Colleague',
  'Romantic',
  'Rival',
  'Mentor',
  'Custom',
] as const;

interface RelationshipEditorProps {
  relationship?: Relationship;
  sourceCharacter: string;
  targetCharacter: string;
  onSave: (relationship: Partial<Relationship>) => void;
  onCancel: () => void;
}

export const RelationshipEditor: React.FC<RelationshipEditorProps> = ({
  relationship,
  sourceCharacter,
  targetCharacter,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Relationship>>({
    type: 'Friend',
    label: '',
    properties: {},
  });
  const [isCustomType, setIsCustomType] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (relationship) {
      setFormData({
        type: relationship.type,
        label: relationship.label || '',
        properties: relationship.properties || {},
      });
      setIsCustomType(!RELATIONSHIP_TYPES.includes(relationship.type as any));
    }
  }, [relationship]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.type?.trim()) {
      newErrors.type = 'Type is required';
    }
    
    if (isCustomType && !formData.type?.trim()) {
      newErrors.type = 'Custom type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'type') {
      setIsCustomType(value === 'Custom');
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form className="relationship-editor" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="type">Relationship Type *</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={errors.type ? 'error' : ''}
        >
          {RELATIONSHIP_TYPES.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && <span className="error-message">{errors.type}</span>}
      </div>

      {isCustomType && (
        <div className="form-group">
          <label htmlFor="customType">Custom Type *</label>
          <input
            type="text"
            id="customType"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={errors.type ? 'error' : ''}
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="label">Label</label>
        <input
          type="text"
          id="label"
          name="label"
          value={formData.label}
          onChange={handleChange}
          placeholder="Optional description"
        />
      </div>

      <div className="relationship-preview">
        <div className="characters">
          <span className="character">{sourceCharacter}</span>
          <span className="arrow">→</span>
          <span className="character">{targetCharacter}</span>
        </div>
        <div className="type">{formData.type}</div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">
          Save
        </button>
      </div>
    </form>
  );
}; 