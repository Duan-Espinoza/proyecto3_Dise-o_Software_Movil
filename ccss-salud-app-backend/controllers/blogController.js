const { sql, config } = require('../db/sql');

// Obtener todos los blogs
exports.getBlogs = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().execute('sp_MostrarTodosLosBlogs');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener top 3 blogs
exports.getTopBlogs = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().execute('sp_Top3BlogsRecientes');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener blog por ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('id_blog', sql.Int, id)
      .execute('sp_MostrarBlogPorId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Blog no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};