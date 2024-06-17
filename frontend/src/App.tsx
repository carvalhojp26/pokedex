import { useState } from "react"
import Display from "./components/Display.tsx"
import Search from "./components/Search.tsx"
import { PokemonData } from './types'

function App() {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null)

  return (
    <>
      <Search setPokemonData={setPokemonData}/>
      <Display pokemonData={pokemonData}/>
    </>
  )
}

export default App
