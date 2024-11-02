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
  public mainPhotoUrl: string = '';
  isAdmin = false;
  vehicle: Vehicle = new Vehicle();
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private vehiclesService: VehiclesService) { }

  ngOnInit() {
    if(localStorage.getItem('role') == "admin")
      {
        this.isAdmin = true;
      }
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

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];

    this.galleryImages = this.getVehiclePhotos();
  }

  changePrimaryPhoto(mainPhotoUrl: string) {
    this.mainPhotoUrl = mainPhotoUrl;
}

  getVehiclePhotos(): NgxGalleryImage[] {
    const photoUrls: NgxGalleryImage[] = [];

    if (this.vehicle?.photos) {
      for(const photo of this.vehicle.photos) {
        if(photo.isPrimary)
        {
          this.mainPhotoUrl = photo.imageUrl;
        }
        photoUrls.push(
          {
            small: photo.imageUrl,
            medium: photo.imageUrl,
            big: photo.imageUrl
          }
        );
      }
    }

    return photoUrls;
  }
}
