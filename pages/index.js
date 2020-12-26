import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <pre>{JSON.stringify(cocktails, null, 2)}</pre>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
