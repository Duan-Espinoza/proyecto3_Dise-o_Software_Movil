const { sql, config } = require('../db/sql');

// Obtener todos los documentos
exports.getDocumentos = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().execute('sp_VerTodosDocumentos');
    // Ajusta los nombres de los campos según tu base de datos
    const documentos = result.recordset.map(doc => ({
      id_pdf: doc.id_pdf,
      nombre_pdf: doc.nombre_pdf
    }));
    res.json(documentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Descargar PDF por ID
exports.downloadDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('id_pdf', sql.Int, id)
      .execute('sp_ObtenerDocumentoPorId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }
    const documento = result.recordset[0];
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${documento.nombre_pdf}"`);
    res.send(documento.archivo_pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};