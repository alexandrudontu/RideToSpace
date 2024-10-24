import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IVehicleBase } from '../model/ivehiclebase';
import { IVehicle } from '../model/ivehicle';
import { Vehicle } from '../model/vehicle';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) { }

  getVehicle(id: number) {
    return this.getAllVehicles().pipe(
      map(vehiclesArray => {
        return vehiclesArray.find(p => p.Id === id);
      })
    );
  }

  getAllVehicles(CargoCrew?: string): Observable<IVehicleBase[]>{
    return this.http.get<IVehicleBase[]>('data/vehicles.json').pipe(
      map(data => {
        const vehiclesArray: Array<IVehicleBase> = [];
        const localVehicles = localStorage.getItem('newVeh');
        const parsedLocalVehicles = localVehicles ? JSON.parse(localVehicles) : [];
        if(parsedLocalVehicles) {
          for (const id in parsedLocalVehicles) {
            if(CargoCrew) {
              if (parsedLocalVehicles.hasOwnProperty(id) && parsedLocalVehicles[id].CargoCrew === CargoCrew) {
                vehiclesArray.push(parsedLocalVehicles[id]);
              }
            } else {
              vehiclesArray.push(parsedLocalVehicles[id]);
            }
          }
        }

        for (const id in data) {
          if(CargoCrew) {
            if (data.hasOwnProperty(id) && data[id].CargoCrew === CargoCrew) {
              vehiclesArray.push(data[id]);
            }
          } else {
            vehiclesArray.push(data[id]);
          }
        }

        return vehiclesArray;
      })
    );
    return this.http.get<IVehicle[]>('data/vehicles.json');
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
