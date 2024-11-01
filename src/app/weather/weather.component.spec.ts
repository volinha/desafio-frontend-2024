import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { OPEN_WEATHER_API_KEY } from '../app.config';
import { By } from '@angular/platform-browser';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let httpMock: HttpTestingController;

  const mockWeatherData = {
    weather: [{ main: 'Rain' }],
    main: { temp: 15 },
    name: 'Divinópolis'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WeatherComponent,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        { provide: OPEN_WEATHER_API_KEY, useValue: 'mock-api-key' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get weather data', () => {
    const spy = spyOn(component.temperatureFetched, 'emit');
    component.city = 'Divinópolis';
    component.getWeather('Divinópolis');

    const req = httpMock.expectOne(request =>
      request.url.includes('/weather') && request.url.includes('Divinópolis')
    );

    req.flush(mockWeatherData);

    expect(spy).toHaveBeenCalledWith({
      temperature: mockWeatherData.main.temp,
      city: mockWeatherData.name,
      isRaining: mockWeatherData.weather[0].main === 'Rain',
      weather: mockWeatherData.weather
    });

  });

  it('should detect rain condition correctly', () => {
    component.weather = mockWeatherData;
    expect(component.checkRain()).toBe(true);

    component.weather = {
      ...mockWeatherData,
      weather: [{ main: 'Clear' }]
    };
    expect(component.checkRain()).toBe(false);
  });

  it('should handle errors correctly', () => {
    component.getWeather('test');

    const req = httpMock.expectOne((request) => request.url.includes('/weather'));

    req.flush('Not Found', {status: 404, statusText: 'Not Found'});

    expect(component.errorMessage).toBe('Cidade não encontrada!');
  });

  it('should update city value', async() => {
    component.city = 'Divinópolis';
    component.city = 'Formiga';
    fixture.detectChanges()

    await fixture.whenStable();

    expect(component.city).toBe('Formiga');

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.value).toBe('Formiga');
  });

  it('should call getWeather on enter keypress', () => {
    spyOn(component, 'getWeather');
    const input = fixture.debugElement.query(By.css('input'));

    input.triggerEventHandler('keyup.enter', {});

    expect(component.getWeather).toHaveBeenCalled();
  });
});
