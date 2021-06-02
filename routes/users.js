/*
    /api/users
*/

const { Router } = require('express');
const { getUsers } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

//Renovar Token
router.get('/', validateJWT, getUsers);

module.exports = router;