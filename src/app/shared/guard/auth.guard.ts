import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
      alert('in guard');
        if (localStorage.getItem('isLoggedin')) {
          this.router.navigate(['/login']);
          //  return true;
        }

        this.router.navigate(['/dashboard']);
        return false;
    }
}
