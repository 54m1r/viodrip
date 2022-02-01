const db = require("../models");
const axios = require('axios');

const sequelize = require('sequelize');

const api_key = '';

const Sport = db.sport;
const League = db.league;

module.exports = async function () {
    const sports = await Sport.findAll();

    let leagueResponse = await axios.get('https://api.the-odds-api.com/v3/sports', {
        params: {
            api_key: api_key
        }
    });

    await League.update({active: false}, {
        where: {
            id: {
                [sequelize.Op.ne]: 0
            }
        }
    });

    await Promise.all(sports.map(async (sport) => {
        await Promise.all(leagueResponse.data.data.map(async (league) => {
            if (league.key.startsWith(sport.key)) {

                await League.findOrCreate({
                    where: {key: league.key},
                    defaults: {
                        name: league.title,
                        sport_id: sport.id,
                        active: true
                    }
                });
            }

        }));
    }));
};
