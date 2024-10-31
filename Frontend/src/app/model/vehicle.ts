import { IVehicleBase } from "./ivehiclebase";

export class Vehicle implements IVehicleBase {
    id!: number;
    reusability!: number;
    name!: string;
    fuel!: string;
    crew!: boolean;
    payloadCapacity!: number;
    price!: number | null;
    operational!: boolean;
    security!: number;
    height!: number;
    mass!: number;
    description!: string;
    image?: string;
}
