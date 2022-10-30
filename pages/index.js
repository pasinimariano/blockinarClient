import Head from "next/head";
import { Link } from "@mui/material";
import { useRouter } from "next/router";

import TopBar from "../components/LandingPage/TopBar";

import linkTo from "../utils/linkTo";
import styles from "../styles/landing.module.css";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title> Bienvenido a Gaia Hoteles </title>
        <meta name="description" content="Generado por Mariano L. Pasini" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TopBar styles={styles} />
        <Link
          className="links"
          underline="none"
          onClick={() => {
            linkTo("/home", router);
          }}
        >
          Ingresar
        </Link>
      </main>
    </div>
  );
}
