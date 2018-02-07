import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {AuthService} from '../../services/auth.service';


import { LoginFormComponent } from './login-form.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [LoginFormComponent],
    exports: [LoginFormComponent],
    providers: [AuthService]
})
export class LoginFormModule { }
