import { Mindmap } from '../../../types/mindmap';

export interface StorageService {
  saveMindmap(mindmap: Mindmap): Promise<void>;
  loadMindmap(id: string): Promise<Mindmap | null>;
  listMindmaps(): Promise<Mindmap[]>;
  deleteMindmap(id: string): Promise<void>;
  getLastModified(id: string): Promise<Date | null>;
}

export interface StorageError extends Error {
  code: string;
  details?: any;
}

export interface StorageConfig {
  autoSaveInterval?: number; // in milliseconds
  maxVersions?: number;
  versionPrefix?: string;
} 