import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Cocktail, listAllIngredients } from "./util";
import {
  Chip,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 1200,
  },
});

type CocktailGridProps = {
  cocktailList: Cocktail[];
  selectedIngredients: Set<string>;
};

const makeChip = (cocktail: Cocktail, field: string) => {
  if ((field === "name" || field === "book") && cocktail[field]) {
    return cocktail[field];
  }

  if (cocktail.hasOwnProperty(field)) {
    return (
      <>
        {cocktail[field].map((ingredient, i) => (
          <Chip key={i} label={ingredient} />
        ))}
      </>
    );
  }
};
const CocktailGrid = ({
  cocktailList,
  selectedIngredients,
}: CocktailGridProps) => {
  const classes = useStyles();
  if (cocktailList.length === 0) {
    return <></>;
  }
  const cols = [
    { field: "name", width: 150 },
    { field: "book", width: 150 },
    { field: "spirits", width: 250 },
    { field: "liqueurs", width: 250 },
    { field: "bitters", width: 150 },
    { field: "sweeteners", width: 150 },
    { field: "other", width: 150 },
  ];

  const numberOfMissingIngredients = (cocktail: Cocktail) => {
    const allIngredientsInCocktail = new Set(listAllIngredients(cocktail));
    return (
      allIngredientsInCocktail.size -
      [...allIngredientsInCocktail].filter((i) => selectedIngredients.has(i))
        .length
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Ingredients Needed</TableCell>
            {cols.map((col) => (
              <TableCell align="center">{col.field}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cocktailList.map((row) => {
            return (
              <TableRow
                key={row.name}
                selected={numberOfMissingIngredients(row) === 0}
              >
                <TableCell key={`${row.name} - missing`}>
                  {numberOfMissingIngredients(row)}
                </TableCell>
                {cols.map((col) => (
                  <TableCell key={`${row.name} - ${col.field}`}>
                    {makeChip(row, col.field)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CocktailGrid;
