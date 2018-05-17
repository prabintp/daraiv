import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {AuthTokenService} from '../../../auth-token/auth-token.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: boolean = false;
    showMenu: string = '';
    currentShop: any = '';
    pushRightClass: string = 'push-right';

    constructor(private translate: TranslateService,
      public router: Router,
    public authTokenService: AuthTokenService) {
    let self = this;
    this.currentShop = {
      sid: {
        name:''
      }
    };
      JSON.stringify('dddddd'+authTokenService.currentAuthData);
      setTimeout(function(){
        let shops = JSON.parse(localStorage.getItem('shops'));
        self.currentShop = shops.find(function(item){if(item.isactive == true) return true});
      },2000)


      //  this.currentShop = authTokenService.currentAuthData.currentShop ? JSON.parse(authTokenService.currentAuthData.currentShop) : '';
      //  this.currentShop = JSON.parse(localStorage.getItem('currentShop'));
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
