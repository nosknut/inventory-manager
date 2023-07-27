import type { InventoryItem } from "$lib/types/InventoryItem";
import { persisted } from 'svelte-local-storage-store'

export const selectedItem = persisted<InventoryItem | null>("stores/selectedItem", null);
