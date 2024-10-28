import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InjectionToken } from '@angular/core';
import { environment } from '../environment/environment';

export const OPEN_WEATHER_API_KEY = new InjectionToken<string>(
  'OPEN_WEATHER_API_KEY'
);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    FormsModule,
    {
      provide: OPEN_WEATHER_API_KEY,
      useValue: environment.openWeatherApiKey,
    },
  ],
};
