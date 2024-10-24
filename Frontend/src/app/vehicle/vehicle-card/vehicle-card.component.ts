import { Component, Input } from "@angular/core";
import { IVehicleBase } from "src/app/model/ivehiclebase";


@Component({
    selector: 'app-vehicle-card',
    templateUrl: './vehicle-card.component.html',
    styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent {
    @Input() vehicle!: IVehicleBase;
    @Input() hideIcons!: boolean;
}