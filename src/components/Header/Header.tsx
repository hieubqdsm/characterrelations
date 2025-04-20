import React from 'react';
import { useStore } from '../../store/useStore';
import './Header.css';

interface HeaderProps {
  onThemeChange: () => void;
  isDarkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onThemeChange, isDarkMode }) => {
  const { mindmap } = useStore();

  return (
    <header className="header">
      <div className="header-left">
        <h1>{mindmap?.name || 'Character Relations'}</h1>
        {mindmap?.description && (
          <p className="description">{mindmap.description}</p>
        )}
      </div>

      <div className="header-right">
        <button 
          className="theme-toggle"
          onClick={onThemeChange}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}; 