import { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import { PokemonData } from '../types';

function Favorites() {
    const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = async () => {
        const requests = [];
        for (let i = 1; i <= 151; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            requests.push(axios.get(url));
        }

        try {
            const responses = await Promise.all(requests);
            const pokemons = responses.map((response) => {
                const data = response.data;
                return {
                    id: data.id,
                    name: data.name,
                    frontImage: data.sprites.front_default,
                    type: data.types[0].type.name
                };
            });
            setPokemonData(pokemons);
        } catch (error) {
            console.error("Error fetching Pokemons", error);
        }
    };  

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokemonData.map(pokemon => (
                <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
}

export default Favorites;
