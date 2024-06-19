import React from 'react';
import { PokemonData } from '../types';
import Pokemon from './Pokemon';

interface DisplayProps {
    pokemonList: PokemonData[];
}

const Display: React.FC<DisplayProps> = ({ pokemonList }) => {
    return (
        <div className="grid grid-cols-5 gap-4 overflow-y-auto max-h-[calc(100vh-4rem)] p-4">
            {pokemonList.map(pokemon => (
                <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
};

export default Display;
