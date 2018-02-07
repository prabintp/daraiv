import { Component , OnInit} from '@angular/core';
// import {Angular2TokenService} from 'angular2-token';
import {AuthTokenService} from './auth-token/auth-token.service'
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private authToken: AuthTokenService) {
    this.authToken.init(environment.token_auth_config);
  }

    ngOnInit() {
    }
}
