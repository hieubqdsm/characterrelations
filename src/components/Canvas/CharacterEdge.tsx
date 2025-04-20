import React, { useState } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from 'reactflow';
import { Relationship } from '../../types/mindmap';
import './CharacterEdge.css';

interface CharacterEdgeData extends Relationship {
  onUpdate?: (updates: Partial<Relationship>) => void;
}

export const CharacterEdge: React.FC<EdgeProps<CharacterEdgeData>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState(data.type);
  const [label, setLabel] = useState(data.label || '');

  const handleSave = () => {
    if (data.onUpdate) {
      data.onUpdate({
        type,
        label,
      });
    }
    setIsEditing(false);
  };

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          stroke: data.style?.color || '#b1b1b7',
          strokeWidth: data.style?.width || 2,
          strokeDasharray: data.style?.dashArray,
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: 'white',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '12px',
            pointerEvents: 'all',
          }}
          className="edge-label"
        >
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Relationship type"
              />
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Label"
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div className="display-content" onClick={() => setIsEditing(true)}>
              {data.label || data.type}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}; 