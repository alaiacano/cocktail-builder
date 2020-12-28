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

export function listAllIngredients(
  c: Cocktail,
  excludeOther: boolean
): string[] {
  return (c.spirits || []).concat(
    c.liqueurs || [],
    c.bitters || [],
    c.juices || [],
    (!excludeOther && c.sweeteners) || [],
    (!excludeOther && c.other) || []
  );
}
