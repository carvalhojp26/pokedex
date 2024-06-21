import { useState } from 'react';
import Display from './Display';

function Search() {
    const [pokemonName, setPokemonName] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonName(e.target.value);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-semibold tracking-wide text-myPurple'>Search your favorite Pokémon</h1>            
            <form className='mt-10'>
                <input
                    className='w-full h-10 p-4 rounded-lg bg-inputBg mb-10 w-input'
                    type="text"
                    placeholder="Search a Pokemon"
                    value={pokemonName}
                    onChange={handleInputChange}
                />
            </form>
            <Display searchQuery={pokemonName} />
        </div>
    );
}

export default Search;
