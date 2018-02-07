import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {

  signUpUser = {
    email: '',
    password: '',
  //  passwordConfirmation: '',
    access_token: 'sv1q0yGaeBYs79dStTtaG8toSZkZtE4w'
  };

  @Output() onFormResult = new EventEmitter<any>();

  constructor(public authSerivce: AuthService,
              private router: Router
            ) { }

  ngOnInit() {}


  onSignUpSubmit() {

    this.authSerivce.registerUser(this.signUpUser).subscribe(

        (res) => {

          if (res.status === 201) {
            this.onFormResult.emit({signedUp: true, res});
            this.router.navigate(['/']);
          }

        },

        (err) => {
          console.log(err.json());
          this.onFormResult.emit({signedUp: false, err});
        }
    );

  }
}
