import { Pokemon, PokemonType, WeatherData, WeatherResponse } from '../interfaces';
import { PokemonTypeName } from '../types';

// Type guard para pokemon
export function isPokemon(value: unknown): value is Pokemon {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'sprites' in value &&
    'stats' in value &&
    'types' in value
  );
}

// Type guard para PokemonTypeName
export function isPokemonTypeName(value: string): value is PokemonTypeName {
  const validTypes: PokemonTypeName[] = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'ground',
    'bug',
    'rock'
  ];
  return validTypes.includes(value as PokemonTypeName);
}

// Type guard para WeatherResponse
export function isWeatherResponse(value: unknown): value is WeatherResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'weather' in value &&
    'main' in value &&
    'name' in value
  );
}

// Type guard para WeatherData
export function isWeatherData(value: unknown): value is WeatherData {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isRaining' in value &&
    'temperature' in value &&
    'city' in value &&
    'weather' in value
  );
}
