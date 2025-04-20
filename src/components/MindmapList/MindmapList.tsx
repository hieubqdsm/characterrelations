import React, { useState } from 'react';
import { Mindmap } from '../../types/mindmap';
import './MindmapList.css';

interface MindmapListProps {
  mindmaps: Mindmap[];
  onSelect: (mindmap: Mindmap) => void;
  onDelete: (mindmap: Mindmap) => void;
  onShare: (mindmap: Mindmap) => void;
}

export const MindmapList: React.FC<MindmapListProps> = ({
  mindmaps,
  onSelect,
  onDelete,
  onShare,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredMindmaps = mindmaps
    .filter(mindmap => 
      mindmap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mindmap.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleSort = (field: 'name' | 'date') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="mindmap-list">
      <div className="controls">
        <div className="search">
          <input
            type="text"
            placeholder="Search mindmaps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="view-options">
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            ⏹️
          </button>
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            📋
          </button>
        </div>

        <div className="sort-options">
          <button
            className={sortBy === 'name' ? 'active' : ''}
            onClick={() => handleSort('name')}
          >
            Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            className={sortBy === 'date' ? 'active' : ''}
            onClick={() => handleSort('date')}
          >
            Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className={`mindmap-container ${viewMode}`}>
        {filteredMindmaps.map(mindmap => (
          <div key={mindmap.id} className="mindmap-card">
            <div className="mindmap-header">
              <h3>{mindmap.name}</h3>
              <div className="actions">
                <button onClick={() => onShare(mindmap)} title="Share">
                  🔗
                </button>
                <button onClick={() => onDelete(mindmap)} title="Delete">
                  🗑️
                </button>
              </div>
            </div>
            
            {mindmap.description && (
              <p className="description">{mindmap.description}</p>
            )}
            
            <div className="mindmap-footer">
              <span className="date">
                Created: {new Date(mindmap.createdAt).toLocaleDateString()}
              </span>
              <button 
                className="select-button"
                onClick={() => onSelect(mindmap)}
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 