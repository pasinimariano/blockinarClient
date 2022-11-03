import Head from "next/head";

import TopBar from "../components/LandingPage/TopBar";
import LoginForm from "../components/LandingPage/LoginForm";

import styles from "../styles/landing.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title> Bienvenido a Gaia Hoteles </title>
        <meta name="description" content="Generado por Mariano L. Pasini" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TopBar styles={styles} />
        <LoginForm styles={styles} />
      </main>
    </div>
  );
}
