// utils.ts
import { cnpj, cpf } from 'cpf-cnpj-validator';

export function convertToDate(dateStr: string): Date {
    const parts = dateStr.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}

export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function handleTextChange(setter: (value: string) => void) {
    return (text: string) => {
        setter(text ?? '');
    };
}

export function isValidCNPJ(cnpjStr: string): boolean {
    return cnpj.isValid(cnpjStr);
}

export function isValidCPF(cpfStr: string): boolean {
    return cpf.isValid(cpfStr);
}

export function removeFormatting(value: string): string {
    return value.replace(/[^\d]/g, '');
}