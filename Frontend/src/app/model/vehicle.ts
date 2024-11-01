import { IVehicleBase } from "./ivehiclebase";
import { Photo } from "./photo";

export class Vehicle implements IVehicleBase {
    id!: number;
    reusability!: string;
    ReusabilityId!: number;
    name!: string;
    fuel!: string;
    FuelId!: number;
    crew!: boolean;
    payloadCapacity!: number;
    price!: number | null;
    operational!: boolean;
    security!: number;
    height!: number;
    mass!: number;
    description!: string;
    image?: string;
    photos?: Photo[];
}
