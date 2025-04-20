export interface Mindmap {
  id: string;
  name: string;
  description?: string;
  metadata: {
    created: Date;
    modified: Date;
    owner: string;
  };
  nodes: Node[];
  relationships: Relationship[];
}

export interface Node {
  id: string;
  name: string;
  description?: string;
  position: {
    x: number;
    y: number;
  };
  style?: {
    color?: string;
    size?: number;
    shape?: 'circle' | 'square' | 'diamond';
  };
  character?: {
    image?: string;
    attributes?: Record<string, any>;
  };
}

export interface Relationship {
  id: string;
  source: string; // Node ID
  target: string; // Node ID
  type: string;
  metadata?: Record<string, any>;
  style?: {
    color?: string;
    width?: number;
    dashArray?: string;
  };
  label?: string;
} 