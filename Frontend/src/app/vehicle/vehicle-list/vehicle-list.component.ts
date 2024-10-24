import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ActivatedRoute } from '@angular/router';
import { IVehicleBase } from 'src/app/model/ivehiclebase';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  CargoCrew = "Cargo";
  vehicles!: IVehicleBase[];
  Today = new Date();
  Fuel = '';
  SearchFuel = '';
  SortbyParam = '';
  SortDirection = 'asc';

  constructor(private route: ActivatedRoute, private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.CargoCrew = "Cargo & Crew";
    }
    this.vehiclesService.getAllVehicles(this.CargoCrew).subscribe(
      data => {
        this.vehicles = data;
        
      }, error => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }

  onFuelFilter() {
    this.SearchFuel = this.Fuel;
  }

  onFuelFilterClear() {
    this.SearchFuel = '';
    this.Fuel = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
