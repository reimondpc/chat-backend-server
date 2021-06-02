/*
    Path: /api/mensajes
*/

const { Router } = require('express');
const { getMessages } = require('../controllers/messages');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.get('/:de', validateJWT, getMessages);

module.exports = router;