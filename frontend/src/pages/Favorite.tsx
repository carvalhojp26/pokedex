import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Display from '../components/Display';
import { PokemonData } from '../types';

function Favorite() {
    const [favorites, setFavorites] = useState<PokemonData[]>([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get<PokemonData[]>('http://localhost:3001/favorites');
            setFavorites(response.data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    return (
        <>
            <Header />
            <h1 className='text-3xl font-semibold tracking-wide text-myPurple mt-16'>Favorite Pokémon's</h1>
            <Display favorites={favorites}/>
        </>
    );
}

export default Favorite;
