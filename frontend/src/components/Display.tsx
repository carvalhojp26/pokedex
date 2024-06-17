import { PokemonData } from '../types'

interface Props {
    pokemonData: PokemonData | null;
}

export default function Display ({pokemonData}: Props) {
    return (
        <div>
            {pokemonData ? (
                <div>
                    <div>
                        <img src={pokemonData.frontImage} alt={`Front view of ${pokemonData.name}`} />
                        <img src={pokemonData.backImage} alt={`Back view of ${pokemonData.name}`} />
                    </div>
                    <div>
                        <p>Name: {pokemonData.name}</p>
                        <p>Height: {pokemonData.height}</p>
                        <p>Weight: {pokemonData.weight}</p>
                    </div>
                </div>
            ) : (
                <p>No Pokémon data available. Please search for a Pokémon.</p>
            )}
        </div>
    )
}