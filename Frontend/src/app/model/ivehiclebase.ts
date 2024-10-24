export interface IVehicleBase {
    Id: number | null;
    Reusability: number | null;
    Name: string | null;
    Fuel: string | null;
    CargoCrew: string | null,
    PayloadCapacity: number | null;
    Price: number | null;
    Operational: boolean | null;
    Security: number | null;
    Height: number | null;
    Mass: number | null;
    Description: string | null;
    Image?: string;
}