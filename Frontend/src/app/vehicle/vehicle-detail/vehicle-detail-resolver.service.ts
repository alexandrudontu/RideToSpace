import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Vehicle } from 'src/app/model/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleDetailResolverService implements Resolve<Vehicle> {

constructor(private router: Router, private vehiclesService: VehiclesService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vehicle> {
  const vehicleId = +route.params['id'];

  return this.vehiclesService.getVehicle(vehicleId).pipe(
    map(vehicle => {
      if (vehicle) {
        return vehicle; 
      } else {
        this.router.navigate(['/']);
        throw new Error('Vehicle not found');
      }
    }),
    catchError(err => {
      console.error('Error in resolver:', err);
      this.router.navigate(['/']); 
      return of(); 
    })
  );
}
}
