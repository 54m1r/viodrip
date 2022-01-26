const db = require("../models");

const sequelize = require('sequelize');

const User = db.user;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const key = require('../config/keys.config').secret;

exports.register = async (req, res) => {
    let {username, password, confirm_password, forum_id} = req.body;
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: 'Deine Passwörter stimmen nicht überein.'
        });
    }
    // Check for unique Username or email

    const user = await User.findOne({
        where: {
            [sequelize.Op.or]: [{username: username}, {forum_id: forum_id}]
        }
    });

    if (user) {
        if (user.username === username)
            return res.status(400).json({
                msg: 'Der Nutzername ' + username + ' ist schon registriert.'
            });
        else if (user.forum_id === forum_id)
            return res.status(400).json({
                msg: 'Der  Forum-Identifikator ' + forum_id + ' ist schon registriert.'
            });
    }

    let newUser = User.build({
        username: username,
        password: password,
        forum_id: forum_id
    });

    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            await newUser.save();
            return res.status(201).json({
                success: true,
                msg: 'Hurry! User is now registered.'
            });
        });
    });
};

exports.login = async (req, res) => {

    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (!user) {
        return res.status(404).json({
            msg: 'Der Benutzer konnte nicht gefunden werden.',
            success: false
        });
    }

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
            // User's password is correct and we need to send the JSON Token for that user
            const payload = {
                id: user.id,
                username: user.username,
                forum_id: user.forum_id
            };
            jwt.sign(
                payload,
                key,
                {
                    expiresIn: 604800
                },
                (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: user,
                        msg: 'Hurry! You are now logged in.'
                    });
                }
            );
        } else {
            return res.status(404).json({
                msg: 'Incorrect password.',
                success: false
            });
        }
    });
};

exports.profile = async (req, res) => {

    const user = req.user.toJSON();

    user.betting_slips = await req.user.getBettingSlips(
        {
            include: [
                'match'
            ]
        }
    );

    return res.json({
        user: user
    });
};
