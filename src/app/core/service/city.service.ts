import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CityModel} from '../model/city.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private citiesUrl = 'assets/cities.json';

  constructor(private http: HttpClient) {
  }

  getCities(): Observable<CityModel[]> {
    return this.http.get<CityModel[]>(this.citiesUrl);
  }
}
