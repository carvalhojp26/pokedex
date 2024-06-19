import { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import { PokemonData } from '../types';

function Search() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

    useEffect(() => {
        if (pokemonName === "") {
            fetchAllPokemons();
        } else {
            fetchPokemon(pokemonName);
        }
    }, [pokemonName]);

    const fetchAllPokemons = async () => {
        const requests = [];
        for (let i = 1; i <= 151; i++) {
            requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }

        try {
            const responses = await Promise.all(requests);
            const pokemons = responses.map(response => ({
                id: response.data.id,
                name: response.data.name,
                frontImage: response.data.sprites.front_default,
                type: response.data.types[0].type.name
            }));
            setPokemonData(pokemons);
        } catch (error) {
            console.error("Error fetching all Pokemons", error);
        }
    };

    const fetchPokemon = async (name:string) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            const data = response.data;
            setPokemonData([{
                id: data.id,
                name: data.name,
                frontImage: data.sprites.front_default,
                type: data.types[0].type.name,
            }]);
        } catch (error) {
            console.error("Error fetching pokemon", error);
            setPokemonData([]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonName(e.target.value);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-semibold tracking-wide text-myPurple'>Search your favorite Pokémon</h1>            
            <form className='mt-10'>
                <input
                    className='w-full h-10 p-4 rounded-lg bg-inputBg mb-10 w-input'
                    type="text"
                    placeholder="Search a Pokemon"
                    value={pokemonName}
                    onChange={handleInputChange}
                />
            </form>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 border-2 p-8 rounded-lg border-myPurple overflow-y-auto" style={{ height: '620px', width: '1096px' }}>
                {pokemonData.map(pokemon => (
                    <Pokemon key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}

export default Search;