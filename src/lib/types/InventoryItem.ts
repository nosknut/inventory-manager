export type InventoryItem = {
    id: string;
    name: string;
    description?: string;
    properties: {
        [key: string]: string;
    };
    tags: string[];
}
