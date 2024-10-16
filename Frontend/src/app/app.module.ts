import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VehicleCardComponent } from './vehicle/vehicle-card/vehicle-card.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VehiclesService } from './services/vehicles.service';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const appRoutes: Routes = [
  {path: '', component: VehicleListComponent},
  {path: 'sell-vehicle', component: VehicleListComponent},
  {path: 'add-vehicle', component: AddVehicleComponent},
  {path: 'vehicle-detail/:id', component: VehicleDetailComponent},
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
    UserRegisterComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    VehiclesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
