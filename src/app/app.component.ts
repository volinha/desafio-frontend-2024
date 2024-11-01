import { Component } from '@angular/core';
import { WeatherComponent } from './weather/weather.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { RainComponent } from './rain/rain.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [WeatherComponent, PokemonComponent, RainComponent]
})
export class AppComponent {
  title = 'weather-2';
  console = console;
  weatherData: { isRaining: boolean; temperature: number; city: string } | null = null;

  onTemperatureFetched(data: { isRaining: boolean; temperature: number, city: string } | null) {
    this.weatherData = data;
  }
}
