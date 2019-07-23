/*
To check uniqe invoice id directive

*/
import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InvoicesService } from './invoices.service';




@Injectable()
export class UniqueInvoiceIdValidator implements AsyncValidator {
  constructor(private invoicesService: InvoicesService) {}




  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.invoicesService.isIdTaken(ctrl.value).
    map(isTaken => (isTaken ? { uniqueIDAlert: true } : null));
  }
}

@Directive({
  selector: '[appCheckUniqueInvoice]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueInvoiceIdValidator),
      multi: true
    }
  ]
})
export class UniqueInvoiceValidatorDirective {
  constructor(private validator: UniqueInvoiceIdValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
