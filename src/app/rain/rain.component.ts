import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.css']
})

export class RainComponent {
  @Input() isRaining: boolean = false;
  raindrops: { left: number, speed: number }[] = [];

  ngOnChanges() {
    this.createRaindrops();
  }

  createRaindrops() {
    const numberOfDrops = 100;
    this.raindrops = Array(numberOfDrops).fill(0).map(() => ({
      left: Math.random() * 100,
      speed: Math.random() * 0.5 + 0.5
    }));
  }
}
