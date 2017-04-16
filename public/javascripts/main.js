/**
 * Created by Suhan on 10/04/2017.
 */
let formula = [], counter_click = 0;

function main(){
    // 注册
// 创建根实例


    "use strict";
    let InputNum = 0;
    let selector = 1;
    let round = 0;
    let suit = ['clubs','diamonds','hearts','spades'];
    const start = document.querySelector('.playBtn');
    const form = document.querySelector('.start');
    start.addEventListener('click',function(evt) {
        evt.preventDefault();

        form.style.display = 'none';

        document.querySelector("#calculator").style.display = "none";
        InputNum = (document.querySelector('.choice').value);
        console.log(document.querySelector('.choice').value)
        if (InputNum !=1 && InputNum !=5) {
            alert("Choose one to play");
            console.log("invalid");
            window.location.reload();
        }
        if (InputNum == 1){InputNum = 13}

        let game_Round = parseInt(InputNum);
        let round_list = [];
        for (let i = 0; i < game_Round; i++) {
            let rst_temp = game();
            let slt = funCount(rst_temp);
            if(slt == undefined){
                i = i-1;
            }
            else {
                round_list.push(rst_temp);
            }

        }
        console.log(round_list);



        const game_field = document.querySelector('.game');
        const cpu_div = document.createElement("div");
        const player_div = document.createElement("div");
        const cpuScore_div = document.createElement("div");
        const add = document.createElement("button");
        const minus = document.createElement("button");
        const multiply = document.createElement("button");
        const divide = document.createElement("button");

        cpu_div.id = "cpu_div";
        player_div.id = "player_div";

        cpu_div.classList.add("center");
        player_div.classList.add("center");
        // cpuScore_div.classList.add( "score", "center");
        add.classList.add("button");
        minus.classList.add("button");
        multiply.classList.add("button");
        divide.classList.add("button");
        add.appendChild(elt("strong","+"));
        minus.appendChild(elt("strong","-"));
        multiply.appendChild(elt("strong","*"));
        divide.appendChild(elt("strong","/"));
        add.onclick = function(){
            console.log("add");
            formula.push("+");
        }
        minus.onclick = function(){
            console.log("add");
            formula.push("-");
        }
        multiply.onclick = function(){
            console.log("add");
            formula.push("*");
        }
        divide.onclick = function(){
            console.log("add");
            formula.push("/");
        }
        console.log(formula);



        game_field.appendChild(cpuScore_div);
        game_field.appendChild(cpu_div);
        game_field.appendChild(player_div);
        game_field.appendChild(add);
        game_field.appendChild(minus);
        game_field.appendChild(multiply);
        game_field.appendChild(divide);



        //player_div.appendChild((elt("strong",)));


        document.querySelectorAll(".card").forEach(function(x){
            console.log(x,"what?");
            x.onclick = function(){
                console.log("aha")
            }
            x.addEventListener('click',function(evt) {
                console.log("click");
            });
        })
        let combo = round_list[round];
        for(let i=0;i<4;i++) {
            let card_num = round_list[round][i];
            if(card_num==11){
                card_num=('jack');
            }
            else if(card_num==12){
                card_num=('queen');
            }
            else if(card_num==13){
                card_num=('king');
            }
            else if(card_num==1){
                card_num=('ace');
            }
                    // cpu_div.appendChild(add_svg("../public/images/SVG-cards-1.3/" + card_num + "_of_"+suit[i]+".svg"));
            cpu_div.appendChild(add_png("http://keithmackay.com//images/cards/"+ card_num + "_of_"+suit[i]+".png",selector,player_div,combo));
        }



    });
}
//function log(str)
//{
//    document.write("<br>"+str);
//}
//生成计算表达式
let ct = false;
let solution = [];

let exp_list = []
function eval_r(n){
    "use strict";
    //test(exp2,a,b,c,d,m1,m2,m3);
    exp_list.push(n);
}
function collect(k,a,b,c,d,m1,m2,m3){
    if(ct == true){
        return 1;
    }
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

function game(){
    "use strict";
    const card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let a = card[Math.floor(Math.random() * card.length)],b = card[Math.floor(Math.random() * card.length)],c = card[Math.floor(Math.random() * card.length)],d = card[Math.floor(Math.random() * card.length)];
    let combo = [a,b,c,d];
    return combo;

}

function strSorted(list){
    "use strict";
    let st_result="";
    list.sort().forEach(x =>{st_result+=x+"_"});
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
function CalculateStr(st){
    console.log('st',st,Number(st[0]),funCount([Number(st[0]),Number(st[1]),Number(st[2]),Number(st[3])]));
    let rlt = funCount([Number(st[0]),Number(st[1]),Number(st[2]),Number(st[3])]);
    "use strict";
    console.log("result is ",rlt)
    return rlt
}


function elt(type) {
    var node = document.createElement(type);
    for (var i = 1; i < arguments.length; i++) {
        var child = arguments[i];
        if (typeof child == "string")
            child = document.createTextNode(child);
        node.appendChild(child);
    }
    return node;
}
function add_svg(link) {
    var node = document.createElement('object');
    //node.id = "svg1";
    node.data = link;
    node.type = "image/svg+xml";
    return node;
}
function add_png(link,selector,player_div,combo) {
    var node = document.createElement('img'),result = 0;
    //node.id = "svg1";
    node.src = link;
    node.classList.add("card")
    node.onclick = function(){
        if(link[38]!=0){
            selector = jack2eleven(link[37]);
        }
        else{
            selector = 10;
        }
        console.log(selector);
        formula.push(selector);
      //  player_div.appendChild((elt("strong",selector)));
        console.log(formula,"formula before join")

       // console.log("evaluate formula",eval(formula.join("")));
        result = eval(formula.join(""));
        formula = [result];
        player_div.textContent = result;
        counter_click++;
        if(result==24&&counter_click==4){
            console.log("great!you solved",combo);
            post('/game/round',{roundCombo:strSorted(combo)})
        }
        console.log(formula,"formula after join")
    }
    return node;
}

function add_svg_hidden(link) {
    var node = document.createElement('object');
    node.classList.add("hidden");
    node.id = "svg1";
    node.data = link;
    node.type = "image/svg+xml";
    return node;
}

function append_suit(cards){
    "use strict";
    let suits = ['_of_clubs','_of_diamonds','_of_spades','_of_clubs'];
    for(let a=0;a<52;a++){
        cards[a]+=suits[a%4];
    }
    return cards;

}
function cards(){
    "use strict";
    var deck = [];
    var ranks = [2,3,4,5,6,7,8,9,10,"jack","queen","king","ace"];
    for (let s = 0; s < 4; s++){
        for (let r = 0; r < 13; r++){
            deck[s*13 + r] = ranks[r];
        }
    }
    return shuffle(deck)

}
function cards_suited(){
    var deck = [];
    var suits = ["clubs", "diamonds", "hearts", "spades"];
    var ranks = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
    for (let s = 0; s < 4; s++){
        for (let r = 0; r < 13; r++){
            deck[s*13 + r] = {rank:ranks[r], suit:suits[s]};
        }
    }
    return deck;
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//a=[1,2] b=[1,2,3] result=[3]
function arr_subtract(a,b){
    "use strict";
    a.forEach(x=>{
        b.splice(b.indexOf(x),1);
    })
    return b
}

function elt(type) {
    var node = document.createElement(type);
    for (var i = 1; i < arguments.length; i++) {
        var child = arguments[i];
            child = document.createTextNode(child);
        node.appendChild(child);
    }
    return node;
}
function card2num(card){
    "use strict";
    if(card == "k"){
        return 10;
    }
    else if(card == "q"){
        return 10;
    }
    else if(card == "j"){
        return 10;
    }
    else if(card == "a"){
        return 0;
    }
    else{
        return parseInt(card);
    }
}
function end_game(playerScore_div,cpuScore_div,cpu_div,cpu_sum,str){
    "use strict";
    console.log(str);
    playerScore_div.replaceChild(elt("strong",str),playerScore_div.getElementsByTagName('strong')[0]);
    cpuScore_div.replaceChild(elt("strong","Computer Total:" + cpu_sum.toString()),cpuScore_div.getElementsByTagName('strong')[0]);
    cpu_div.querySelectorAll(".hidden").forEach(function(x){x.classList.remove("hidden")});
    document.querySelectorAll("button").forEach(function(x){
        x.style.display = "none"
    });
    const Replay = document.createElement("button");

    Replay.appendChild(elt("strong","   Replay   "));
    Replay.classList.add("button");
    document.querySelector(".game").appendChild(Replay);
    Replay.addEventListener('click',function(event){
        console.log("refresh");
        window.location.reload();
    });
}
function game(){
    "use strict";
    const card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let a = card[Math.floor(Math.random() * card.length)],b = card[Math.floor(Math.random() * card.length)],c = card[Math.floor(Math.random() * card.length)],d = card[Math.floor(Math.random() * card.length)];
    let combo = [a,b,c,d];
    return combo;

}
function jack2eleven(x){
    "use strict";
    if(x=='j'){
        return 11;
    }
    else if(x=='q'){
        return 12;
    }
    else if(x=='k'){
        return 13
    }
    else if(x=='a'){
        return 1;
    }
    else{
        return x;
    }

}
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);


            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

document.addEventListener('DOMContentLoaded', main);

