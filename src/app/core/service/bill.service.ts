import {Injectable} from '@angular/core';
import {BillModel} from '../model/bill.model';
import {Observable, of} from 'rxjs';
import {JsonParserService} from '../../shared/service/json-parser.service';
import {v4 as uuid} from 'uuid';
import {ClientModel} from '../model/client.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private apiUrl = 'assets/bill.json';

  constructor(private jsonParserService: JsonParserService,
              private http: HttpClient) {
  }

  getBills(): Observable<BillModel[]> {
    return this.http.get<BillModel[]>(this.apiUrl);
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


  getBillsByClient(client: ClientModel): Observable<BillModel[]> {
    let unparsedBills = localStorage.getItem("bills");
    let bills: BillModel[] = this.jsonParserService.parseString(unparsedBills);
    bills = bills ? bills.filter(billModel => billModel.reservation.clientId == client.id) : [];
    return of(bills);
  }

}
