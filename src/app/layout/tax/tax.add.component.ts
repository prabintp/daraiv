import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { TaxService } from './tax.service';
import { Tax } from './tax.interface';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-tax',
    templateUrl: './tax.add.component.html',
  //  styleUrls: ['./tax.component.scss'],
    animations: [routerTransition()]
})
export class TaxAddComponent implements OnInit {
  public taxForm: FormGroup;
  private rows: any = [];
  constructor(private _fb: FormBuilder,
    private taxService: TaxService,
    private router: Router) {
    }
    ngOnInit() {
     this.initForm();
    }
    initForm(){
      this.taxForm = this._fb.group({
         name: ['', [Validators.required]],
         code:[''],
         rate:['', [Validators.required]],
         type:['percentage', [Validators.required]]
       });
    }
    onAdd(){
      this.taxService.addTax(this.taxForm.value).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/tax']) : this.router.navigate(['/404'])
     );
    }
}
