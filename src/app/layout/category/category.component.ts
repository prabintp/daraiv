import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
@Injectable()
@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
  //  styleUrls: ['./category.component.scss'],
    animations: [routerTransition()]
})
export class CategoryComponent implements OnInit {
    constructor() {
    }
    ngOnInit() {}
}
