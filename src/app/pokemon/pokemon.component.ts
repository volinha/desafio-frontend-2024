import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

type PokemonTypes = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'ground' | 'bug' | 'rock';
type PokemonRef = {
  slot: number;
  pokemon: {
    name: string;
    url: string;
  }
}
type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: Array <{
    base_stat: number;
    stat: {
      name: string;
    }
  }>
}

type PokemonListByType  = {
  pokemon: PokemonRef[]
}

const translateTypes = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Grama',
  ice: 'Gelo',
  ground: 'Terra',
  bug: 'Inseto',
  rock: 'Pedra',
}
@Component({
  selector: 'app-pokemon',
  standalone: true,
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PokemonComponent {
  pokemonType: string = '';
  type: PokemonTypes = 'normal';
  pokemon$: Observable<Pokemon> | null = null;
  errorMessage: string | null = null;
  temperature: number = 0;
  isRaining: boolean = false;
  city: string = '';
  lastPokemonUrl: string | null = null;
  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  @Input() set weatherData(data: { isRaining: boolean; temperature: number; city: string } | null) {
    if (!data) return;
    this.temperature = data.temperature;
    this.isRaining = data.isRaining;
    this.city = data.city;
    if (data.isRaining) {
      this.type = 'electric';
    } else if (data.temperature < 5) {
      this.type = 'ice';
    } else if (data.temperature >= 5 && data.temperature < 10) {
      this.type = 'water';
    } else if (data.temperature >= 12 && data.temperature < 15) {
      this.type = 'grass';
    } else if (data.temperature >= 15 && data.temperature < 21) {
      this.type = 'ground';
    } else if (data.temperature >= 23 && data.temperature < 27) {
      this.type = 'bug';
    } else if (data.temperature >= 27 && data.temperature <= 33) {
      this.type = 'rock';
    } else if (data.temperature > 33) {
      this.type = 'fire';
    } else {
      this.type = 'normal';
    }
    this.getPokemonByType();
  }

  getPokemonByType(): void {
    this.http.get<PokemonListByType>(`${this.apiUrl}/type/${this.type}`).pipe(
      catchError(error => {
        this.errorMessage = 'Erro ao buscar Pokémon do tipo especificado!';
        return of(null);
      })
    ).subscribe(response => {
      if (response && response.pokemon && response.pokemon.length > 0) {
        let attempts = 0;
        let randomPokemon;

        do {
          const randomIndex = Math.floor(Math.random() * response.pokemon.length);
          randomPokemon = response.pokemon[randomIndex];
          attempts++;
        } while (
          this.lastPokemonUrl === randomPokemon.pokemon.url &&
          attempts < 5 &&
          response.pokemon.length > 1
        );

        this.lastPokemonUrl = randomPokemon.pokemon.url;
        this.pokemon$ = this.http.get<Pokemon>(randomPokemon.pokemon.url);
      } else {
        this.errorMessage = 'Nenhum Pokémon encontrado para o tipo especificado!';
      }
    });
  }

  getPokemonStats(pokemon: Pokemon): number {
    const hpStat = pokemon.stats.find(stat => stat.stat.name === 'hp');
    return hpStat ? hpStat.base_stat : 0;
  }

  getPokemonTypes(pokemon: any): string {
    return pokemon.types
    .map((type: any) => translateTypes[type.type.name as keyof typeof translateTypes] || type.type.name)
    .join(', ');
  }
}

