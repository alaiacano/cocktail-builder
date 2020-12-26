import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CocktailGrid from "../components/CocktailGrid";
import { Container } from "@material-ui/core";

const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  // const table = () =>
  //   await (await fetch("/.netlify/functions/airtable")).json();

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

      <div style={{ display: "flex", height: "100%", width: "1000px" }}>
        <Container width="lg">
          <CocktailGrid cocktailList={cocktails} />
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
