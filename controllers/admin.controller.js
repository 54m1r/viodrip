const db = require("../models");

const Sport = db.sport;
const Match = db.match;

const BettingSlip = db.betting_slip;


exports.index = async (req, res) => {

    const matches = await Match.findAll({
        include: [{ model: BettingSlip, as: 'bettingSlips', required: true }],
        order: [
            ['start_date', 'ASC']
        ],
    });
    const betting_slips = await BettingSlip.findAll({
        include: ['match', 'user'],
        order: [
            ['match', 'start_date', 'ASC']
        ],
    });

    res.json({
        betting_slips: betting_slips,
        matches: matches
    });
};