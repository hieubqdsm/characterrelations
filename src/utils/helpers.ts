import { Mindmap, Node, Relationship } from '../types/mindmap';

// ID Generation
export const generateId = (prefix: string = ''): string => {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
};

// Validation
export const isValidNode = (node: Partial<Node>): boolean => {
  return Boolean(
    node.id &&
    node.name &&
    node.position &&
    typeof node.position.x === 'number' &&
    typeof node.position.y === 'number'
  );
};

export const isValidRelationship = (relationship: Partial<Relationship>): boolean => {
  return Boolean(
    relationship.id &&
    relationship.source &&
    relationship.target &&
    relationship.type
  );
};

export const isValidMindmap = (mindmap: Partial<Mindmap>): boolean => {
  return Boolean(
    mindmap.id &&
    mindmap.name &&
    mindmap.metadata &&
    mindmap.metadata.created &&
    mindmap.metadata.modified &&
    mindmap.metadata.owner &&
    Array.isArray(mindmap.nodes) &&
    Array.isArray(mindmap.relationships)
  );
};

// Data Transformation
export const createNode = (data: Partial<Node>): Node => {
  return {
    id: data.id || generateId('node_'),
    name: data.name || 'Unnamed Node',
    description: data.description,
    position: data.position || { x: 0, y: 0 },
    style: data.style,
    character: data.character,
  };
};

export const createRelationship = (data: Partial<Relationship>): Relationship => {
  return {
    id: data.id || generateId('rel_'),
    source: data.source || '',
    target: data.target || '',
    type: data.type || 'default',
    metadata: data.metadata,
    style: data.style,
    label: data.label,
  };
};

export const createMindmap = (data: Partial<Mindmap>): Mindmap => {
  const now = new Date();
  return {
    id: data.id || generateId('map_'),
    name: data.name || 'Unnamed Mindmap',
    description: data.description,
    metadata: {
      created: data.metadata?.created || now,
      modified: data.metadata?.modified || now,
      owner: data.metadata?.owner || 'anonymous',
    },
    nodes: data.nodes || [],
    relationships: data.relationships || [],
  };
};

// Error Handling
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateAndCreateNode = (data: Partial<Node>): Node => {
  if (!isValidNode(data)) {
    throw new ValidationError('Invalid node data');
  }
  return createNode(data);
};

export const validateAndCreateRelationship = (data: Partial<Relationship>): Relationship => {
  if (!isValidRelationship(data)) {
    throw new ValidationError('Invalid relationship data');
  }
  return createRelationship(data);
};

export const validateAndCreateMindmap = (data: Partial<Mindmap>): Mindmap => {
  if (!isValidMindmap(data)) {
    throw new ValidationError('Invalid mindmap data');
  }
  return createMindmap(data);
}; 