import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Vehicle } from '../model/vehicle';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getAllFuels(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + '/api/fuel')
  }

  getVehicle(id: number): Observable<Vehicle | undefined> {
    return this.http.get<Vehicle>(this.baseUrl + '/api/vehicle/details/' + id.toString());
  }
  

  getAllVehicles(Crew: boolean): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl + '/api/vehicle/crewrated/' + Crew.toString());
  }

  addVehicle(vehicle: Vehicle) {
    let newVeh = [vehicle];
    localStorage.setItem('newVeh', JSON.stringify(newVeh));

    const storedVeh = localStorage.getItem('newVeh');
    if (storedVeh) {
      newVeh = [vehicle, ...JSON.parse(storedVeh)];
    } else {
      newVeh = [vehicle]; 
}
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
