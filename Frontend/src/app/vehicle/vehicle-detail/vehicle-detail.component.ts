import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/model/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {
  public vehicleId!: number;
  vehicle = new Vehicle();

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private vehiclesService: VehiclesService) { }

  ngOnInit() {
    this.vehicleId = Number(this.route.snapshot.params['id']);

    this.route.params.subscribe(
      (params) => {
        this.vehicleId = Number(params['id']);
        this.vehiclesService.getVehicle(this.vehicleId).subscribe(
          data => {
            this.vehicle.Name = data?.Name ?? '';
            this.vehicle.CargoCrew = data?.CargoCrew ?? '';
            this.vehicle.Fuel = data?.Fuel ?? '';
            this.vehicle.Description = data?.Description ?? '';
            this.vehicle.Mass = data?.Mass ?? 0;
            this.vehicle.Height = data?.Height ?? 0;
            this.vehicle.PayloadCapacity = data?.PayloadCapacity ?? 0;
            this.vehicle.Price = data?.Price ?? 0;
            this.vehicle.Reusability = data?.Reusability ?? 0;
            this.vehicle.Operational = data?.Operational ?? false;
            this.vehicle.Image = data?.Image;
          }
        )
      }
    )
  }

}
