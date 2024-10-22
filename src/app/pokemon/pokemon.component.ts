import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PokemonComponent {
  pokemonType: string = '';
  pokemon: any;
  errorMessage: string | null = null;
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  async getPokemon(): Promise<void> {
    if (!this.pokemonType) return;

    try {
      const response = await fetch(`${this.apiUrl}/${this.pokemonType.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon não encontrado!');
      }
      this.pokemon = await response.json();
      this.errorMessage = null;
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
