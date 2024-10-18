import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IVehicle } from '../vehicle/IVehicle.interface';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) { }

  getAllVehicles(Reusability: number): Observable<IVehicle[]>{
    return this.http.get<IVehicle[]>('data/vehicles.json').pipe(
      map(data => {
        const vehiclesArray: Array<IVehicle> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].Reusability === Reusability) {
            vehiclesArray.push(data[id]);
          }
        }
        return vehiclesArray;
      })
    );
  }
}
