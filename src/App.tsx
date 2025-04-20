import { useState } from 'react'
import './App.css'
import { Canvas } from './components/Canvas/Canvas'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Toolbar } from './components/Toolbar/Toolbar'
import { Header } from './components/Header/Header'
import { CharacterEditor } from './components/CharacterEditor/CharacterEditor'
import { RelationshipEditor } from './components/RelationshipEditor/RelationshipEditor'
import { MindmapList } from './components/MindmapList/MindmapList'
import { ThemeProvider, useTheme } from './components/ThemeProvider/ThemeProvider'
import { useStore } from './store/useStore'
import { createMindmap } from './utils/helpers'

function AppContent() {
  const { mindmap, setMindmap, nodes, relationships, addNode, updateNode, addRelationship } = useStore();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [selectedRelationship, setSelectedRelationship] = useState<string | null>(null);
  const [showCharacterEditor, setShowCharacterEditor] = useState(false);
  const [showRelationshipEditor, setShowRelationshipEditor] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Initialize a new mindmap if none exists
  if (!isInitialized && !mindmap) {
    const newMindmap = createMindmap({
      name: 'Character Relationships',
      description: 'A mindmap for tracking character relationships',
    });
    setMindmap(newMindmap);
    setIsInitialized(true);
  }

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving to storage
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleAddCharacter = () => {
    setShowCharacterEditor(true);
  };

  const handleSaveCharacter = (character: Partial<MindmapNode>) => {
    if (selectedCharacter) {
      updateNode(selectedCharacter, character);
    } else {
      addNode({
        id: `node_${Date.now()}`,
        name: character.name || 'New Character',
        description: character.description,
        image: character.image,
        position: { x: 100, y: 100 },
      });
    }
    setShowCharacterEditor(false);
    setSelectedCharacter(null);
  };

  const handleSaveRelationship = (relationship: Partial<Relationship>) => {
    if (selectedRelationship) {
      // Update existing relationship
      // TODO: Implement relationship update
    } else {
      // Add new relationship
      // TODO: Implement relationship creation
    }
    setShowRelationshipEditor(false);
    setSelectedRelationship(null);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  if (!mindmap) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <Header onThemeChange={toggleTheme} isDarkMode={isDarkMode} />
      <div className="app-content">
        <Sidebar onCollapse={handleSidebarCollapse} />
        <main className={`app-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Toolbar
            onAddCharacter={handleAddCharacter}
            onSave={handleSave}
            onUndo={() => {}}
            onRedo={() => {}}
            isSaving={isSaving}
            canUndo={false}
            canRedo={false}
          />
          <div className="canvas-container">
            <Canvas mindmap={mindmap} />
          </div>
        </main>
      </div>

      {showCharacterEditor && (
        <div className="modal">
          <CharacterEditor
            character={selectedCharacter ? nodes.find(n => n.id === selectedCharacter) : undefined}
            onSave={handleSaveCharacter}
            onCancel={() => {
              setShowCharacterEditor(false);
              setSelectedCharacter(null);
            }}
          />
        </div>
      )}

      {showRelationshipEditor && (
        <div className="modal">
          <RelationshipEditor
            relationship={selectedRelationship ? relationships.find(r => r.id === selectedRelationship) : undefined}
            sourceCharacter=""
            targetCharacter=""
            onSave={handleSaveRelationship}
            onCancel={() => {
              setShowRelationshipEditor(false);
              setSelectedRelationship(null);
            }}
          />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App
