const { response } = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const register = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exist'
            });
        }

        const user = new User(req.body);

        //Encryptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Guardar en la base de datos
        await user.save();

        //Generar mi JWT
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Comunicate with Administrator"
        });

    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;
    // const user = new User(req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Email does not exist'
            });
        }

        const validPass = bcrypt.compareSync(password, user.password);
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is incorrect!'
            });
        }

        //Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Comunicate with Administrator"
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token
    });
}

module.exports = { register, login, renewToken }