import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Ikeyvaluepair } from 'src/app/model/ikeyvaluepair';
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

  reusabilityTypes!: Ikeyvaluepair[];
  fuelList: any[] = [];

  vehicleView: IVehicleBase = {
    id: null,
    reusability: '',
    name: '',
    fuel: '',
    payloadCapacity: null,
    price: null,
    crew: null,
    operational: null,
    security: null,
    height: null,
    mass: null,
    description: null
  };

  constructor(private fb: FormBuilder, 
              private router: Router,
              private VehiclesService: VehiclesService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    if(!localStorage.getItem('email'))
    {
      this.alertify.error('You must be logged in to add a vehicle');
      this.router.navigate(['/user/login']);
    }
    this.createAddVehicleForm();
    this.onFormValueChanges();
    this.VehiclesService.getAllFuels().subscribe(data => {
      this.fuelList = data;
      console.log(data);
    });
    this.VehiclesService.getReusabilityTypes().subscribe(data => {
      this.reusabilityTypes = data;
    })
  }

  parseToFloat(value: string): number | null {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }  

  createAddVehicleForm() {
    this.addVehicleForm = this.fb.group({
      BasicInfo: this.fb.group({
        Name: [null, Validators.required],
        Reusability: [null, Validators.required],
        PayloadCapacity: [null, Validators.required],
        Crew: [null, Validators.required]
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
       const selectedReusability = this.reusabilityTypes
      ? this.reusabilityTypes.find(type => type.id === val.BasicInfo.Reusability)?.name || ''
      : '';

      this.vehicleView = {
        id: this.vehicleView.id,  
        name: val.BasicInfo.Name || '',
        reusability: selectedReusability,
        payloadCapacity: val.BasicInfo.PayloadCapacity || '',
        crew: val.BasicInfo.Crew || null,
        price: val.PriceInfo.Price || '',
        security: val.PriceInfo.Security || '',
        operational: val.OtherDetails.Operational || '',
        height: val.OtherDetails.Height || '',
        mass: val.OtherDetails.Mass || '',
        fuel: val.OtherDetails.Fuel || '',
        description: val.OtherDetails.Description || ''
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

  get Crew() {
    return this.addVehicleForm.get('BasicInfo.Crew');
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
      this.VehiclesService.addVehicle(this.vehicle).subscribe(
        () => {
          this.alertify.success('Form Submitted');
          console.log(this.addVehicleForm);
          if(this.Crew?.value === false) {
                this.router.navigate(['/']);
              } else {
                this.router.navigate(['/crew']);
              }
        }
      );
    } else {
      this.alertify.error('Form is invalid');
    }
    
  }

  mapVehicle(): void {
    this.vehicle.id = this.VehiclesService.newVehId();
    this.vehicle.name = this.Name?.value;
    this.vehicle.ReusabilityId = this.Reusability?.value;
    this.vehicle.payloadCapacity = this.PayloadCapacity?.value;
    this.vehicle.price = this.Price?.value;
    this.vehicle.security = this.Security?.value;
    this.vehicle.crew = this.Crew?.value;
    this.vehicle.operational = this.Operational?.value;
    this.vehicle.height = this.Height?.value;
    this.vehicle.mass = this.Mass?.value;
    this.vehicle.FuelId = this.Fuel?.value;
    this.vehicle.description = this.Description?.value;
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
