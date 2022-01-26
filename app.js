const express = require('express');
const history = require('connect-history-api-fallback');
const morgan = require("morgan");

const logger = require('./utils/logger');

const bodyParser = require('body-parser');
const cors = require("cors");

const passport = require('passport');

// Add this to the VERY top of the first file loaded in your app
const apm = require('elastic-apm-node').start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'VioDrip - Vio-V Casino',

    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'http://apm-server:8200',
})


const socket = require("./utils/socket");
const app = express();

const db = require("./models");

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')

AdminBro.registerAdapter(AdminBroSequelize)

const adminBro = new AdminBro({
    databases: [db],
    rootPath: '/admin',
    branding: {
        companyName: 'VioDrip - Adminpanel',
      },
      resources: [
        {
          resource: db.match,
          options: {
            actions: {
              finish: {
                // create a totally new action
                actionType: 'record',
                component: false,
                handler: async (request, response, context) => {
                    let match = context.record;
                    console.log(match);
                    
                    let betting_slips = await db.betting_slip.findAll({
                        where: {
                            match_id: match.param('id')
                          }
                    })

                    console.log(betting_slips)
                    return {
                        record: context.record.toJSON(),
                    }
                  }
                }
            },
          },
        },
      ],
});

const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

//app.use(morgan('common'));

/*
* {
	"username": "mod",
	"email": "mod@asd.asd",
	"password": "hallo123",
	"roles": ["moderator", "user"]
}
* */

const corsOptions = {
    origin: "http://localhost:1337"
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
require('./config/passport.config')(passport);

app.get('/users/5.json', (req, res) => {
    res.json({
        name: 'Tom Mason'
    });
});

const staticFileMiddleware = express.static('public');
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));

app.use(staticFileMiddleware);


const Sport = db.sport;

db.sequelize.sync({alter: true}).then(async () => {
    console.log('Drop and Resync Db');
    await initial();
});

async function initial() {

    await Sport.bulkCreate([
        {
            name: "Fußball - Europa",
            key: "soccer_uefa_"
        },
        {
            name: "Fußball - Deutschland",
            key: "soccer_germany_"
        },
        /*{
            name: "Fußball - Frankreich",
            key: "soccer_france_ligue_one"
        }, */
        /*{
            name: "Fußball - Italien",
            key: "soccer_italy_serie_a"
        },*/
        {
            name: "Fußball - England",
            key: "soccer_epl"
        }
    ], {updateOnDuplicate: ['name', 'key']});

    /*Sport.create({
        name: "Fußball - Europa",
        key: "soccer_uefa_"
    });

    Sport.create({
        name: "Fußball - Deutschland",
        key: "soccer_germany_"
    });

    Sport.create({
        name: "Fußball - Frankreich",
        key: "soccer_france_ligue_one"
    });

    Sport.create({
        name: "Fußball - Italien",
        key: "soccer_italy_serie_a"
    });

    Sport.create({
        name: "Fußball - England",
        key: "soccer_epl"
    }); */
}

//TEST
//setTimeout(require('./loaders/leagues.loader'), 2000);
//setTimeout(require('./loaders/match.loader'), 5000);


require('./loaders/schedule');
const port = 1337;
var server = app.listen(port, () => {
    //console.log(`Example app listening on port ${port}!`);
});

//socket
socket.init(server, undefined, undefined);

//load games
const roulette = require('./games/roulette');

// routes
require('./routes/bets.route')(app);
require('./routes/auth.route')(app);
require('./routes/roulette.route')(app);
require('./routes/transaction.route')(app)
require('./routes/admin.route')(app)
