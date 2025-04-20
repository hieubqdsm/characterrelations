import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { mindmap } = useStore();

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>{mindmap?.name || 'Character Relations'}</h2>
        <button 
          className="collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="panel">
          <h3>Characters</h3>
          <div className="character-list">
            {/* Character list will be implemented here */}
          </div>
        </div>

        <div className="panel">
          <h3>Relationships</h3>
          <div className="relationship-list">
            {/* Relationship list will be implemented here */}
          </div>
        </div>
      </div>
    </div>
  );
}; 