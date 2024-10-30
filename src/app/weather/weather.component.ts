import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OPEN_WEATHER_API_KEY } from '../app.config';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  imports: [CommonModule, FormsModule],
})
export class WeatherComponent {
  weather: any;
  city: string = '';
  errorMessage: string | null = null;
  isRaining: boolean = false;
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  @Output() temperatureFetched = new EventEmitter<{
    isRaining: boolean;
    temperature: number;
    city: string;
  }>();

  constructor(
    @Inject(OPEN_WEATHER_API_KEY) private apiKey: string,
    private http: HttpClient
  ) {}

  getWeather(city: string): void {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    this.http
      .get(url)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (data: any) => {
          this.weather = data;
          this.errorMessage = null;
          this.temperatureFetched.emit({
            isRaining: this.checkRain(),
            temperature: this.weather.main.temp,
            city: this.city,
          });
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
