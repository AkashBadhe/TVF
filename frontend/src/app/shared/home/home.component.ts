import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h1>🍕 Welcome to Food Ordering App</h1>
      <p>Your favorite food, delivered fast!</p>
      
      <div class="features">
        <div class="feature-card">
          <h3>🏪 Browse Restaurants</h3>
          <p>Discover amazing restaurants in your area</p>
        </div>
        
        <div class="feature-card">
          <h3>🛒 Easy Ordering</h3>
          <p>Add items to cart and checkout seamlessly</p>
        </div>
        
        <div class="feature-card">
          <h3>🚚 Fast Delivery</h3>
          <p>Track your order in real-time</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      color: #1976d2;
      margin-bottom: 1rem;
      font-size: 2.5rem;
    }
    
    p {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 3rem;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-4px);
    }
    
    .feature-card h3 {
      color: #1976d2;
      margin-bottom: 1rem;
    }
    
    .feature-card p {
      color: #555;
      font-size: 1rem;
      margin: 0;
    }
  `]
})
export class HomeComponent {}
