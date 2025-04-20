import { useState } from 'react'
import './App.css'
import { Canvas } from './components/Canvas/Canvas'
import { useStore } from './store/useStore'
import { createMindmap } from './utils/helpers'

function App() {
  const { mindmap, setMindmap } = useStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize a new mindmap if none exists
  if (!isInitialized && !mindmap) {
    const newMindmap = createMindmap({
      name: 'Character Relationships',
      description: 'A mindmap for tracking character relationships',
    });
    setMindmap(newMindmap);
    setIsInitialized(true);
  }

  if (!mindmap) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>{mindmap.name}</h1>
        {mindmap.description && <p>{mindmap.description}</p>}
      </header>
      <main className="app-main">
        <Canvas mindmap={mindmap} />
      </main>
    </div>
  )
}

export default App
