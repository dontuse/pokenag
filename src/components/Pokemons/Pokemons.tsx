"use client";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import { useState, ChangeEvent } from "react";
import Pokemon from "./Pokemon";
import Link from "next/link";

const fetcher = (path: string) =>
  fetch(`https://pokeapi.co/api/v2${path}`).then((res) => res.json());

type PokemonsRes = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Pokemon[];
};

type Pokemon = {
  name: string;
  url: string;
};

type PokemonV = {
  name?: string;
  url?: string;
  key: string;
};

const limit = 12;

export default function BasicCard() {
  const [offset, setOffset] = useState(0);
  const { data, error, isLoading } = useSWR<PokemonsRes>(`/pokemon?limit=${limit}&offset=${offset}`, fetcher, {
    keepPreviousData: true,
  });

  const pagesCount = data?.count ? Math.ceil(data.count / limit) : 0;

  let pokemons: PokemonV[] =
    data?.results.map((p) => ({
      ...p,
      key: p.url,
    })) || [];


  if (error) {
    return <div>Покемон не сумел {"\u{1f642}"} ,пика пика...<Link href={'/'}>Перезагрузить</Link></div>;
  }

  function paginate(event: ChangeEvent<unknown>, page: number) {
    setOffset(page);
  }

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {pokemons.map((pokemon) => (
            <Grid item xs={6}  md={2} key={pokemon.key}>
              <Pokemon name={pokemon.name} url={pokemon.url} isLoading={isLoading} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={5}>
        {pagesCount > 1 && <Pagination onChange={paginate} count={pagesCount} size="large" />}
      </Box>
    </Box>
  );
}
