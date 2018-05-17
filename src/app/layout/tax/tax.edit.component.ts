import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
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
    templateUrl: './tax.edit.component.html',
  //  styleUrls: ['./tax.component.scss'],
    animations: [routerTransition()]
})
export class TaxEditComponent implements OnInit {
  public taxForm: FormGroup;
  private rows: any = [];
  currentItemID: any;
  taxdata: Tax;
    constructor(
      private _fb: FormBuilder,
      private taxService: TaxService,
      private router: Router,
      private route: ActivatedRoute) {
    }
    ngOnInit() {
      this.initForm();
      this.currentItemID = this.route.snapshot.params['id'];
      this.getTax(this.currentItemID);
    }

    initForm(){
      this.taxForm = this._fb.group({
         name: ['', [Validators.required]],
         code:[''],
         rate:['', [Validators.required]],
         type:['percentage', [Validators.required]]
       });
    }

    private patchForm() {
      this.taxForm.patchValue(this.taxdata);
    }


    getTax(id) {
      this.taxService.getTaxByID(id).subscribe(
        res => { if (res.status === 200 || res.status === 304) {
        //  let resdata = res.json().rows;
          this.taxdata = res.json();
          this.patchForm();
       }
      else{
        // this.taxdata = []
       }
     }

     );
   }
    onEdit(){
      this.taxService.editTax(this.taxForm.value, this.currentItemID).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/tax']) : this.router.navigate(['/404'])
     );
    }



}
