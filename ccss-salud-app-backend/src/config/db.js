const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Para Azure
        trustServerCertificate: true // Cambiar a false en producción
    }
};

const connectToDatabase = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Conexión a la base de datos establecida con éxito.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
};

module.exports = {
    connectToDatabase,
    sql
};