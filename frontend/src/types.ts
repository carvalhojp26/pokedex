export interface PokemonData {
    id: number,
    name: string;
    frontImage: string;
    type: string
}

export interface PokemonInfo {
    id: number,
    name: string,
    frontImage: string,
    type: string,
    height: number,
    weight: number,
    move: string,
    ability: string
}

export interface TypeToColorMap {
    bug: string;
    dragon: string;
    electric: string;
    fighting: string;
    fire: string;
    flying: string;
    ghost: string;
    grass: string;
    ground: string;
    ice: string;
    normal: string;
    poison: string;
    psychic: string;
    rock: string;
    water: string;
    fairy: string
}