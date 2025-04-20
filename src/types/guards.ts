import { Mindmap, Node, Relationship } from './mindmap';

// Type Guards
export const isNode = (value: unknown): value is Node => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'position' in value &&
    typeof (value as Node).position.x === 'number' &&
    typeof (value as Node).position.y === 'number'
  );
};

export const isRelationship = (value: unknown): value is Relationship => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'source' in value &&
    'target' in value &&
    'type' in value
  );
};

export const isMindmap = (value: unknown): value is Mindmap => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'metadata' in value &&
    'nodes' in value &&
    'relationships' in value &&
    Array.isArray((value as Mindmap).nodes) &&
    Array.isArray((value as Mindmap).relationships)
  );
};

// Helper Types
export type NodeId = string;
export type RelationshipId = string;
export type MindmapId = string;

export type NodePosition = {
  x: number;
  y: number;
};

export type NodeStyle = {
  color?: string;
  size?: number;
  shape?: 'circle' | 'square' | 'diamond';
};

export type RelationshipStyle = {
  color?: string;
  width?: number;
  dashArray?: string;
};

export type CharacterAttributes = Record<string, any>;

// Type Tests
export const testNode: Node = {
  id: 'test',
  name: 'Test Node',
  position: { x: 0, y: 0 },
};

export const testRelationship: Relationship = {
  id: 'test',
  source: 'node1',
  target: 'node2',
  type: 'test',
};

export const testMindmap: Mindmap = {
  id: 'test',
  name: 'Test Mindmap',
  metadata: {
    created: new Date(),
    modified: new Date(),
    owner: 'test',
  },
  nodes: [testNode],
  relationships: [testRelationship],
}; 