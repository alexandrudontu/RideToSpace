export interface IVehicleBase {
    id: number | null;
    reusability: number | null;
    name: string | null;
    fuel: string | null;
    crew: boolean | null,
    payloadCapacity: number | null;
    price: number | null;
    operational: boolean | null;
    security: number | null;
    height: number | null;
    mass: number | null;
    description: string | null;
    image?: string;
}