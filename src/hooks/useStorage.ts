import { useState, useEffect, useCallback } from 'react';
import { Mindmap } from '../types/mindmap';
import { LocalStorageService } from '../services/storage/LocalStorageService';
import { StorageService } from '../services/storage/types';

export function useStorage(service: StorageService = new LocalStorageService()) {
  const [mindmaps, setMindmaps] = useState<Mindmap[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadMindmaps = useCallback(async () => {
    try {
      setLoading(true);
      const loadedMindmaps = await service.listMindmaps();
      setMindmaps(loadedMindmaps);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load mindmaps'));
    } finally {
      setLoading(false);
    }
  }, [service]);

  const saveMindmap = useCallback(async (mindmap: Mindmap) => {
    try {
      setLoading(true);
      await service.saveMindmap(mindmap);
      await loadMindmaps();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save mindmap'));
    } finally {
      setLoading(false);
    }
  }, [service, loadMindmaps]);

  const deleteMindmap = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await service.deleteMindmap(id);
      await loadMindmaps();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete mindmap'));
    } finally {
      setLoading(false);
    }
  }, [service, loadMindmaps]);

  const loadMindmap = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const mindmap = await service.loadMindmap(id);
      setError(null);
      return mindmap;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load mindmap'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadMindmaps();
  }, [loadMindmaps]);

  return {
    mindmaps,
    loading,
    error,
    saveMindmap,
    deleteMindmap,
    loadMindmap,
    refresh: loadMindmaps,
  };
} 