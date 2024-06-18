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
                    <div >
                        <p><span className="font-bold">Name:</span> {pokemonData.name}</p>
                        <p className='mb-3 mt-3'><span className="font-bold">Height:</span> {pokemonData.height}</p>
                        <p><span className="font-bold">Weight</span> {pokemonData.weight}</p>
                        <button onClick={toggleFavorite} className="mt-3 p-2 bg-blue-500 text-white rounded">
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            ) : (
                <p>No Pokémon data available. Please search for a Pokémon.</p>
            )}
        </div>
    )
}