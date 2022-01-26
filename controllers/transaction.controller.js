const db = require("../models");

const User = db.user;

const Op = require('sequelize').Op;

exports.charge = async (req, res) => {

    const sports = await Sport.findAll({
        attributes: ['id', 'name', 'key'],
        order: [
            ['id', 'ASC']
        ],
        include: [
            {
                association: 'leagues',
                attributes: ['id', 'name', 'key'],
                include: [
                    {
                        association: 'matches',
                        attributes: ['id'],
                    }
                ]
            }
        ]
    });

    const matches = await Match.findAll({
        attributes: ['id', 'team_0', 'team_1', 'start_date', 'odds_0', 'odds_1', 'odds_2', 'league_id'],
        order: [
            ['start_date', 'ASC']
        ],
    });

    res.json({
        sports: sports,
        matches: matches
    });
};

exports.payin_admins = async (req, res) => {
    const users = await User.findAll({
        attributes: [['id', 'value'], ['username', 'text']],
        rank: {
            [Op.gte]: 4,
        }
    });

    return res.json({
        admins: users
    });
};

exports.payout_admins = async (req, res) => {
    const users = await User.findAll({
        attributes: [['id', 'value'], ['username', 'text']],
        rank: {
            [Op.gte]: 3,
            [Op.lte]: 4,
        }
    });

    return res.json({
        admins: users
    });
};

