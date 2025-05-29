// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { Router } from '@angular/router'; // To navigate after login
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.errorMessage = ''; // Clear previous errors
    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        if (success) {
          this.router.navigate(['/reservation']); // Redirect to reservation page on success
        } else {
          this.errorMessage = 'Invalid username or password.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred during login. Please try again.';
        console.error('Login error:', error);
      }
    );
  }
}
