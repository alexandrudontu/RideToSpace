import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {
  public vehicleId!: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.vehicleId = Number(this.route.snapshot.params['id']);

    this.route.params.subscribe(
      (params) => {
        this,this.vehicleId = Number(params['id']);
      }
    )
  }

  onNext() {
    this.vehicleId += 1;
    this.router.navigate(['vehicle-detail', this.vehicleId]);
  }

}
