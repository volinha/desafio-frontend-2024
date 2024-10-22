import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  imports: [CommonModule, FormsModule]
})
export class WeatherComponent {
  weather: any;
  city: string = '';
  errorMessage: string | null = null;
  isRaining: boolean = false;
  private apiKey = environment.openWeatherApiKey;
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

  @Output() temperatureFetched = new EventEmitter<{isRaining: boolean, temperature: number}>();

  async getWeather(city: string): Promise<void> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    try{
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Cidade não encontrada!');
      }
      this.weather = await response.json();
      this.errorMessage = null;

      this.temperatureFetched.emit({
        isRaining: this.checkRain(),
        temperature: this.weather.main.temp,
      });
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  checkRain(): boolean {
    return !!(this.weather.rain && this.weather.rain['1h'] > 0);
  }


  async searchWeather(): Promise<void>{
    if (this.city) {
      await this.getWeather(this.city);
    }
  }
}
