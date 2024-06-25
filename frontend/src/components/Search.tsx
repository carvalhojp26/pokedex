import { useState } from 'react';
import Display from './Display';

function Search() {
    const [pokemonName, setPokemonName] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonName(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className='ml-0 lg:ml-24 mt-2'>
            <h1 className='text-8xl font-medium tracking-wide'>Pokémon<br/>search page</h1>
            <form className='mt-10' onSubmit={handleFormSubmit}>
                <input
                    className='w-full h-10 p-4 rounded-lg bg-inputBg mb-10 w-input'
                    type="text"
                    placeholder="Pokemon name..."
                    value={pokemonName}
                    onChange={handleInputChange}
                />
                <button type="submit" className="hidden">Search</button>
            </form>
            <Display searchQuery={pokemonName} />
        </div>
    );
}

export default Search;
