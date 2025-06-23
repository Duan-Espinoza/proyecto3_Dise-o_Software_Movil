const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticiaController');
const blogController = require('../controllers/blogController');
const documentoController = require('../controllers/documentoController');
const notificacionController = require('../controllers/notificacionController');

// Noticias
router.get('/noticias', noticiaController.getNoticias);
router.get('/noticias/top', noticiaController.getTopNoticias);
router.get('/noticia/:id', noticiaController.getNoticiaById);

// Blogs
router.get('/blogs', blogController.getBlogs);
router.get('/blogs/top', blogController.getTopBlogs);
router.get('/blog/:id', blogController.getBlogById);

// Documentos
router.get('/documentos', documentoController.getDocumentos);
router.get('/documento/:id', documentoController.downloadDocumento);

// Notificaciones
router.get('/notificaciones', notificacionController.getNotificaciones);

module.exports = router;