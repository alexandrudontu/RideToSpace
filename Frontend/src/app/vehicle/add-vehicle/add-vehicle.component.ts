import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IVehicle } from '../IVehicle.interface';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @ViewChild('Form') addVehicleForm!: NgForm;
  @ViewChild('formTabs') formTabs?: TabsetComponent;

  vehicleTypes: Array<string> = ['Expendable', 'Partially Reusable', 'Fully Reusable'];

  vehicleView: IVehicle = {
    "Id": null,
    "Reusability": null,
    "Name": '',
    "Fuel": null,
    "PayloadCapToLEO": null,
    "Price": null};

  constructor(private router: Router) { }

  ngOnInit() {
  }


  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {

  }

  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
