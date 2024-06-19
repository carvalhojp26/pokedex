import { useState, useEffect } from 'react';
import { PokemonData } from '../types'
import axios from 'axios';

interface Props {
    pokemonData: PokemonData | null;
}

export default function Display ({pokemonData}: Props) {
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        if (pokemonData) {
            checkIfFavorite();
        }
    }, [pokemonData]);

    const checkIfFavorite = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/favorites/${pokemonData?.id}`);
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
        if (pokemonData) {
            try {
                await axios.post('http://localhost:3001/addFavorite', pokemonData);
                console.log('Pokemon added to favorites');
            } catch (error) {
                console.error('Failed to add to favorites:', error);
            }
        }
    };

    const removeFavorite = async () => {
        if (pokemonData) {
            try {
                await axios.delete(`http://localhost:3001/removeFavorite/${pokemonData.id}`);
                console.log('Pokemon removed from favorites');
            } catch (error) {
                console.error('Failed to remove from favorites:', error);
            }
        }
    };

    return (
        <div className='bg-components rounded-lg w-display-w h-40 text-lg'>
            {pokemonData ? (
                <div className='flex items-center justify-around mt-40 p-8'>
                    <div className='flex items-center'>
                        <img src={pokemonData.frontImage} alt={`Front view of ${pokemonData.name}`} />
                        <img src={pokemonData.backImage} alt={`Back view of ${pokemonData.name}`} />
                    </div>
                    <div>
                        <p><span className="font-bold">Name:</span> {pokemonData.name}</p>
                        <p className='mb-3 mt-3'><span className="font-bold">Height:</span> {pokemonData.height}</p>
                        <p><span className="font-bold">Weight:</span> {pokemonData.weight}</p>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" 
                                checked={isFavorite}
                                onChange={toggleFavorite}
                                readOnly
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                        </label>
                    </div>
                </div>
            ) : (
                <p>No Pokémon data available. Please search for a Pokémon.</p>
            )}
        </div>
    );
}