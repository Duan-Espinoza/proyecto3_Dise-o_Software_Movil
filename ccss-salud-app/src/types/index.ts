// Este archivo define los tipos y interfaces utilizados en la aplicación. 
// Ayuda a mantener la tipificación en TypeScript y mejora la legibilidad del código.

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    medicalHistory: string[];
}

export interface Appointment {
    id: string;
    patientId: string;
    date: string;
    time: string;
    doctorId: string;
    status: 'scheduled' | 'completed' | 'canceled';
}

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    availability: string[];
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}