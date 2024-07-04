import { Address } from "./address.interface";

export interface FormData {
    ownerName: string;
    tradeName: string;
    corporateName: string;
    email: string;
    password: string;
    confirmPassword: string;
    document: string;
    phoneNumber: string;
    dateOfBirth: string;
    barbershopAddress: Address;
    personalAddress: Address;
}