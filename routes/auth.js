/*
    /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { register, login, renewToken } = require('../controllers/auth');
const { validate } = require('../middlewares/validate');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

//Register
router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validate
], register);

//Login
router.post('/', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validate
], login);

//Renovar Token
router.get('/renew', validateJWT, renewToken);

module.exports = router;