import { useState, useEffect } from 'react';
import { PokemonInfo, TypeToColorMap } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

interface PokemonDetailsProps {
    pokemon: PokemonInfo;
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
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
        <div className="flex">
            <div className={`${bgClass} bg-opacity-15 rounded-xl p-4 w-[850px] h-[560px] flex-shrink-0 min-w-[450px] mb-8 flex justify-center items-center`}>
                <img src={pokemon.frontImage} alt="pokemonFrontImage" className="w-pokemonWidth h-pokemonWidth mb-4" />
            </div>
            <div className="w-full">
                <div className='flex justify-between'>
                    <p className='p-4 text-2xl '>Nº: {pokemon.id}</p>
                    <FontAwesomeIcon 
                            icon={isFavorite ? solidHeart : regularHeart}
                            onClick={toggleFavorite}
                            style={{ color: isFavorite ? 'red' : 'pink', cursor: 'pointer', transition: 'color 0.3s ease-in-out'}}
                            size="2x"
                            className='p-4 top-0 right-0'
                            />
                </div>
                <div>
                    <h1 className='font-medium flex justify-center text-6xl mb-8'>{capitalizeFirstLetter(pokemon.name)}</h1>
                </div>
                <div className='flex h-96'> 
                    <div className='w-full p-8 border-r-2 border-black'>
                        <div className='mt-12'>
                            <p className='text-2xl mb-12'>Height: <span className='font-light'>{pokemon.height}</span></p>
                            <p className='text-2xl'>Weight: <span className='font-light'>{pokemon.weight}</span></p>
                        </div>
                    </div>
                    <div className="w-full p-8">
                        <div className="mt-12">
                            <p className="text-2xl mb-12">Move: <span className='font-light'>{capitalizeFirstLetter(pokemon.move)}</span></p>
                            <p className="text-2xl">Ability: <span className='font-light'>{capitalizeFirstLetter(pokemon.ability)}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}