export type PokemonTypeName =
| 'normal'
| 'fire'
| 'water'
| 'electric'
| 'grass'
| 'ice'
| 'ground'
| 'bug'
| 'rock';

export type TranslatedTypes = {
  [key in PokemonTypeName]: string;
};

export const translateTypes: TranslatedTypes = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Planta',
  ice: 'Gelo',
  ground: 'Terra',
  bug: 'Inseto',
  rock: 'Pedra',
} as const;

export type WeatherConditionType = 'rain' | 'drizzle' | 'thunderstorm' | 'clear' | 'clouds';
