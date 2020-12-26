import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";

type Cocktail = {
  name: string;
  book?: string;
  spirits: string[];
  liqueurs: string[];
  bitters: string[];
  juices: string[];
  sweeteners: string[];
};
const useStyles = makeStyles({
  table: {
    minWidth: 1200,
  },
});

type CocktailGridProps = {
  cocktailList: Cocktail[];
};
const CocktailGrid = ({ cocktailList }: CocktailGridProps) => {
  const classes = useStyles();
  console.log(cocktailList);

  const cols = [
    { field: "name", width: 150 },
    { field: "book", width: 150 },
    { field: "spirits", width: 250 },
    { field: "liqueurs", width: 250 },
    { field: "bitters", width: 150 },
    { field: "sweeteners", width: 150 },
  ];
  const rows = cocktailList.map((c, i) => ({ id: i, ...c }));
  return <DataGrid className={classes.table} rows={rows} columns={cols} />;
};

export default CocktailGrid;
