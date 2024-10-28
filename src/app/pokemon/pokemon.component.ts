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
  }
}

type PokemonListByType  = {
  pokemon: PokemonRef[]
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
  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  // carrega o pokemon ao iniciar, para visualizar o design sem precisar clicar no botão
  ngOnInit(): void {
    this.getPokemonByType();
  }

  @Input() set weatherData(data: { isRaining: boolean; temperature: number } | null) {
    if (!data) return;
    this.temperature = data.temperature;
    this.isRaining = data.isRaining;
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
        const randomIndex = Math.floor(Math.random() * response.pokemon.length);
        const randomPokemon = response.pokemon[randomIndex];
        this.pokemon$ = this.http.get<Pokemon>(randomPokemon.pokemon.url);
      } else {
        this.errorMessage = 'Nenhum Pokémon encontrado para o tipo especificado!';
      }
    });
  }

  getPokemonTypes(pokemon: any): string {
    return pokemon.types.map((type: any) => type.type.name).join(', ');
  }
}
