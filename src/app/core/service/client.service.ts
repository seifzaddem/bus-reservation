import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ClientModel} from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() {
  }

  getCurrentClient(): Observable<ClientModel> {
    return of({
      id: 1,
      name: "John Doe",
      mail: "john.doe@gmail.com"
    });
  }
}

