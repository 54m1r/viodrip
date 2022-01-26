const io = require('../utils/socket').getRouletteSocket();
const sequelize = require('sequelize');
const logger = require('../utils/logger');
const db = require('../models');

const User = db.user;

const { v4: uuidv4 } = require('uuid');

const RouletteRound = db.roulette_round;
const RouletteRoundUser = db.roulette_round_user;

const sha256 = require("js-sha256");
//const discord = require('../discord');

const Chance = require('chance');
const chance = new Chance();

let running = false;
let players;
let time = 0;

let bets = [];
const history = [];
const fullHistory = [];
const top = {red: 0, green: 0, black: 0};

const black = [14, 13, 12, 11, 10, 9, 8];
const red = [1, 2, 3, 4, 5, 6, 7];

const alerts = [];

let currentRouletteRound;

let currentId;
let hash;
let salt;

let minus = 0;
let plus = 0;

io.on('connection', function (socket) {
    logger.info("a user connected");
    socket.emit('init', {bets: bets, history: history, top: top, time: time, hash: hash});
});

let number;

function onSecond() {

    if (running)
        return;

    if (time === 20) {

        time = 0;
        running = true;
        //console.log("Runde wurde gestartet");
        io.sockets.emit("startRoulette", number, Math.floor(Math.random() * 75) - (75 / 2));
        logger.info('ROULETTE', 'Starting round #' + currentId, {rouletteRound: currentRouletteRound});

        setTimeout(function () {

            let winner = "";
            if (red.includes(number))
                winner = 0;
            else if (black.includes(number))
                winner = 1;
            else if (number === 0)
                winner = 2;

            for (let i = 0; i < bets.length; i++) {
                if (bets[i].type === winner) {
                    //console.log("GEWINNER: " + bets[i]);
                    let win = 0;
                    if (number === 0) {
                        win = bets[i].amount * 14;
                    } else {
                        win = bets[i].amount * 2;
                    }
                    //database.addCash(bets[i].id, win);
                    /*io.in(bets[i].id).emit('alert', {
                        type: 'success',
                        title: "Roulette",
                        message: 'Glückwunsch! Sie haben $' + win + " gewonnen. (" + bets[i].id + ", " + bets[i].type + ", " + bets[i].name
                    }); */

                    User.increment(
                        { money: +win },
                        { where: { id: bets[i].id } }
                    );

                    //console.log(bets[i]);
                    minus = minus + win;
                    //console.log(bets[i].id);
                } else {
                    console.log("VERLIERER: " + bets[i]);
                }
            }

            /*if (plus !== 0)
                if (minus > plus)
                    discord.rouletteHook().warn(discord.name(), "Bilanz der Runde #" + currentId + " Gewinn: " + plus + " Verlust: " + minus);
                else
                    discord.rouletteHook().success(discord.name(), "Bilanz der Runde #" + currentId + " Gewinn: " + plus + " Verlust: " + minus); */

            minus = 0;
            plus = 0;

            let color = "success";
            if (red.includes(number))
                color = "primary";
            else if (black.includes(number))
                color = "primary-dark";

            let uuid = uuidv4();

            history.push({color: color, number: number, id: uuid});
            fullHistory.push({color: color, number: number, id: uuid});

            if (history.length >= 9)
                history.shift();

            if (fullHistory.length > 100)
                fullHistory.shift();

            top.red = 0;
            top.black = 0;
            top.green = 0;

            //calculate top 100
            for (let i = 0; i < 100; i++) {
                if (!fullHistory[i]) break;
                if (fullHistory[i].color === 'primary')
                    top.red++;
                else if (fullHistory[i].color === 'primary-dark')
                    top.black++;
                else if (fullHistory[i].color === 'success')
                    top.green++;
            }

            io.sockets.emit("prepareStop", {bets: bets, history: history, top: top, winner: winner, number: number});
            bets = [];
            logger.info('ROULETTE', "Preparing for round stop", {rouletteRound: currentRouletteRound, bets: bets, history: history, top: top, winner: winner, number: number});

            setTimeout(function () {
                //STOP ROUND
                running = false;

                generateRound();

                io.sockets.emit("stopRoulette", hash);

            }, 4000);

        }, 6000);

        return;
    }

    io.emit("time", (time) * 1000);
    time++;
}

setInterval(onSecond, 1000);

generateRound();

async function generateRound() {
    number = Math.floor(Math.random() * 15);
    salt = chance.string({length: 16});
    hash = sha256(salt + "-" + number);

    logger.info('ROULETTE', 'Roulette round generated (number:' + number + ' salt:' + salt + ' hash:' + hash + ')', {rouletteRound: currentRouletteRound});
    const rouletteRound = await RouletteRound.create({
        result: number,
        salt: salt,
        hash: hash,
    });

    currentId = rouletteRound.id;
    currentRouletteRound = rouletteRound.toJSON();
}

exports.store = async (req, res) => {
    let user = req.user;
    let { type, amount } = req.body;

    for (let i = 0; i < bets.length; i++) {
        if (bets[i].name === user.username) {
            return res.status(403).json({
                msg: 'Sie haben in dieser Runde schon gesetzt.'
            });
        }
    }

    if (!(amount <= user.money)) {
        return res.status(403).json({
            msg: 'Sie besitzen nicht genügend Guthaben.'
        });
    }

    //user.money = user.money - amount;
    //await user.save();

    /*let monn = await User.decrement(
        { money: amount },
        {
            where: { id: req.user.id, money: 60 },
            returning: true,
            plain: true
        }
    );
    if(monn) {
        console.log("Ja")
    } else {
        console.log("Nein")
    }
    console.log(JSON.stringify(monn)); */

    user = await User.findByPk(user.id);
    if(!user) {
        return res.status(500).json({
            msg: 'Es ist ein unerwarteter Fehler aufgetreten. #456'
        });
    }

    if (!(amount <= user.money)) {
        return res.status(403).json({
            msg: 'Sie besitzen nicht genügend Guthaben.'
        });
    }

    user.money = user.money - amount;
    await user.save();

    await RouletteRoundUser.create({
        round_id: currentId,
        user_id: user.id,
        type: type,
        money: amount,
    });

    bets.push({
        type: type,
        name: user.username,
        amount: amount,
        id: user.id
    });

    io.sockets.emit('newBet', {
        type: type,
        name: user.username,
        amount: amount,
        id: uuidv4()
    });

    plus = plus + amount;

    return res.status(200).json({
        success: true,
        user: user,
        msg: 'Viel Glück! Du hast erfolgreich $'+amount+ ' auf ' + (type === 0 ? 'Rot' : type === 1 ? 'Schwarz' : 'Grün') + ' gesetzt.'
    });
};
