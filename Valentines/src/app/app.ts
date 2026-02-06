import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  @ViewChild('box', { static: true })
  box!: ElementRef<HTMLDivElement>;

  runnerX = 0;
  runnerY = 0;

  buttonSize = 80;
  dangerRadius = 90;

  ngOnInit() {
    this.moveRunner();
  }

  onMouseMove(event: MouseEvent) {
    const rect = this.box.nativeElement.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const dx = mouseX - (this.runnerX + this.buttonSize / 2);
    const dy = mouseY - (this.runnerY + this.buttonSize / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.dangerRadius) {
      this.moveRunner();
    }
  }

  moveRunner() {
    const rect = this.box.nativeElement.getBoundingClientRect();
    const padding = 10;

    const maxX = rect.width - this.buttonSize - padding;
    const maxY = rect.height - this.buttonSize - padding;

    this.runnerX = Math.random() * maxX;
    this.runnerY = Math.random() * maxY;
  }
}
