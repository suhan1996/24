/**
 * Created by Suhan on 28/03/2017.
 */
require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret for signing session id',
    saveUninitialized: false,
    resave: false
};
app.use(session(sessionOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
const Results = mongoose.model('Results');

function game(){
    "use strict";
    const card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let a = card[Math.floor(Math.random() * card.length)],b = card[Math.floor(Math.random() * card.length)],c = card[Math.floor(Math.random() * card.length)],d = card[Math.floor(Math.random() * card.length)];
    let combo = [a,b,c,d];
    return combo;
}

app.get('/', (req, res) => {
 console.log("good");
    res.render('main');
});

app.get('/test', (req, res) => {
    let combo = [];
    for (let i=0; i<20; i++){
        combo.push(game());
    }
    res.render('game',{combo:combo});
});

app.post('/game/post', function(req, res) {
    //console.log("test1");
    //myName = req.body.myName;
    const result = new Results({

        username: req.body.username,
        round: req.body.round,
        round_time : {}
        // comments: [Comment]
    });
    linkone.save((err) => {
        if(err) {
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
});






app.listen(3000);
