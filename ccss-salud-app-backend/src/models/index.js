import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mssql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos aquí
db.User = require('./User')(sequelize, Sequelize);
db.Appointment = require('./Appointment')(sequelize, Sequelize);
// Agregar más modelos según sea necesario

// Establecer relaciones entre modelos si es necesario
// db.User.hasMany(db.Appointment);
// db.Appointment.belongsTo(db.User);

export default db;