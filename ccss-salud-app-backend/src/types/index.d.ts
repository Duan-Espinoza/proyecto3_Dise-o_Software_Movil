// Este archivo define tipos y interfaces TypeScript que se utilizan en la aplicación. 
// Proporciona una mejor autocompletación y verificación de tipos.

declare module 'express' {
    export interface Request {
        user?: any; // Define el tipo de usuario si es necesario
    }
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string; // Considerar usar un tipo más seguro para contraseñas
}

export interface HealthRecord {
    id: number;
    userId: number;
    date: Date;
    description: string;
}

export interface Response<T> {
    success: boolean;
    data?: T;
    message?: string;
}