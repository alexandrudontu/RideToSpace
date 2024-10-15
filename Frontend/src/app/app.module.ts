import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VehicleCardComponent } from './vehicle/vehicle-card/vehicle-card.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VehiclesService } from './services/vehicles.service';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';

const appRoutes: Routes = [
  {path: '', component: VehicleListComponent},
  {path: 'sell-vehicle', component: VehicleListComponent},
  {path: 'add-vehicle', component: AddVehicleComponent},
  {path: 'vehicle-detail/:id', component: VehicleDetailComponent},
  {path: '**', component: VehicleListComponent}
]

@NgModule({
  declarations: [	
    AppComponent,
    VehicleCardComponent,
    VehicleListComponent,
    NavBarComponent,
    AddVehicleComponent,
    VehicleDetailComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    VehiclesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
