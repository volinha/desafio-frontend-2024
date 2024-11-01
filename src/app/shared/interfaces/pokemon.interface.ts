export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    }
  stats: PokemonStat[];
  types: PokemonType[];
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  }
}

export interface PokemonListByType {
  pokemon: PokemonRef[];
}

export interface PokemonRef {
  pokemon: {
    name: string;
    url: string;
  };
}
