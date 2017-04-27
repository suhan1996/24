/**
 * Created by Suhan on 28/03/2017.
 */
const db = require("./db.js");
//const test = require('./test.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const _test = require("./test.js");
app.use(express.static('./public/2_of_clubs.svg'));

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
const Result = mongoose.model('Result');
const Combination = mongoose.model('Combination');







app.get('/calculator', (req, res) => {
    app.set('view engine', 'hbs');
    "use strict";
    Combination.findOne({combination: "1234"}, function (err, result) {
        if (result) {
            // already exist
            console.log("yes")

        }
        res.render('calculator');

        //let str_asking = strSorted(req.body.asking);
        //Combination.findOne({combination: str_asking}, function(err, result) {if(result){
        //    // already exist
        //
        //}
//
//});
    });
});

app.get('/HardCombos',(req,res)=>{
    app.set('view engine', 'html');
    res.sendFile(path.join(__dirname+'/public/HardCombos.html'));
});
app.get('/calculator/result', (req, res) => {
    "use strict";
    app.set('view engine', 'hbs');
    res.render('calculator',{'result':result});

    let str_asking = _test.strSorted(req.body.asking);
    Combination.findOne({combination: str_asking}, function(err, result) {if(result){
        // already exist

    }
    });

    });


app.get('/calculator/result/:var1',function(req, res){
    app.set('view engine', 'hbs');
    "use strict";
    let slg = req.params.var1;
    //console.log(req.params.var1);
    let combo = req.session.combo;
    let solution = req.session.solution;
    Combination.findOne({combination: slg}, function(err, result){
        console.log("the result combo",result)

        res.render('calculator2', {combo: combo, solution:solution, result:result});
    });
});

app.post('/game/round',function(req,res){
    "use strict";
    let _str = req.body.roundCombo;
    Combination.findOne({combination:_str},function(err,result){
        if(result){
            if(result.times == undefined){
                result.solve = 1;
            }
            else {
                result.solve += 1;
            }
            result.save(function(saveErr, savePizza) {
                //console.log(savePizza);
            });
            console.log(" soled again"+result.slug);

        }else{
            // new combo
            let newlist = req.body.roundCombo.split("_");
            newlist.pop();
            let temp_result =  _test.CalculateStr(newlist);
            console.log("new adding in game round",newlist);
            const combi = new Combination({
                combination: req.body.roundCombo,
                solution: temp_result,
                solve: 1,
                slug:req.body.roundCombo
            });
            req.session.combo = req.body.roundCombo;
            req.session.solution = temp_result;
            combi.save((err) => {
            });
            console.log("new combi",combi);
        }
    })
    //res.redirect('/');
})
app.post('/calculator/post', function(req, res) {
    //console.log("test1");
    //myName = req.body.myName;
    console.log("req.body.asking",req.body.asking);
    let userinput = req.body.asking;
    let str_asking = _test.strSorted(req.body.asking);
    Combination.findOne({combination: str_asking}, function(err, result) {if(result){
        // already exist
        if(result.times == undefined){
            result.times = 1;
        }
        else {
            result.times += 1;
        }
        result.save(function(saveErr, savePizza) {
            //console.log(savePizza);
        });
        console.log(" already exist, redirect to",'/'+result.slug);
        //res.redirect('/'+req.body.hidden);
        res.redirect('/calculator/result/'+result.slug);

    }else{
        // new combo
        let list_asking = req.body.asking.split(" ");
        let temp_result =  _test.CalculateStr(list_asking);
        console.log("new adding",req.body.asking.split(" "),temp_result);
        const combi = new Combination({
            combination: str_asking,
            solution: temp_result,
            times:1
        });
        req.session.combo = req.body.asking;
        req.session.solution = temp_result;
        combi.save((err) => {
            if(err) {
                console.log(err);
            }
            else{
                res.redirect('/calculator/result/'+combi.slug);
            }
        });
    }
        //console.log(err, the_post);
        //res.render('comment', {the_post: the_post, last_name:last_name, last_comment:last_comment});
    });
});

app.get('/result',(req,res)=>{
    app.set('view engine', 'hbs');
    "use strict";
    Result.find({}, function(err, result){
        console.log("Players Result",result);
        res.render('result', {result:result});
    });

})
app.post('/result/post',(req,res)=>{
    //app.set('view engine', 'hbs');
    "use strict";
    console.log(req.body.time,req.body.city);

    (new Result({
        username: ["Jack Rando","Rand Omer","Som One"][Math.floor(Math.random() * 3)],
        time: req.body.time,
        city:req.body.city
        //round_time : {}
    })).save((err) => {
        if(err) {
            console.log(err);
        }
        else{
        //    alert("2");
            res.redirect('/result');
        }
    });

})

app.get('/test', (req, res) => {
    app.set('view engine', 'hbs');

    let combo = [];
    for (let i=0; i<10; i++){
        let rst_temp = _test.game();
        let slt = _test.funCount(rst_temp);
        if (slt.length>0) {
            combo.push(rst_temp);
            //console.log(test.solution);
        }
        else{
            console.log("nooo",rst_temp)
        }
    }
    res.render('game',{combo:combo});
});

//app.post('/game/post', function(req, res) {
//    //console.log("test1");
//    //myName = req.body.myName;
//    const result = new Results({
//        username: req.body.username,
//        time: req.body.time,
//        //round_time : {}
//    });
//    result.save((err) => {
//        if(err) {
//            console.log(err);
//        }
//        else{
//            res.redirect('/');
//        }
//    });
//});



//



//test.funCount([5,5,5,5])
//console.log("slt",test.solution.length)
console.log("port",process.env.PORT);
if(process.env.PORT == undefined){
    app.listen(3000);
}
else{
    app.listen(process.env.PORT);
}

