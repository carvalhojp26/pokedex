import { useState, useEffect } from "react";
import Display from "./components/Display";
import Search from "./components/Search";
import { PokemonData } from './types';
import Header from "./components/Header";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);  

  return (
    <>
      <Header />
      <Search />
      <Display pokemonList={pokemonList} />
    </>
  );
}

export default App;
