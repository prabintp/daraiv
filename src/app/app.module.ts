import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthTokenService} from './auth-token/auth-token.service';
import { UniqueInvoiceValidatorDirective} from './layout/invoices/invoices-id-uniqe.directive';

// import { FormsModule }   from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ImageUploadModule } from 'angular2-image-upload';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        NguiAutoCompleteModule,
        BrowserAnimationsModule,
        HttpClientModule,
       // UniqueInvoiceValidatorDirective,
        ImageUploadModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [AuthTokenService, UniqueInvoiceValidatorDirective],
    bootstrap: [AppComponent]
})
export class AppModule {}
