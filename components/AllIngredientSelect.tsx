import React from "react";
import { Chip, Paper } from "@material-ui/core";

export type SelectedIngredient = {
  name: string;
  selected: boolean;
};

type AllIngredientSelectProps = {
  selectedIngredients: SelectedIngredient[];
  toggleSelection: Function;
  excludeOther: boolean;
  toggleExcludeOther: Function;
};

const AllIngredientSelect = ({
  selectedIngredients,
  toggleSelection,
  excludeOther,
  toggleExcludeOther,
}: AllIngredientSelectProps) => {
  return (
    <Paper>
      Select the ingredients you have...
      <br />
      {[...selectedIngredients]
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((ing, k) => (
          <Chip
            key={k}
            label={ing.name}
            color={ing.selected ? "primary" : "default"}
            onClick={() => toggleSelection(ing.name, !ing.selected)}
          />
        ))}
      <br />
      <Chip
        label="Exclude Sweeteners and pantry items"
        onClick={() => toggleExcludeOther(!excludeOther)}
        color={excludeOther ? "primary" : "default"}
      />
    </Paper>
  );
};
export default AllIngredientSelect;
