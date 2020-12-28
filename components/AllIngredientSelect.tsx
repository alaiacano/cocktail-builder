import React from "react";
import { Chip, Paper } from "@material-ui/core";

export type SelectedIngredient = {
  name: string;
  selected: boolean;
};

const AllIngredientSelect = ({
  selectedIngredients,
  toggleSelection,
}: {
  selectedIngredients: SelectedIngredient[];
  toggleSelection: Function;
}) => {
  return (
    <Paper>
      Select the ingredients you have...
      <br />
      {[...selectedIngredients].sort().map((ing, k) => (
        <Chip
          key={k}
          label={ing.name}
          color={ing.selected ? "primary" : "default"}
          onClick={() => toggleSelection(ing.name, !ing.selected)}
        />
      ))}
    </Paper>
  );
};
export default AllIngredientSelect;
