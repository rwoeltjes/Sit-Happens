import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Still needed for *ngIf etc.
import { RouterOutlet, RouterLink } from '@angular/router'; // Needed for routing
import { ScannerComponent } from './scanner/scanner.component'; // Adjust the path as necessary

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, // Allows <router-outlet> to render routed components
    RouterLink,   // Allows [routerLink] directive for navigation
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Awesome Angular App';

  // No scanner-related properties or methods here anymore!
}
