const { response } = require("express");
const Users = require('../models/user');

const getUsers = async (req, res = response) => {

    const from = Number(req.query.from) || 0;

    const users = await Users
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(from)
        .limit(20);

    res.json({
        ok: true,
        users
    });
}

module.exports = { getUsers }