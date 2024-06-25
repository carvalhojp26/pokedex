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
            <Header/>
            <div className='ml-0 lg:ml-24 mt-2'>
                <h1 className='tracking-wide mt-16 text-8xl font-medium tracking-wide mb-16'>Favorite<br/>Pokémon's</h1>
                <Display favorites={favorites}/>
            </div>
        </>
    );
}

export default Favorite;