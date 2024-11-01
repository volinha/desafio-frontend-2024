import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OPEN_WEATHER_API_KEY } from '../app.config';
import { catchError, throwError } from 'rxjs';
import { WeatherData, WeatherResponse, WeatherError } from '../shared/interfaces';
import { isWeatherData, isWeatherResponse } from '../shared/guards/type.guards';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  imports: [FormsModule, CommonModule]
})
export class WeatherComponent {
  weather: WeatherResponse | null = null;
  city: string = '';
  errorMessage: string | null = null;
  isRaining: boolean = false;
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  @Output() temperatureFetched = new EventEmitter<WeatherData>();

  constructor(
    @Inject(OPEN_WEATHER_API_KEY) private apiKey: string,
    private http: HttpClient
  ) {}

  getWeather(city: string): void {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;

    this.http.get(url)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (response: unknown) => {
          if (!isWeatherResponse(response)) {
            this.errorMessage = 'Resposta inválida da API';
            return;
          }

          this.weather = response;
          this.errorMessage = null;

          const weatherData = {
            isRaining: this.checkRain(),
            temperature: response.main.temp,
            city: this.city,
            weather: response.weather
          };

          if (isWeatherData(weatherData)) {
            this.temperatureFetched.emit(weatherData);
          }
        },
        error: (error) => {
          this.errorMessage = error;
        },
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';
    if (error.status === 404) {
      errorMessage = 'Cidade não encontrada!';
    }
    return throwError(() => errorMessage);
  }

  checkRain(): boolean {
    if (!this.weather || !this.weather.weather || !this.weather.weather.length) {
      return false;
    }

    const weatherCondition = this.weather.weather[0].main.toLowerCase();
    const rainConditions = ['rain', 'drizzle', 'thunderstorm'];

    this.isRaining = rainConditions.includes(weatherCondition);
    return this.isRaining;
  }

  searchWeather(): void {
    if (this.city) {
      this.getWeather(this.city);
    }
  }
}
