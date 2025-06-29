import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-simple-menu',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="menu-container">
      <h1>Menu Coming Soon!</h1>
      <mat-card>
        <mat-card-content>
          <p>We're working on building an amazing menu for you.</p>
          <p>Please check back soon or create an account to get started.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">Sign Up</button>
          <button mat-button>Learn More</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .menu-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    
    h1 {
      margin-bottom: 2rem;
      color: #333;
    }
    
    mat-card {
      margin: 1rem 0;
    }
  `]
})
export class SimpleMenuComponent {}
