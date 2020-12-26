import React from "react";
import styles from "./Footer.module.css";

type Thing = {
  message: string;
};
const Footer = () => {
  const msg: Thing = { message: "Made with absolutely no " };
  return (
    <>
      <footer className={styles.footer}>
        {msg.message}
        <img
          src="/netliheart.svg"
          alt="Netlify Logo"
          className={styles.logo}
        />{" "}
        for you
      </footer>
    </>
  );
};
export default Footer;
