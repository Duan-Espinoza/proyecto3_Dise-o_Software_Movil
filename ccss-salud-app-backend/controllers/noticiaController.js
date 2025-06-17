const { sql, config } = require('../db/sql');

exports.getNoticias = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().execute('sp_MostrarTodasLasNoticias');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};