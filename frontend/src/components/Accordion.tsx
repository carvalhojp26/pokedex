import axios from 'axios';
import { useEffect, useState } from 'react';
import { PokemonData } from '../types';

export default function Accordion() {
    const [favorites, setFavorites] = useState<PokemonData[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get<PokemonData[]>("http://localhost:3001/favorites");
                setFavorites(response.data);
            } catch (error) {
                console.error("error fetching favorites: ", error);
            }
        };
        fetchFavorites();
    }, []);

    return (
        <div className='py-2 w-display-w max-h-96 overflow-y-auto bg-white shadow-md rounded-lg p-4'>
            {favorites.map((pokemon, index) => (
                <PokemonAccordion key={index} pokemon={pokemon} />
            ))}
        </div>
    );
}

function PokemonAccordion({ pokemon }: { pokemon: PokemonData }) {
    const [accordionOpen, setAccordionOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setAccordionOpen(!accordionOpen)} className='flex justify-between w-full items-center'>
                <span>
                    <img src={pokemon.frontImage} alt={pokemon.name} />
                </span>
                <span className='text-center text-xl'><span className="font-bold">Name: </span> {pokemon.name}</span>
                {accordionOpen ? <span className='text-xl'>-</span> : <span className='text-xl'>+</span>}
            </button>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className='overflow-hidden'>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                </div>
            </div>
        </div>
    );
}
