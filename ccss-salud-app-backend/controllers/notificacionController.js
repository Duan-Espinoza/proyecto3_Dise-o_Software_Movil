const { sql, config } = require('../db/sql');

// Obtener todas las notificaciones
exports.getNotificaciones = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`
      SELECT id, mensaje, fecha_creacion
      FROM notificaciones
      ORDER BY fecha_creacion DESC
    `);
    res.json({ notificaciones: result.recordset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};