import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReservationModelModalWrapper} from '../../model/reservation.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentService} from '../../service/payment.service';
import {CardPayment} from '../../model/bill.model';
import {tap} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {MatSnackBar} from '@angular/material/snack-bar';

@UntilDestroy()
@Component({
  selector: 'app-credit-card-payment-modal',
  templateUrl: './credit-card-payment-modal.component.html',
  styleUrls: ['./credit-card-payment-modal.component.scss']
})
export class CreditCardPaymentModalComponent implements OnInit {

  form: FormGroup;

  readonly CARD_NUMBER_FORM_KEY: keyof CardPayment = 'cardNumber';
  readonly EXPIRATION_DATE_FORM_KEY: keyof CardPayment = 'expirationDate';

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReservationModelModalWrapper,
              private paymentService: PaymentService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<CreditCardPaymentModalComponent>,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        [this.CARD_NUMBER_FORM_KEY]: this.formBuilder.control(null, [Validators.required, Validators.pattern('^\\d{12}$')]),
        [this.EXPIRATION_DATE_FORM_KEY]: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/(1[8-9]|2[0-9])$')])
      }
    );
  }

  executePayment() {
    this.paymentService.payByCard(this.form.getRawValue()).pipe(
      tap(() => {
        this.snackBar.open("Paiement par carte effectué avec succès", "X", {
          horizontalPosition: "right",
          verticalPosition: "top",
        })
        this.dialogRef.close(true);
      }),
      untilDestroyed(this)
    ).subscribe();
  }
}
