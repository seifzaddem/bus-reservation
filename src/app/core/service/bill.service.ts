import {Injectable} from '@angular/core';
import {BillModel} from '../model/bill.model';
import {Observable, of} from 'rxjs';
import {JsonParserService} from '../../shared/service/json-parser.service';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private jsonParserService: JsonParserService) {
  }

  createBill(billModel: BillModel): Observable<void> {
    let unparsedBills = localStorage.getItem("bills");
    let bills: BillModel[] = this.jsonParserService.parseString(unparsedBills);
    billModel.id = uuid();
    if (!bills) {
      bills = [];
    }
    bills.push(billModel);
    localStorage.setItem("bills", JSON.stringify(bills));
    return of(null);
  }
}
