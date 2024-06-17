import { useState, useEffect } from 'react'
import axios from 'axios'
import { PokemonData } from '../types'

interface Props {
    setPokemonData: (data: PokemonData | null) => void;
}

export default function Search ({setPokemonData}: Props) {
    const [pokemon, setPokemon] = useState("Pikachu")

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        if(!pokemon) {
           console.log("please insert a Pokemon") 
           return
        }
        
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
            const data = response.data 

            const pokemonInfo = {
                name: data.name,
                height: data.height,
                weight: data.weight,
                frontImage: data.sprites.front_default,
                backImage: data.sprites.back_default
            }

            setPokemonData(pokemonInfo)
            console.log(pokemonInfo)
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
                    placeholder="Search a Pokemon"
                    value={pokemon}
                    onChange={(e) => setPokemon(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </form>
        </>
    )
}