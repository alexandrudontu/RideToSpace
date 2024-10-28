import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Vehicle } from '../model/vehicle';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) { }

  getAllFuels(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5085/api/fuel')
  }

  getVehicle(id: number) {
    return this.getAllVehicles().pipe(
      map(vehiclesArray => {
        return vehiclesArray.find(p => p.Id === id);
      })
    );
  }

  getAllVehicles(CargoCrew?: string): Observable<Vehicle[]> {
    return this.http.get<{ [key: string]: Vehicle }>('data/vehicles.json').pipe(
      map(data => {
        const vehiclesArray: Array<Vehicle> = [];
        const localVehicles = localStorage.getItem('newVeh');
        const parsedLocalVehicles = localVehicles ? JSON.parse(localVehicles) : [];
  
        if (parsedLocalVehicles) {
          for (const id in parsedLocalVehicles) {
            if (parsedLocalVehicles.hasOwnProperty(id)) {
              if (CargoCrew === 'Cargo & Crew' && parsedLocalVehicles[id].CargoCrew === 'Cargo & Crew') {
                vehiclesArray.push(parsedLocalVehicles[id]);
              }
              else if (CargoCrew === 'Cargo' && (parsedLocalVehicles[id].CargoCrew === 'Cargo' || parsedLocalVehicles[id].CargoCrew === 'Cargo & Crew')) {
                vehiclesArray.push(parsedLocalVehicles[id]);
              }
              else if (!CargoCrew) {
                vehiclesArray.push(parsedLocalVehicles[id]);
              }
            }
          }
        }
  
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            if (CargoCrew === 'Cargo & Crew' && data[id].CargoCrew === 'Cargo & Crew') {
              vehiclesArray.push(data[id]);
            }
            else if (CargoCrew === 'Cargo' && (data[id].CargoCrew === 'Cargo' || data[id].CargoCrew === 'Cargo & Crew')) {
              vehiclesArray.push(data[id]);
            }
            else if (!CargoCrew) {
              vehiclesArray.push(data[id]);
            }
          }
        }
        return vehiclesArray;
      })
    );
    return this.http.get<Vehicle[]>('data/vehicles.json');
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
