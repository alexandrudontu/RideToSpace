import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @ViewChild('Form') addVehicleForm!: NgForm;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {

  }
}
