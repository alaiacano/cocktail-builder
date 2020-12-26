import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
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
  const classes = useStyles();

  useEffect(() => {
    fetch("/.netlify/functions/airtable")
      .then((resp) => resp.json())
      .then((data) => {
        setCocktails(data);
      });
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container layout="row">
        <Grid item xs={12} lg={12}>
          <div className={classes.section}>
            <CocktailGrid cocktailList={cocktails} />
          </div>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
};

export default Home;
