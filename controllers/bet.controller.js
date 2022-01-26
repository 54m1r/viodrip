const db = require("../models");

const Sport = db.sport;
const Match = db.match;

const BettingSlip = db.betting_slip;


exports.index = async (req, res) => {

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

exports.store = async (req, res) => {
    let user = req.user;
    let bets = req.body.bets;
    let betAmount = req.body.betAmount;

    if (bets.length === 0) {
        return res.status(500).json({
            msg: 'Es ist ein unerwarteter Fehler aufgetrerem. #948'
        });
    }

    //Check money
    let totalMoney = betAmount * bets.length;

    if (totalMoney > user.money) {
        return res.status(400).json({
            msg: 'Du hast nicht genügend Guthaben.'
        });
    }

    for (const bet of bets) {
        if (!bet.match) {
            return res.status(500).json({
                msg: 'Es ist ein unerwarteter Fehler aufgetrerem. #485'
            });
        }

        //check db match
        const match = await Match.findByPk(bet.match.id);
        if (!match) {
            return res.status(500).json({
                msg: 'Es ist ein unerwarteter Fehler aufgetrerem. #342'
            });
        }

        //Check date
        if (match.start_date - 900 < Math.floor((new Date()).getTime() / 1000) /* 15 Minuten */) {
            return res.status(500).json({
                msg: 'Sie können nicht auf Spiele wetten, die schon begonnen haben.'
            });
        }

        let odd;

        //Check odds
        if (bet.type === 0) {
            odd = match.odds_0;
        } else if (bet.type === 1) {
            odd = match.odds_1;
        } else if (bet.type === 2) {
            odd = match.odds_2;
        } else {
            return res.status(500).json({
                msg: 'Es ist ein unerwarteter Fehler aufgetrerem. #452'
            });
        }

        if (betAmount > user.money) {
            return res.status(400).json({
                msg: 'Du hast nicht genügend Guthaben.'
            });
        }

        user.money = user.money - betAmount;
        await user.save();

        let betSlip = await BettingSlip.create({
            match_id: match.id,
            user_id: req.user.id,
            type: bet.type,
            money: betAmount,
            odd: odd,
        });
    }

    const newUser = user.toJSON();

    newUser.betting_slips = await user.getBettingSlips(
        {
            include: [
                'match'
            ]
        }
    );

    return res.status(200).json({
        success: true,
        user: newUser,
        msg: 'Viel Glück! Du bist die Wette' + (bets.length === 1 ? '' : 'n') + ' erfolgreich eingegangen.'
    });
};
