import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  @ViewChild('box', { static: true }) box!: ElementRef<HTMLDivElement>;

  runnerX = 0;
  runnerY = 0;

  buttonSize = 80;
  dangerRadius = 90;

  heartInterval: any;

  ngOnInit() {
    this.setInitialPosition();
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

  setInitialPosition() {
    const rect = this.box.nativeElement.getBoundingClientRect();

    const gap = 32; // space between buttons

    // total width of both buttons + gap
    const totalWidth = this.buttonSize * 2 + gap;

    const startX = ((rect.width - totalWidth) / 2) + 20;
    const centerY = ((rect.height - (this.buttonSize / 2)) / 2) - 2;

    // runner is on the right
    this.runnerX = startX + this.buttonSize + gap;
    this.runnerY = centerY;
  }

  celebrate() {
    this.launchConfetti();
    this.spawnHearts();
  }

  launchConfetti() {
    const bursts = 18;
    for (let i = 0; i < bursts; i++) {
      confetti({
        particleCount: 60,
        spread: 140,
        origin: { x: Math.random(), y: Math.random() * 0.2 }, // spread along top
        gravity: 4,
        decay: 0.9,
        startVelocity: 50,
        scalar: 1.5,
      });
    }
  }


  spawnHearts() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const heartsToSpawn = 40;
    let spawned = 0;

    const interval = setInterval(() => {
      if (spawned >= heartsToSpawn) {
        clearInterval(interval);
        return;
      }
      spawned++;

      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * vw + 'px';
      heart.style.top = Math.random() * vh + 'px';
      heart.style.animationDuration = 2 + Math.random() * 2 + 's';

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, 50);
  }

}
