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

export interface Barbers {
    id: string;
    username: string;
    dateOfBirth: string;
    document: string;
    email: string;
}


export interface BarbersService {
    id: string;
    serviceName: string;
    value: number;
    description: string;
}