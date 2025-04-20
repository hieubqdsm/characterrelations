import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Node as MindmapNode } from '../../types/mindmap';
import './CharacterNode.css';

interface CharacterNodeData extends MindmapNode {
  onUpdate: (updates: Partial<MindmapNode>) => void;
}

export const CharacterNode: React.FC<NodeProps<CharacterNodeData>> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description || '');

  const handleSave = () => {
    data.onUpdate({
      name,
      description,
    });
    setIsEditing(false);
  };

  return (
    <div className="character-node">
      <Handle type="target" position={Position.Top} />
      <div className="character-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Character name"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Character description"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div className="display-content">
            <h3>{data.name}</h3>
            {data.description && <p>{data.description}</p>}
            {data.character?.image && (
              <img src={data.character.image} alt={data.name} className="character-image" />
            )}
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}; 