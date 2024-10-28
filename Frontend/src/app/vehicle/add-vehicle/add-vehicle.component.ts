import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IVehicleBase } from 'src/app/model/ivehiclebase';
import { Vehicle } from 'src/app/model/vehicle';
import { AlertifyService } from 'src/app/services/alertify.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  //@ViewChild('Form') addVehicleForm!: NgForm;
  @ViewChild('formTabs') formTabs?: TabsetComponent;

  addVehicleForm!: FormGroup;
  nextClicked: boolean = false;
  vehicle = new Vehicle();

  vehicleTypes: Array<string> = ['Expendable', 'Partially Reusable', 'Fully Reusable'];
  payloadTypes: Array<string> = ['Cargo', 'Cargo & Crew'];
  fuelList: any[] = [];

  vehicleView: IVehicleBase = {
    Id: null,
    Reusability: null,
    Name: '',
    Fuel: '',
    PayloadCapacity: null,
    Price: null,
    CargoCrew: '',
    Operational: null,
    Security: null,
    Height: null,
    Mass: null,
    Description: null
  };

  constructor(private fb: FormBuilder, 
              private router: Router,
              private VehiclesService: VehiclesService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.createAddVehicleForm();
    this.onFormValueChanges();
    this.VehiclesService.getAllFuels().subscribe(data => {
      this.fuelList = data;
      console.log(data);
    }

    )
  }

  createAddVehicleForm() {
    this.addVehicleForm = this.fb.group({
      BasicInfo: this.fb.group({
        Name: [null, Validators.required],
        Reusability: [null, Validators.required],
        PayloadCapacity: [null, Validators.required],
        CargoCrew: [null, Validators.required]
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        Security: [null, Validators.required],
      }),
      OtherDetails: this.fb.group({
        Operational: [null, Validators.required],
        Height: [null, Validators.required],
        Mass: [null, Validators.required],
        Fuel: [null, Validators.required],
        Description: [null]
      })
    });
  }

  onFormValueChanges() {
    this.addVehicleForm.valueChanges.subscribe(val => {
      this.vehicleView = {
        Id: this.vehicleView.Id,  
        Name: val.BasicInfo.Name || '',
        Reusability: val.BasicInfo.Reusability || '',
        PayloadCapacity: val.BasicInfo.PayloadCapacity || '',
        CargoCrew: val.BasicInfo.CargoCrew || '',
        Price: val.PriceInfo.Price || '',
        Security: val.PriceInfo.Security || '',
        Operational: val.OtherDetails.Operational || '',
        Height: val.OtherDetails.Height || '',
        Mass: val.OtherDetails.Mass || '',
        Fuel: val.OtherDetails.Fuel || '',
        Description: val.OtherDetails.Description || ''
      };
    });
  }

  get BasicInfo() {
    return this.addVehicleForm.get('BasicInfo');
  }
 
  get Name() {
    return this.addVehicleForm.get('BasicInfo.Name');
  }

  get Reusability() {
    return this.addVehicleForm.get('BasicInfo.Reusability');
  }

  get PayloadCapacity() {
    return this.addVehicleForm.get('BasicInfo.PayloadCapacity');
  }

  get CargoCrew() {
    return this.addVehicleForm.get('BasicInfo.CargoCrew');
  }

  get PriceInfo() {
    return this.addVehicleForm.get('PriceInfo');
  }

  get Price() {
    return this.addVehicleForm.get('PriceInfo.Price');
  }

  get Security() {
    return this.addVehicleForm.get('PriceInfo.Security');
  }

  get OtherDetails() {
    return this.addVehicleForm.get('OtherDetails');
  }

  get Operational() {
    return this.addVehicleForm.get('OtherDetails.Operational');
  }

  get Height() {
    return this.addVehicleForm.get('OtherDetails.Height');
  }

  get Mass() {
    return this.addVehicleForm.get('OtherDetails.Mass');
  }

  get Fuel() {
    return this.addVehicleForm.get('OtherDetails.Fuel');
  }

  get Description() {
    return this.addVehicleForm.get('OtherDetails.Description');
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if(this.allTabsValid()) {
      this.mapVehicle();
      this.VehiclesService.addVehicle(this.vehicle);
      this.alertify.success('Form Submitted');
      console.log(this.addVehicleForm);
    } else {
      this.alertify.error('Form is invalid');
    }
    if(this.CargoCrew?.value === 'Cargo') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/crew']);
    }
  }

  mapVehicle(): void {
    this.vehicle.Id = this.VehiclesService.newVehId();
    this.vehicle.Name = this.Name?.value;
    this.vehicle.Reusability = this.Reusability?.value;
    this.vehicle.PayloadCapacity = this.PayloadCapacity?.value;
    this.vehicle.Price = this.Price?.value;
    this.vehicle.Security = this.Security?.value;
    this.vehicle.CargoCrew = this.CargoCrew?.value;
    this.vehicle.Operational = this.Operational?.value;
    this.vehicle.Height = this.Height?.value;
    this.vehicle.Mass = this.Mass?.value;
    this.vehicle.Fuel = this.Fuel?.value;
    this.vehicle.Description = this.Description?.value;
  }

  allTabsValid(): boolean {
    if(this.BasicInfo?.invalid) {
      this.formTabs!.tabs[0].active = true;
      return false;
    }

    if(this.PriceInfo?.invalid) {
      this.formTabs!.tabs[1].active = true;
      return false;
    }

    if(this.OtherDetails?.invalid) {
      this.formTabs!.tabs[2].active = true;
      return false;
    }
    return true;
  }

  selectTab(nextTabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if(IsCurrentTabValid) {
      this.formTabs!.tabs[nextTabId].active = true;
    }
  }
}
