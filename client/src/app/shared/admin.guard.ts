import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }


    canActivate(): any {
      // will be called when route is visited
      // return true if user is admin
      return new Promise((resolve, reject) => {
        this.authService.isAdmin().subscribe(
          (res: any) => {
            // check if user is admin
            if (res.role === 'admin') {
              resolve(true);
            } else {
              this.route.navigate(['/login']);
              resolve(false);
            }
          }, (err) => {
            // if error, redirect to login page
            this.route.navigate(['/login']);
            resolve(false);
          }
        );
      });
    }
}
