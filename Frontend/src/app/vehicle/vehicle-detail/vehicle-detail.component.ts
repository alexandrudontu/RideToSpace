import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/model/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {
  public vehicleId!: number;
  public vehicle: Vehicle = new Vehicle();
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private vehiclesService: VehiclesService) { }

  ngOnInit() {
    this.vehicleId = +this.route.snapshot.params['id'];
    this.route.data.subscribe({
      next: (data: any) => {
        this.vehicle = data.veh; 
      },
      error: () => {
        console.error('Error fetching vehicle details');
        this.router.navigate(['/']); 
      }
    });

  //  this.route.params.subscribe(
  //    (params) => {
  //      this.vehicleId = Number(params['id']);
  //      this.vehiclesService.getVehicle(this.vehicleId).subscribe(
  //        data => {
  //          this.vehicle.Name = data?.Name ?? '';
  //          this.vehicle.CargoCrew = data?.CargoCrew ?? '';
  //          this.vehicle.Fuel = data?.Fuel ?? '';
  //          this.vehicle.Description = data?.Description ?? '';
  //          this.vehicle.Mass = data?.Mass ?? 0;
  //          this.vehicle.Height = data?.Height ?? 0;
  //          this.vehicle.PayloadCapacity = data?.PayloadCapacity ?? 0;
  //          this.vehicle.Price = data?.Price ?? 0;
  //          this.vehicle.Reusability = data?.Reusability ?? 0;
  //          this.vehicle.Operational = data?.Operational ?? false;
  //          this.vehicle.Image = data?.Image;
  //        }, error => this.router.navigate(['/'])
  //      )
  //    }
  //  );

  this.galleryOptions = [
    {
      width: '100%',
      height: '465px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: true
    }
  ];

  this.galleryImages = [
    {
      small: 'assets/images/starship.jpg',
      medium: 'assets/images/starship.jpg',
      big: 'assets/images/starship.jpg'
    },
    {
      small: 'assets/images/sls.jpg',
      medium: 'assets/images/sls.jpg',
      big: 'assets/images/sls.jpg'
    },
    {
      small: 'assets/images/falcon-9.jpg',
      medium: 'assets/images/falcon-9.jpg',
      big: 'assets/images/falcon-9.jpg'
    },{
      small: 'assets/images/electron.jpeg',
      medium: 'assets/images/electron.jpeg',
      big: 'assets/images/electron.jpeg'
    },
    {
      small: 'assets/img/gallery/5-small.jpeg',
      medium: 'assets/img/gallery/5-medium.jpeg',
      big: 'assets/img/gallery/5-big.jpeg'
    }
  ];
  }

}
