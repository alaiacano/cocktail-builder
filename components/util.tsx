export type Cocktail = {
  name: string;
  book?: string;
  spirits?: string[];
  liqueurs?: string[];
  bitters?: string[];
  juices?: string[];
  sweeteners?: string[];
  other?: string[];
};

export type InventoryItem = {
  brand?: string;
  ingredient: string;
};

export function listAllIngredients(c: Cocktail): string[] {
  return (c.spirits || []).concat(
    c.liqueurs || [],
    c.bitters || [],
    c.juices || [],
    c.sweeteners || [],
    c.other || []
  );
}
