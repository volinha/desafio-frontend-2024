import { Component } from '@angular/core';
import { WeatherComponent } from './weather/weather.component';
import { PokemonComponent } from './pokemon/pokemon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [WeatherComponent, PokemonComponent]
})
export class AppComponent {}
