import { Address } from "./address.interface";

export interface Content {
    id: string;
    ownerName: string;
    corporateName: string;
    tradeName: string;
    document: string;
    email: string;
    addresses: Address[];
}

export interface Barbershop {
    content: Content[];
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}