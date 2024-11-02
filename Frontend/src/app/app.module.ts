import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { VehicleCardComponent } from './vehicle/vehicle-card/vehicle-card.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VehiclesService } from './services/vehicles.service';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { VehicleDetailResolverService } from './vehicle/vehicle-detail/vehicle-detail-resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { HttpErrorInterceptorService } from './services/httperror-interceptor.service';
import { PhotoEditorComponent } from './vehicle/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

const appRoutes: Routes = [
  {path: '', component: VehicleListComponent},
  {path: 'crew', component: VehicleListComponent},
  {path: 'add-vehicle', component: AddVehicleComponent},
  { 
    path: 'vehicle-detail/:id', 
    component: VehicleDetailComponent, 
    resolve: {
      veh: VehicleDetailResolverService
    }
  },
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: '**', component: VehicleListComponent}
]

@NgModule({
  declarations: [	
    AppComponent,
    VehicleCardComponent,
    VehicleListComponent,
    NavBarComponent,
    AddVehicleComponent,
    VehicleDetailComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe,
    PhotoEditorComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule,
    TabsModule,
    ButtonsModule,
    BsDatepickerModule,
    NgxGalleryModule,
    FileUploadModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    VehiclesService,
    AlertifyService,
    AuthService,
    VehicleDetailResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
