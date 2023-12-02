import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ClientModel} from '../../model/client.model';
import {ClientService} from '../../service/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  client$: Observable<ClientModel>;

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.client$ = this.clientService.getCurrentClient();
  }

}
