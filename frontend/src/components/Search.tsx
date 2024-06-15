import { useState } from 'react'
import axios from 'axios'

export default function Search () {
    const [pokemon, setPokemon] = useState('')
    const [pokemonData, setPokemonData] = useState(null)

    const fetchData = async () => {
        if(!pokemon) {
           console.log("please insert a Pokemon") 
           return
        }
        
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
            console.log(response.data)
            setPokemonData(response.data)
            console.log(pokemonData)
        } catch (error) {
            console.error("error fetching data", error)
            setPokemonData(null)
            return
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            e.preventDefault()
            fetchData()
        }
    } 

    return (
        <>
            <img src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"/>
            <form>
                <input
                    type="text"
                    placeholder="Pikachu..."
                    value={pokemon}
                    onChange={(e) => setPokemon(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </form>
        </>
    )
}

