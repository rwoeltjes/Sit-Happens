// src/app/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'; // Import 'inject'
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Correct way to inject service
  const router = inject(Router);         // Correct way to inject Router

  return authService.isLoggedIn$.pipe(
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        // You could use a more sophisticated notification service instead of alert
        alert('You must be logged in to access the reservation page.');
        router.navigate(['/login']); // Redirect to login page
      }
    })
  );
};
