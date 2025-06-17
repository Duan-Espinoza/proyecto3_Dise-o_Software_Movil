const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticiaController');

router.get('/noticias', noticiaController.getNoticias);

module.exports = router;