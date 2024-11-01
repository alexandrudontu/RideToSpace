import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Vehicle } from '../model/vehicle';
import { environment } from 'src/environments/environment';
import { Ikeyvaluepair } from '../model/ikeyvaluepair';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getAllFuels(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + '/api/fuel')
  }

  getReusabilityTypes(): Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/api/reusability/list')
  }

  getVehicle(id: number): Observable<Vehicle | undefined> {
    return this.http.get<Vehicle>(this.baseUrl + '/api/vehicle/details/' + id.toString());
  }
  
  getAllVehicles(Crew: boolean): Observable<Vehicle[]> {
    if(Crew === true) {
      return this.http.get<Vehicle[]>(this.baseUrl + '/api/vehicle/crewrated/true');
    }
    else {
      return forkJoin([
        this.http.get<Vehicle[]>(this.baseUrl + '/api/vehicle/crewrated/false'),
        this.http.get<Vehicle[]>(this.baseUrl + '/api/vehicle/crewrated/true')
      ]).pipe(
        map(([crewVehicles, nonCrewVehicles]) => [...crewVehicles, ...nonCrewVehicles])
      );
    }
  }

  addVehicle(vehicle: Vehicle) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post(this.baseUrl + '/api/vehicle/add', vehicle, httpOptions);
  }

  newVehId(): number {
    const currentVID = localStorage.getItem('VID');
    const someId: number = 101;
    if(currentVID) {
      const newVID = currentVID ? +currentVID + 1 : someId; 
      localStorage.setItem('VID', String(newVID));
      return +(localStorage.getItem('VID') || someId);
    } 
    return someId;
  }
}
