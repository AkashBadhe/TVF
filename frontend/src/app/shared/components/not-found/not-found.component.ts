import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <button mat-raised-button color="primary" (click)="goHome()">
          Go Back Home
        </button>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
    }
    
    .not-found-content {
      text-align: center;
      max-width: 400px;
    }
    
    .error-icon {
      font-size: 4rem;
      color: #ff9800;
      margin-bottom: 1rem;
    }
    
    h1 {
      margin-bottom: 1rem;
      color: #333;
    }
    
    p {
      margin-bottom: 2rem;
      color: #666;
    }
  `]
})
export class NotFoundComponent {
  goHome() {
    window.location.href = '/';
  }
}
