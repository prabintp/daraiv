import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {

  signInUser = {
    email: '',
    password: '',
    access_token: 'sv1q0yGaeBYs79dStTtaG8toSZkZtE4w'

  };

  @Output() onFormResult = new EventEmitter<any>();

  constructor(public authService: AuthService,
    private router: Router) {}

  ngOnInit() {}

  onSignInSubmit() {

    this.authService.logInUser(this.signInUser).subscribe(
        res => {
          if (res.status === 201) {
            this.onFormResult.emit({signedIn: true, res});
            this.router.navigate(['/']);
          }
        },
        err => {
          console.log('err:', err);
          this.onFormResult.emit({signedIn: false, err});
        }
    );

  }

}
