import { IVehicleBase } from "./ivehiclebase";

export interface IVehicle extends IVehicleBase {
    description: string | null;
}