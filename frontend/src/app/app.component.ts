import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>🍕 Food Ordering App</h1>
        <nav>
          <a routerLink="/restaurants">Restaurants</a>
          <a routerLink="/cart">Cart</a>
          <a routerLink="/orders">Orders</a>
          <a routerLink="/auth/login">Login</a>
        </nav>
      </header>
      
      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="app-footer">
        <p>&copy; 2025 Food Ordering App. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .app-header {
      background-color: #1976d2;
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .app-header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    .app-header nav a {
      color: white;
      text-decoration: none;
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    
    .app-header nav a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .app-content {
      flex: 1;
      padding: 2rem;
    }
    
    .app-footer {
      background-color: #f5f5f5;
      padding: 1rem 2rem;
      text-align: center;
      color: #666;
    }
  `]
})
export class AppComponent {
  title = 'Food Ordering App';
}
