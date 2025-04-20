import { create } from 'zustand';
import { Mindmap, Node, Relationship } from '../types/mindmap';

interface MindmapState {
  mindmap: Mindmap | null;
  nodes: Node[];
  relationships: Relationship[];
  selectedNodeId: string | null;
  selectedRelationshipId: string | null;
  setMindmap: (mindmap: Mindmap) => void;
  addNode: (node: Node) => void;
  updateNode: (nodeId: string, updates: Partial<Node>) => void;
  removeNode: (nodeId: string) => void;
  addRelationship: (relationship: Relationship) => void;
  updateRelationship: (relationshipId: string, updates: Partial<Relationship>) => void;
  removeRelationship: (relationshipId: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  setSelectedRelationship: (relationshipId: string | null) => void;
}

export const useStore = create<MindmapState>((set) => ({
  mindmap: null,
  nodes: [],
  relationships: [],
  selectedNodeId: null,
  selectedRelationshipId: null,

  setMindmap: (mindmap) => set({ mindmap, nodes: mindmap.nodes, relationships: mindmap.relationships }),

  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node],
    mindmap: state.mindmap ? {
      ...state.mindmap,
      nodes: [...state.mindmap.nodes, node]
    } : null
  })),

  updateNode: (nodeId, updates) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ),
    mindmap: state.mindmap ? {
      ...state.mindmap,
      nodes: state.mindmap.nodes.map(node =>
        node.id === nodeId ? { ...node, ...updates } : node
      )
    } : null
  })),

  removeNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== nodeId),
    relationships: state.relationships.filter(rel => 
      rel.source !== nodeId && rel.target !== nodeId
    ),
    mindmap: state.mindmap ? {
      ...state.mindmap,
      nodes: state.mindmap.nodes.filter(node => node.id !== nodeId),
      relationships: state.mindmap.relationships.filter(rel =>
        rel.source !== nodeId && rel.target !== nodeId
      )
    } : null
  })),

  addRelationship: (relationship) => set((state) => ({
    relationships: [...state.relationships, relationship],
    mindmap: state.mindmap ? {
      ...state.mindmap,
      relationships: [...state.mindmap.relationships, relationship]
    } : null
  })),

  updateRelationship: (relationshipId, updates) => set((state) => ({
    relationships: state.relationships.map(rel =>
      rel.id === relationshipId ? { ...rel, ...updates } : rel
    ),
    mindmap: state.mindmap ? {
      ...state.mindmap,
      relationships: state.mindmap.relationships.map(rel =>
        rel.id === relationshipId ? { ...rel, ...updates } : rel
      )
    } : null
  })),

  removeRelationship: (relationshipId) => set((state) => ({
    relationships: state.relationships.filter(rel => rel.id !== relationshipId),
    mindmap: state.mindmap ? {
      ...state.mindmap,
      relationships: state.mindmap.relationships.filter(rel => rel.id !== relationshipId)
    } : null
  })),

  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),
  setSelectedRelationship: (relationshipId) => set({ selectedRelationshipId: relationshipId }),
})); 