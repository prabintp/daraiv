import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
// import { LoginFormComponent } from '../login-form/login-form.component';
import { LoginFormModule } from './../shared';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, LoginFormModule, FormsModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
