export interface WeatherData {
  isRaining: boolean;
  temperature: number;
  city: string;
  weather: WeatherCondition[];
}

export interface WeatherCondition {
  main: string;
}

export interface WeatherError {
  code: string;
  message: string;
}

export interface WeatherResponse {
  weather: WeatherCondition[];
  main: {
    temp: number;
  };
  name: string;
}

