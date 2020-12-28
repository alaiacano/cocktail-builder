import React, { useState, useEffect } from "react";
import Head from "next/head";
import { listAllIngredients } from "../components/util";
import AllIngredientSelect, {
  SelectedIngredient,
} from "../components/AllIngredientSelect";
import Footer from "../components/Footer";
import CocktailGrid from "../components/CocktailGrid";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
    },
    section: {
      height: "1000px",
      paddingTop: 5,
      backgroundColor: "#fff",
    },
  })
);

const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  const [allIngredients, setAllIngredients] = useState<Set<string>>(
    new Set([])
  );
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredient[]
  >([]);
  const classes = useStyles();

  // Loads the list of cocktails on refresh.
  useEffect(() => {
    fetch("/.netlify/functions/airtable")
      .then((resp) => resp.json())
      .then((data) => {
        setCocktails(data);
      });
  }, []);

  // Sets the list of all used ingredients when the list of cocktails changes.
  useEffect(() => {
    if (cocktails.length > 1) {
      const allIngWithDupes: string[] = cocktails
        .map((c) => listAllIngredients(c))
        .reduce((a, b) => a.concat(b));
      const allIngUnique: Set<string> = new Set(allIngWithDupes);
      setAllIngredients(allIngUnique);
      setSelectedIngredients(
        [...allIngUnique].map((i) => ({ name: i, selected: false }))
      );
    }
  }, [cocktails]);

  const toggleIngredientSelect = (name, select) => {
    const updatedSelected = selectedIngredients.map((ing) => {
      if (ing.name === name) {
        return { name: name, selected: select };
      }
      return ing;
    });

    setSelectedIngredients(updatedSelected);
  };
  return (
    <>
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container layout="row">
        <Grid item>
          <AllIngredientSelect
            selectedIngredients={selectedIngredients}
            toggleSelection={toggleIngredientSelect}
          />
        </Grid>
        <Grid item>
          <div className={classes.section}>
            <CocktailGrid
              cocktailList={cocktails}
              selectedIngredients={
                new Set(
                  selectedIngredients
                    .filter((i) => i.selected)
                    .map((i) => i.name)
                )
              }
            />
          </div>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Home;
