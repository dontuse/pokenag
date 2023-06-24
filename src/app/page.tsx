'use client'
import styles from "./page.module.css";
import Pokemons from "@/components/Pokemons/Pokemons";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <Container maxWidth="lg">
        <Pokemons />
      </Container>
    </main>
  );
}
