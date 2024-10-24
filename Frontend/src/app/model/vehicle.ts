import { IVehicleBase } from "./ivehiclebase";

export class Vehicle implements IVehicleBase {
    Id!: number;
    Reusability!: number;
    Name!: string;
    Fuel!: string;
    CargoCrew!: string;
    PayloadCapacity!: number;
    Price!: number | null;
    Operational!: boolean;
    Security!: number;
    Height!: number;
    Mass!: number;
    Description!: string;
    Image?: string;
}
