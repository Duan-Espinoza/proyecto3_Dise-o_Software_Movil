import { UserModel } from '../models'; // Importar el modelo de usuario
import { hash, compare } from 'bcrypt'; // Importar funciones de bcrypt para el manejo de contraseñas

// Función para crear un nuevo usuario
export const createUser = async (userData) => {
    const hashedPassword = await hash(userData.password, 10); // Hashear la contraseña
    const newUser = await UserModel.create({ ...userData, password: hashedPassword }); // Crear el usuario en la base de datos
    return newUser;
};

// Función para autenticar un usuario
export const authenticateUser = async (email, password) => {
    const user = await UserModel.findByEmail(email); // Buscar el usuario por email
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const isMatch = await compare(password, user.password); // Comparar la contraseña
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }
    return user; // Retornar el usuario autenticado
};

// Otras funciones de servicio pueden ser añadidas aquí según sea necesario.