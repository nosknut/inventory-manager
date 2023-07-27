import type { InventoryItem } from "$lib/types/InventoryItem";
import { persisted } from 'svelte-local-storage-store'
import { derived } from "svelte/store";

export const db = persisted<{
    items: { [id: string]: InventoryItem }
}>("stores/db", {
    "items": {
        "thing-1": {
            "id": "thing-1",
            "name": "Nissan Leaf",
            "description": "An electric car for personal transportation",
            "properties": {
                "Engine Size": "2L",
                "Model": "Leaf",
                "Brand": "Nissan"
            },
            "tags": [
                "Car",
                "Electric"
            ]
        }
    }
});

export const itemsList = derived(db, $db => Object.values($db.items));
