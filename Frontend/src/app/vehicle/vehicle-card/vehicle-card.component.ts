import { Component, Input } from "@angular/core";
import { IVehicle } from "../IVehicle.interface";


@Component({
    selector: 'app-vehicle-card',
    //template: `<h1>I am a card</h1>`,
    templateUrl: './vehicle-card.component.html',
    //styles: ['h1 {font-weight: normal;}']
    styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent {
    @Input() vehicle!: IVehicle;
}