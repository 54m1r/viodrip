let rouletteSocket;
let crashSocket;

let chatSocket;

module.exports = {
    init: (server, sharedsession, session) => {

        rouletteSocket = require('socket.io')(server, {
            path: '/roulette'
        });

        //rouletteSocket.use(sharedsession(session));

        /*crashSocket = require('socket.io')(server, {
            path: '/crash'
        }); */

        //crashSocket.use(sharedsession(session));

        /*chatSocket = require('socket.io')(server, {
            path: '/chat'
        }); */

        //chatSocket.use(sharedsession(session));
    },
    getRouletteSocket: () => {
        return rouletteSocket;
    },
    getCrashSocket: () => {
        return crashSocket;
    },
    getChatSocket: () => {
        return chatSocket;
    }
};
