import { Mindmap } from '../../../types/mindmap';
import { StorageService, StorageError, StorageConfig } from './types';

export class LocalStorageService implements StorageService {
  private readonly STORAGE_KEY = 'mindmaps';
  private readonly VERSION_KEY = 'mindmap_versions';
  private autoSaveInterval: number | null = null;
  private config: StorageConfig;

  constructor(config: StorageConfig = {}) {
    this.config = {
      autoSaveInterval: 30000, // 30 seconds
      maxVersions: 5,
      versionPrefix: 'v',
      ...config,
    };
  }

  private getStorageKey(id: string): string {
    return `${this.STORAGE_KEY}_${id}`;
  }

  private getVersionKey(id: string, version: string): string {
    return `${this.VERSION_KEY}_${id}_${version}`;
  }

  private async saveToStorage(key: string, data: any): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      throw new StorageError('Failed to save to storage', {
        code: 'STORAGE_ERROR',
        details: error,
      });
    }
  }

  private async loadFromStorage<T>(key: string): Promise<T | null> {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw new StorageError('Failed to load from storage', {
        code: 'STORAGE_ERROR',
        details: error,
      });
    }
  }

  async saveMindmap(mindmap: Mindmap): Promise<void> {
    const key = this.getStorageKey(mindmap.id);
    const now = new Date();
    
    // Update metadata
    mindmap.metadata.modified = now;
    
    // Save current version
    await this.saveToStorage(key, mindmap);
    
    // Save version history
    if (this.config.maxVersions && this.config.maxVersions > 0) {
      const versionKey = this.getVersionKey(mindmap.id, `${this.config.versionPrefix}${now.getTime()}`);
      await this.saveToStorage(versionKey, mindmap);
      
      // Clean up old versions
      await this.cleanupVersions(mindmap.id);
    }
  }

  async loadMindmap(id: string): Promise<Mindmap | null> {
    const key = this.getStorageKey(id);
    return this.loadFromStorage<Mindmap>(key);
  }

  async listMindmaps(): Promise<Mindmap[]> {
    const mindmaps: Mindmap[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.STORAGE_KEY)) {
        const mindmap = await this.loadFromStorage<Mindmap>(key);
        if (mindmap) {
          mindmaps.push(mindmap);
        }
      }
    }
    return mindmaps;
  }

  async deleteMindmap(id: string): Promise<void> {
    const key = this.getStorageKey(id);
    localStorage.removeItem(key);
    
    // Delete all versions
    for (let i = 0; i < localStorage.length; i++) {
      const versionKey = localStorage.key(i);
      if (versionKey?.startsWith(`${this.VERSION_KEY}_${id}`)) {
        localStorage.removeItem(versionKey);
      }
    }
  }

  async getLastModified(id: string): Promise<Date | null> {
    const mindmap = await this.loadMindmap(id);
    return mindmap?.metadata.modified || null;
  }

  private async cleanupVersions(id: string): Promise<void> {
    if (!this.config.maxVersions) return;

    const versions: { key: string; timestamp: number }[] = [];
    
    // Collect all versions
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`${this.VERSION_KEY}_${id}`)) {
        const timestamp = parseInt(key.split('_').pop() || '0', 10);
        versions.push({ key: key, timestamp });
      }
    }
    
    // Sort by timestamp (newest first)
    versions.sort((a, b) => b.timestamp - a.timestamp);
    
    // Remove excess versions
    while (versions.length > this.config.maxVersions) {
      const version = versions.pop();
      if (version) {
        localStorage.removeItem(version.key);
      }
    }
  }

  startAutoSave(mindmap: Mindmap, interval: number = this.config.autoSaveInterval || 30000): void {
    this.stopAutoSave();
    this.autoSaveInterval = window.setInterval(() => {
      this.saveMindmap(mindmap).catch(error => {
        console.error('Auto-save failed:', error);
      });
    }, interval);
  }

  stopAutoSave(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  }
} 