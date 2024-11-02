import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/model/photo';
import { Vehicle } from 'src/app/model/vehicle';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AlertifyService } from 'src/app/services/alertify.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() vehicle!: Vehicle;
  @Output() mainPhotoChangedEvent = new EventEmitter<string>();

  uploader!: FileUploader;
  hasBaseDropZoneOver!: boolean;
  baseUrl = environment.baseUrl;
  maxAllowedFileSize=1*1024*1024;

  response!: string;

  constructor(private vehiclesService: VehiclesService, private alertify: AlertifyService) { }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeFileUploader() {
    this.uploader = new FileUploader({
        url: this.baseUrl +'/api/vehicle/add/photo/'+ String(this.vehicle.id),
        authToken: 'Bearer '+ localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: true,
        maxFileSize:this.maxAllowedFileSize
    });

    this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
          const photo = JSON.parse(response);

          if (this.vehicle?.photos) {
              this.vehicle.photos.push(photo);
          }
      }
  };
  

    this.uploader.onErrorItem = (item, response, status, headers) => {
        let errorMessage = 'Some unknown error occured';
        if (status===401) {
            errorMessage ='Your session has expired, login again';
        }

        if (response) {
            errorMessage = response;
        }

        this.alertify.error(errorMessage);
    };
}

  mainPhotoChanged(url: string){
    this.mainPhotoChangedEvent.emit(url);
  }

  ngOnInit() {
    this.initializeFileUploader();
  }

  setPrimaryPhoto(vehicleId: number, photo: Photo) {
    this.vehiclesService.setPrimaryPhoto(vehicleId, photo.publicId).subscribe(() => {
        this.mainPhotoChanged(photo.imageUrl);
        
        if (this.vehicle?.photos) {
            this.vehicle.photos.forEach(p => {
                if (p.isPrimary) {
                    p.isPrimary = false;
                }
                if (p.publicId === photo.publicId) {
                    p.isPrimary = true;
                }
            });
        }
    });
  }

  deletePhoto(vehicleId: number, photo: Photo) {
    this.vehiclesService.deletePhoto(vehicleId, photo.publicId).subscribe(() => {

        if (this.vehicle?.photos) {
            this.vehicle.photos = this.vehicle.photos.filter(p =>
                p.publicId !== photo.publicId
            );
        }
    });
  }
}
