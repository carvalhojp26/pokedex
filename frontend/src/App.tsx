import { useState, useEffect } from "react"
import Display from "./components/Display.tsx"
import Search from "./components/Search.tsx"
import { PokemonData } from './types'
import Header from "./components/Header.tsx"

function App() {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null)

    useEffect(() => {
      document.body.style.overflow = 'hidden';
  
      return () => {  
        document.body.style.overflow = 'visible';
      };
    }, []);

  return (
    <>
      <Header></Header>
      <Search setPokemonData={setPokemonData}/>
      <Display pokemonData={pokemonData}/>
    </>
  )
}

export default App