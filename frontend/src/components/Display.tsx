    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { PokemonData, PokemonInfo } from '../types';
    import Pokemon from './Pokemon';
    import PokemonDetails from './PokemonDetails';

    interface DisplayProps {
        searchQuery?: string;
        favorites?: PokemonData[];
    }    

    const Display: React.FC<DisplayProps> = ({ searchQuery, favorites }) => {
        const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
        const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | null>(null);

        useEffect(() => {
            if (favorites) {
                setPokemonData(favorites);
            } else if (searchQuery === "") {
                fetchAllPokemons();
            } else if (searchQuery) {
                fetchPokemon(searchQuery);
            }
        }, [searchQuery, favorites]);

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

        const fetchPokemon = async (name: string) => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                const data = response.data;
                setPokemonInfo({
                    id: data.id,
                    name: data.name,
                    frontImage: data.sprites.front_default,
                    type: data.types[0].type.name,
                    height: data.height,
                    weight: data.weight,
                    move: data.moves[0].move.name,
                    ability: data.abilities[0].ability.name
                });
            } catch (error) {
                console.error("Error fetching pokemon", error);
                setPokemonInfo(null);
            }
        };

        if (pokemonInfo) {
            return (
                <div className="border-2 p-8 rounded-lg border-myPurple overflow-y-auto" style={{ height: '620px', width: '1096px' }}>
                    <PokemonDetails pokemon={pokemonInfo}/>
                </div>
            );
        }

        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 border-2 p-8 rounded-lg border-myPurple overflow-y-auto" style={{ height: '620px', width: '1096px' }}>
                {pokemonData.map(pokemon => (
                    <Pokemon key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        );
    };

    export default Display;
