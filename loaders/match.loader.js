const db = require("../models");
const axios = require('axios');

const sequelize = require('sequelize');

const api_key = '6023eb23830184b2a7948e69b75a1fae';

const Match = db.match;
const League = db.league;

module.exports = async function () {
    const leagues = await League.findAll();

    await Promise.all(leagues.map(async (league) => {

        let matchesResponse = await axios.get('https://api.the-odds-api.com/v3/odds', {
            params: {
                api_key: api_key,
                sport: league.key,
                region: 'eu', // uk | us | eu | au
                mkt: 'h2h' // h2h | spreads | totals
            }
        });

        await Promise.all(matchesResponse.data.data.map(async (match) => {

            let odds_0 = 0;
            let odds_1 = 0;
            let odds_2 = 0;

            match.sites.forEach(site => {
                odds_0 = odds_0 + site.odds.h2h[0];
                odds_1 = odds_1 + site.odds.h2h[1];
                odds_2 = odds_2 + site.odds.h2h[2];
            });

            odds_0 = Number((odds_0 / match.sites_count).toFixed(2));
            odds_1 = Number((odds_1 / match.sites_count).toFixed(2));
            odds_2 = Number((odds_2 / match.sites_count).toFixed(2));

            if (odds_0 !== 0 && odds_1 !== 0 && odds_2 !== 0) {
                await Match.findOrCreate({
                    where: {
                        team_0: match.teams[0],
                        team_1: match.teams[1],
                        league_id: league.id,
                        start_date: match.commence_time,
                    },
                    defaults: {
                        odds_0: odds_0,
                        odds_1: odds_1,
                        odds_2: odds_2
                    }
                });
            }
        }));
    }));
};
