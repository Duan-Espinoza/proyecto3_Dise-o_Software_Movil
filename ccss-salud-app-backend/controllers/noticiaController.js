const { sql, config } = require('../db/sql');

// Obtener todas las noticias
exports.getNoticias = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().execute('sp_MostrarTodasLasNoticias');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener top 3 noticias
exports.getTopNoticias = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().execute('sp_Top3NoticiasRecientes');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener noticia por ID
exports.getNoticiaById = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('id_noticia', sql.Int, id)
      .execute('sp_MostrarNoticiaPorId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};