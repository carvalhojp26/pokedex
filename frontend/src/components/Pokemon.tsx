import React, { useState, useEffect } from 'react';
import { PokemonData, TypeToColorMap } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

interface PokemonProps {
    pokemon: PokemonData;
}

const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkIfFavorite();
    }, [pokemon]);

    const checkIfFavorite = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/favorites/${pokemon.id}`);
            setIsFavorite(response.data.isFavorite);
        } catch (error) {
            console.error('Failed to check favorite status:', error);
        }
    };

    const toggleFavorite = async () => {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            addFavorite();
        } else {
            removeFavorite();
        }
    };

    const addFavorite = async () => {
        try {
            await axios.post('http://localhost:3001/addFavorite', pokemon);
            console.log('Pokemon added to favorites');
        } catch (error) {
            console.error('Failed to add to favorites:', error);
        }
    };

    const removeFavorite = async () => {
        try {
            await axios.delete(`http://localhost:3001/removeFavorite/${pokemon.id}`);
            console.log('Pokemon removed from favorites');
        } catch (error) {
            console.error('Failed to remove from favorites:', error);
        }
    };

    const typeToColor: TypeToColorMap = {
        bug: 'bg-green-500',
        dragon: 'bg-purple-700',
        electric: 'bg-yellow-400',
        fighting: 'bg-red-700',
        fire: 'bg-red-500',
        flying: 'bg-blue-300',
        ghost: 'bg-indigo-600',
        grass: 'bg-green-600',
        ground: 'bg-yellow-600',
        ice: 'bg-blue-200',
        normal: 'bg-gray-400',
        poison: 'bg-purple-500',
        psychic: 'bg-pink-500',
        rock: 'bg-yellow-700',
        water: 'bg-blue-500',
        fairy: 'bg-pink-200'

    };

    const bgClass = typeToColor[pokemon.type as keyof TypeToColorMap];

    return (
        <div className="flex-col items-center rounded-lg">
            <div className='bg-pokemonBg rounded-xl'>
                <img src={pokemon.frontImage} alt={pokemon.name} className="w-48 h-48" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between w-full">
                    <p className="text-number p-2">Nº: {pokemon.id}</p>
                    <span className={`${bgClass} mt-2 px-5 py-1 text-white font-bold rounded-lg`}>{capitalizeFirstLetter(pokemon.type)}</span>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <p className="text-xl p-2 font-normal">{capitalizeFirstLetter(pokemon.name)}</p>
                    <FontAwesomeIcon 
                        icon={isFavorite ? solidHeart : regularHeart}
                        onClick={toggleFavorite}
                        style={{ color: isFavorite ? 'red' : 'pink', cursor: 'pointer', transition: 'color 0.3s ease-in-out'}}
                        size="1x"
                        />
                </div>
            </div>
        </div>
    );
};

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Pokemon;
