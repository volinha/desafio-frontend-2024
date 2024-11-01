import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  const mockPokemon = {
    name: 'Bulbasaur',
    sprites: {
       front_default: 'url-image'
    },
    stats: [{base_stat: 50, stat: {name: 'hp'}}],
    types: [{type: {name: 'grass'}}]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set type to electric when raining', () => {
    component.weatherData = { isRaining: true, temperature: 15, city: 'Divinópolis' };
    expect(component.type).toBe('electric');
  })

  it('should set correct type based on temperature', () => {
    const testCases = [
      { temp: 4, type: 'ice' },
      { temp: 8, type: 'water' },
      { temp: 14, type: 'grass' },
      { temp: 18, type: 'ground' },
      { temp: 25, type: 'bug' },
      { temp: 30, type: 'rock' },
      { temp: 35, type: 'fire' },
      { temp: 22, type: 'normal' }
    ];

    testCases.forEach(({temp, type}) => {
      component.weatherData = { isRaining: false, temperature: temp, city: 'Divinópolis' };
      expect(component.type).toBe(type);
    });
  });

  it('should get correct pokemon stats', () => {
    const stats = component.getPokemonStats(mockPokemon);
    expect(stats).toBe(50);
  });

  it('should return translated pokemon types', () => {
    const types = component.getPokemonTypes(mockPokemon);
    expect(types).toBe('Planta')
  });
});
