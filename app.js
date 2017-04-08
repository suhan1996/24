/**
 * Created by Suhan on 28/03/2017.
 */
const db = require("./db.js");
//const test = require('./test.js');
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
const Result = mongoose.model('Result');
const Combination = mongoose.model('Combination');

function game(){
    "use strict";
    const card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let a = card[Math.floor(Math.random() * card.length)],b = card[Math.floor(Math.random() * card.length)],c = card[Math.floor(Math.random() * card.length)],d = card[Math.floor(Math.random() * card.length)];
    let combo = [a,b,c,d];
    return combo;

}

function strSorted(st){
    "use strict";
    let comboList = [],st_result=""
    for(let i = 0;i<st.length;i++){
        comboList.push(st[i])
    }
    comboList.sort().forEach(x =>{st_result+=x});
    return st_result;

}

function ifArraysEqual(a,b){
    "use strict";
    let result = false;
    if(a.length==b.length){
        result = true;
        a.forEach(x=>{
            if(b.indexOf(x)==-1){
                result = false;
            }});
    }
    return result;
}





app.get('/calculator', (req, res) => {
    "use strict";
    Combination.findOne({combination: "1234"}, function(err, result) {if(result){
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

app.get('/calculator/result', (req, res) => {
    "use strict";
    res.render('calculator',{'result':result});

    let str_asking = strSorted(req.body.asking);
    Combination.findOne({combination: str_asking}, function(err, result) {if(result){
        // already exist

    }
    });

    });
});

app.get('/:var1',function(req, res){
    "use strict";
    let slg = req.params.var1;
    //console.log(req.params.var1);
    let combo = req.session.combo;
    let solution = req.session.solution;
    Combination.findOne({combination: slg}, function(err, result){
        console.log("the result combo",result)

        res.render('calculator', {combo: combo, solution:solution, result:result});
    });
});
app.post('/calculator/post', function(req, res) {
    //console.log("test1");
    //myName = req.body.myName;
    console.log("req.body.asking",req.body.asking);
    let str_asking = strSorted(req.body.asking);
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
        res.redirect('/'+result.slug);

    }else{
        // new combo
        let temp_result =  CalculateStr(str_asking);
        console.log("new adding",str_asking,temp_result);
        const combi = new Combination({
            combination: str_asking,
            solution: temp_result
        });
        req.session.combo = str_asking;
        req.session.solution = temp_result;
        combi.save((err) => {
            if(err) {
                console.log(err);
            }
            else{
                res.redirect('/'+combi.slug);
            }
        });
    }
        //console.log(err, the_post);
        //res.render('comment', {the_post: the_post, last_name:last_name, last_comment:last_comment});
    });
});


app.get('/test', (req, res) => {
    let combo = [];
    for (let i=0; i<10; i++){
        let rst_temp = game();
        let slt = funCount(rst_temp)
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

app.post('/game/post', function(req, res) {
    //console.log("test1");
    //myName = req.body.myName;
    const result = new Results({
        username: req.body.username,
        time: req.body.time,
        //round_time : {}
    });
    result.save((err) => {
        if(err) {
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
});



//

let ct = false;
let solution = [];

let exp_list = []
function eval_r(n){
    "use strict";
    //test(exp2,a,b,c,d,m1,m2,m3);
    exp_list.push(n);
}
function collect(k,a,b,c,d,m1,m2,m3){
    "use strict";
    var exp1 = "a m1 b m2 c m3 d;";
    var exp2 = "(a m1 b) m2 c m3 d;";
    var exp3 = "(a m1 b m2 c) m3 d;";
    var exp4 = "((a m1 b) m2 c) m3 d;";
    var exp5 = "(a m1 (b m2 c)) m3 d;";
    var exp6 = "a m1 (b m2 c) m3 d;";
    var exp7 = "a m1 (b m2 c m3 d);";
    var exp8 = "a m1 ((b m2 c) m3 d);";
    var exp9 = "a m1 (b m2 (c m3 d));";
    var exp10 = "a m1 b m2(c m3 d);";
    var exp11 = "(a m1 b) m2 (c m3 d);";
    let list_exp = [exp1,exp2,exp3,exp4,exp5,exp6,exp7,exp8,exp9,exp10,exp11];
    let exp = list_exp[k-1];
    let result_expression = genExpress(exp,a,b,c,d,m1,m2,m3)
    if(eval(result_expression)==24){
        // console.log(result_expression);
        solution.push(result_expression);
        ct = true;
    }
};

//console.log("try this",test(exp11,6,6,6,6,'+','+','+'));

function genExpress(exp,a,b,c,d,m1,m2,m3)
{
    var exp=exp.replace("a",a);
    exp=exp.replace("b",b);
    exp=exp.replace("c",c);
    exp=exp.replace("d",d);
    exp=exp.replace("m1",m1);
    exp=exp.replace("m2",m2);
    exp=exp.replace("m3",m3);
    return exp;
}
var answer = new Array();//正确答案的表达式
var counter = 0;//答案的个数
//测试表达式是否正确
function test(expn,a,b,c,d,m1,m2,m3)
{
    var exp;
    var ret;
    exp = genExpress(expn,a,b,c,d,m1,m2,m3);//生成计算表达式
    eval_r("ret = "+exp);
    if ( Math.abs(ret - 24) < 0.1 )
    {
        exp = exp.replace(";","");
        exp = replaceAll(exp,"*","×");
        exp = replaceAll(exp, "/","÷");
        var have = false;
        for ( var i=0; i<counter; i++)
        {
            if ( exp == answer[i] )
            {
                have = true;
                break;
            }
        }
        if ( !have )
        {
            answer[counter] = exp;
            counter++;
            log("<font color=red><b>"+counter+":&nbsp;&nbsp;"+exp+"</b></font>");
        }
    }
}
function replaceAll (streng, soeg, erstat)
{
    var st = streng;
    if (soeg.length == 0)
        return st;
    var idx = st.indexOf(soeg);
    while (idx >= 0)
    {
        st = st.substring(0,idx) + erstat + st.substr(idx+soeg.length);
        idx = st.indexOf(soeg);
    }
    return st;
}
var n = new Array();//四个数字


//接收四个输入框的数字，调用主程序
function funCount([a,b,c,d])
{
    solution = [];

    n[0] = a;
    n[1] = b;
    n[2] = c;
    n[3] = d;
    //console.log(n)
    if ( n[0] > 0 && n[1] > 0 && n[2] > 0 && n[3] > 0 && n[0] < 14 && n[1] < 14 && n[2] < 14 && n[3] < 14 )
    {
        //log("<font size=5><b>"+n[0]+", "+n[1]+", "+n[2]+", "+n[3]+"的24点答案：</b></font><br>");
        //log("<input type='button' onclick='history.back(-1);' value=' 再来一次 '><br>");
        funMain();
        if ( counter == 0 )
        {
            //log("没有答案！");
        }
    }
    else
    {
        //alert("输入错误！");
    }
    if(solution[0]==undefined){
        return "no answer";
    }
    return solution[0];
}
//主程序
function funMain()
{
    var m = new Array();

//四种运算符
    m[0] = "+";
    m[1] = "-";
    m[2] = "*";
    m[3] = "/";

//11种表达式
    var exp1 = "a m1 b m2 c m3 d;";
    var exp2 = "(a m1 b) m2 c m3 d;";
    var exp3 = "(a m1 b m2 c) m3 d;";
    var exp4 = "((a m1 b) m2 c) m3 d;";
    var exp5 = "(a m1 (b m2 c)) m3 d;";
    var exp6 = "a m1 (b m2 c) m3 d;";
    var exp7 = "a m1 (b m2 c m3 d);";
    var exp8 = "a m1 ((b m2 c) m3 d);";
    var exp9 = "a m1 (b m2 (c m3 d));";
    var exp10 = "a m1 b m2(c m3 d);";
    var exp11 = "(a m1 b) m2 (c m3 d);";

    var a,b,c,d;//四个数字
    var m1,m2,m3;//三个运算符

    for (var i=0;i<4;i++)
    {
        a = n[i];
        //console.log(n,a)

        for (var j=0;j<4;j++)
        {
            if ( i == j ) continue;//从未选的三个数字中选择一个数字
            b = n[j];
            for (var x=0;x<4;x++)
            {
                if ( x == j || x == i ) continue;//从未选的两个数字中选择一个数字
                c = n[x];
                for (var y=0;y<4;y++)
                {
                    if ( y == x || y == j || y == i ) continue;//从未选的一个数字中选择一个数字
                    d = n[y];

                    for (var ta=0;ta<4;ta++)
                    {
                        m1 = m[ta];
                        for (var tb=0;tb<4;tb++)
                        {
                            m2 = m[tb];
                            for (var tc=0;tc<4;tc++)
                            {
                                m3 = m[tc];
                                for (var k=1;k<12;k++)
                                {
                                    //console.log(a)
                                    //eval_r("test(exp"+k+",a,b,c,d,m1,m2,m3);");
                                    collect(k,a,b,c,d,m1,m2,m3);

                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function CalculateStr(st){
    console.log('st',st,Number(st[0]),funCount([Number(st[0]),Number(st[1]),Number(st[2]),Number(st[3])]));
    let rlt = funCount([Number(st[0]),Number(st[1]),Number(st[2]),Number(st[3])]);
    "use strict";
    console.log("result is ",rlt)
    return rlt
}


//test.funCount([5,5,5,5])
//console.log("slt",test.solution.length)
console.log("port",process.env.PORT);
if(process.env.PORT == undefined){
    app.listen(3000);
}
else{
    app.listen(process.env.PORT);
}