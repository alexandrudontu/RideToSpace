import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { IVehicle } from '../IVehicle.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  SellBuy = 1;
  vehicles!: IVehicle[];

  constructor(private route: ActivatedRoute, private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellBuy = 2;
    }
    this.vehiclesService.getAllVehicles(this.SellBuy).subscribe(
      data => {
        this.vehicles = data;
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }
}
