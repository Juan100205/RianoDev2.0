import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface InventoryItem {
  id: string;
  workflow_id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  image_url: string;
  created_at: string;
}

export type InventoryInput = Omit<InventoryItem, 'id' | 'workflow_id' | 'created_at'>;

export function useWorkflowInventory(workflowId: string) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('workflow_inventory')
        .select('*')
        .eq('workflow_id', workflowId)
        .order('name', { ascending: true });
      if (!error && data) setItems(data as InventoryItem[]);
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => {
    void fetchItems();
  }, [fetchItems]);

  const addItem = async (input: InventoryInput) => {
    const { error } = await supabase
      .from('workflow_inventory')
      .insert({ ...input, workflow_id: workflowId });
    if (!error) await fetchItems();
    return error;
  };

  const updateItem = async (id: string, updates: Partial<InventoryInput>) => {
    const { error } = await supabase
      .from('workflow_inventory')
      .update(updates)
      .eq('id', id);
    if (!error) await fetchItems();
    return error;
  };

  const deleteItem = async (id: string) => {
    const { error } = await supabase
      .from('workflow_inventory')
      .delete()
      .eq('id', id);
    if (!error) await fetchItems();
    return error;
  };

  return { items, loading, fetchItems, addItem, updateItem, deleteItem };
}
