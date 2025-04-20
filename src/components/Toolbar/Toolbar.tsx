import React from 'react';
import './Toolbar.css';

interface ToolbarProps {
  onAddCharacter: () => void;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  isSaving: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddCharacter,
  onSave,
  onUndo,
  onRedo,
  isSaving,
  canUndo,
  canRedo,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <button 
          className="toolbar-button"
          onClick={onAddCharacter}
          title="Add Character"
        >
          <span className="icon">+</span>
          <span className="label">Add Character</span>
        </button>
      </div>

      <div className="toolbar-section">
        <button 
          className="toolbar-button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo"
        >
          <span className="icon">↩</span>
          <span className="label">Undo</span>
        </button>
        <button 
          className="toolbar-button"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo"
        >
          <span className="icon">↪</span>
          <span className="label">Redo</span>
        </button>
      </div>

      <div className="toolbar-section">
        <button 
          className="toolbar-button save-button"
          onClick={onSave}
          disabled={isSaving}
          title="Save"
        >
          <span className="icon">{isSaving ? '⏳' : '💾'}</span>
          <span className="label">{isSaving ? 'Saving...' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
}; 