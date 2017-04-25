/**
 * Created by Suhan on 10/04/2017.
 */
let city, formula = [], counter_click = 0, two_board = false, round_perator = false,operater = false, switchornot = false, slt = {}, counter_round = 0, counter_correct=5;

function main(){
    "use strict";
    let InputNum = 0;
    let selector = 1;
    let suit = ['clubs','diamonds','hearts','spades'];
    const calculator = document.querySelector('.calculator');
    const start = document.querySelectorAll('.playBtn');
    const form = document.querySelector('.start');
    calculator.onclick = function(){
        location.href ='/calculator';
    }
    for(let i=0;i<1;i++){
        console.log(i);
    start[i].addEventListener('click',function(evt) {

        Timer();

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
            let slt_temp = [];
            let rst_temp = game();
            slt_temp = funCount(rst_temp);
            if((slt_temp == undefined)||(slt_temp.indexOf("(")!=-1)){
                i = i-1;
                //console.log("no solution",rst_temp,slt_temp)
            }
            else {
                round_list.push(rst_temp);
                //console.log("good!has solution",rst_temp,slt_temp);
            }

        }
        console.log(round_list);



        const game_field = document.querySelector('.game');
        const cpu_div = document.createElement("div");
        const player_div = document.createElement("div");
        const player_div2 = document.createElement("div");
        const cpuScore_div = document.createElement("div");
        const add = document.createElement("button");
        const minus = document.createElement("button");
        const multiply = document.createElement("button");
        const divide = document.createElement("button");
        const redo = document.createElement("button");
        const skip = document.createElement("button");

        cpu_div.id = "cpu_div";
        player_div.id = "player_div";
        player_div2.id = "player_div2";

        cpu_div.classList.add("center");
        player_div.classList.add("center");
        player_div2.classList.add("center");
        // cpuScore_div.classList.add( "score", "center");
        add.classList.add("button");
        minus.classList.add("button");
        multiply.classList.add("button");
        divide.classList.add("button");
        redo.classList.add("button");
        skip.classList.add("button");
        add.appendChild(elt("strong","+"));
        minus.appendChild(elt("strong","-"));
        multiply.appendChild(elt("strong","x"));
        divide.appendChild(elt("strong","÷"));
        redo.appendChild(elt("strong","redo"));
        skip.appendChild(elt("strong","skip"));
        add.onclick = function(){
            if(counter_click==2){two_board = false,  operater = true;}
            round_perator=true;
            console.log("add");
            if(!isNaN(formula[formula.length-1])) {
                formula.push("+");
            }else{
                formula.pop();
                formula.push("+");
            }
        }
        minus.onclick = function(){
            if(counter_click==2){two_board = false, operater = true;}
            round_perator=true;
            console.log("minus");
            if(!isNaN(formula[formula.length-1])) {
                formula.push("-");
            }else{
                formula.pop();
                formula.push("-");
            }
        }
        multiply.onclick = function(){
            if(counter_click==2){two_board = false, operater = true;}
            round_perator=true;
            console.log("multiply");
            if(!isNaN(formula[formula.length-1])) {
                formula.push("*");
            }else{
                formula.pop();
                formula.push("*");
            }
        }
        divide.onclick = function(){
            if(counter_click==2){two_board = false, operater = true;}
            round_perator=true;
            console.log("divide");
            if(!isNaN(formula[formula.length-1])) {
                formula.push("/");
            }else{
                formula.pop();
                formula.push("/");
            }
        }
        redo.onclick = function(){
            //two_board = false, round_perator = false,operater = false, switchornot = false;formula = [];counter_click = 0;
            //player_div.textContent = "";
            //player_div2.textContent = "";
            //document.querySelectorAll('img').forEach(function(x){
            //    x.classList.remove("hidden");
            //})
            two_board = false, round_perator = false,operater = false, switchornot = false;formula = [];counter_click = 0;
            console.log(counter_round);
            cpu_div.innerHTML = "";
            counter_round--;
            player_div.textContent = "";
            player_div2.textContent = "";
            //document.querySelectorAll('img').forEach(function(x){
            //    x.classList.remove("hidden");
            //})
            Game_levels(round_list,cpu_div,suit,selector,player_div,player_div2);
        }
        skip.onclick = function(){
            if(counter_round==5){
                location.href = '/result';
            }
            two_board = false, round_perator = false,operater = false, switchornot = false;formula = [];counter_click = 0;
            console.log(counter_round);
            cpu_div.innerHTML = "";
            player_div.textContent = "";
            player_div2.textContent = "";
            counter_correct-=1;
            //document.querySelectorAll('img').forEach(function(x){
            //    x.classList.remove("hidden");
            //})
            Game_levels(round_list,cpu_div,suit,selector,player_div,player_div2);
        }
        console.log(formula);



        game_field.appendChild(cpuScore_div);
        game_field.appendChild(cpu_div);
        game_field.appendChild(player_div);
        game_field.appendChild(player_div2);
        game_field.appendChild(add);
        game_field.appendChild(minus);
        game_field.appendChild(multiply);
        game_field.appendChild(divide);
        game_field.appendChild(redo);
        game_field.appendChild(skip);



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

        //round_list.forEach(function(x){
            //let combo = x;
            // load the next round only after this round is done


        //Round(combo,cpu_div,suit,selector,player_div,player_div2);

        Game_levels(round_list,cpu_div,suit,selector,player_div,player_div2);


        //})
        //
        //let combo = round_list[round];
        //for(let i=0;i<4;i++) {
        //    let card_num = round_list[round][i];
        //    slt.i = card_num;
        //    if(card_num==11){
        //        card_num=('jack');
        //    }
        //    else if(card_num==12){
        //        card_num=('queen');
        //    }
        //    else if(card_num==13){
        //        card_num=('king');
        //    }
        //    else if(card_num==1){
        //        card_num=('ace');
        //    }
        //            // cpu_div.appendChild(add_svg("../public/images/SVG-cards-1.3/" + card_num + "_of_"+suit[i]+".svg"));
        //    cpu_div.appendChild(add_png("http://keithmackay.com//images/cards/"+ card_num + "_of_"+suit[i]+".png",selector,player_div,player_div2,combo));
        //}



    });
}}
function Timer(){
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime()
    {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds%60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
    }

    function pad(val)
    {
        var valString = val + "";
        if(valString.length < 2)
        {
            return "0" + valString;
        }
        else
        {
            return valString;
        }
    }
}

//function log(str)
//{
//    document.write("<br>"+str);
//}
//生成计算表达式
function Round(round_list,combo,cpu_div,suit,selector,player_div,player_div2){
    counter_round++;
    "use strict";
    //let combo = round_list[round];
    for(let i=0;i<4;i++) {
        let card_num = combo[i];
        slt.i = card_num;
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
        cpu_div.appendChild(add_png(round_list,cpu_div,suit,"http://keithmackay.com//images/cards/"+ card_num + "_of_"+suit[i]+".png",selector,player_div,player_div2,combo));
    }

}

function Game_levels(round_list,cpu_div,suit,selector,player_div,player_div2){
    console.log("counter_round",counter_round);
    let combo = round_list[counter_round];
    formula = [], counter_click = 0, two_board = false, round_perator = false,operater = false, switchornot = false, slt = {};
    Round(round_list,combo,cpu_div,suit,selector,player_div,player_div2);
}



//let ct = false;
//let solution = [];
//
//let exp_list = []
//function eval_r(n){
//    "use strict";
//    //test(exp2,a,b,c,d,m1,m2,m3);
//    exp_list.push(n);
//}
//function collect(k,a,b,c,d,m1,m2,m3){
//    if(ct == true){
//        return 1;
//    }
//    "use strict";
//    var exp1 = "a m1 b m2 c m3 d;";
//    var exp2 = "(a m1 b) m2 c m3 d;";
//    var exp3 = "(a m1 b m2 c) m3 d;";
//    var exp4 = "((a m1 b) m2 c) m3 d;";
//    var exp5 = "(a m1 (b m2 c)) m3 d;";
//    var exp6 = "a m1 (b m2 c) m3 d;";
//    var exp7 = "a m1 (b m2 c m3 d);";
//    var exp8 = "a m1 ((b m2 c) m3 d);";
//    var exp9 = "a m1 (b m2 (c m3 d));";
//    var exp10 = "a m1 b m2(c m3 d);";
//    var exp11 = "(a m1 b) m2 (c m3 d);";
//    let list_exp = [exp1,exp2,exp3,exp4,exp5,exp6,exp7,exp8,exp9,exp10,exp11];
//    let exp = list_exp[k-1];
//    let result_expression = genExpress(exp,a,b,c,d,m1,m2,m3)
//    if(eval(result_expression)==24){
//        // console.log(result_expression);
//        solution.push(result_expression);
//        ct = true;
//    }
//};
//
////console.log("try this",test(exp11,6,6,6,6,'+','+','+'));
//
//function genExpress(exp,a,b,c,d,m1,m2,m3)
//{
//    var exp=exp.replace("a",a);
//    exp=exp.replace("b",b);
//    exp=exp.replace("c",c);
//    exp=exp.replace("d",d);
//    exp=exp.replace("m1",m1);
//    exp=exp.replace("m2",m2);
//    exp=exp.replace("m3",m3);
//    return exp;
//}
//var answer = new Array();//正确答案的表达式
//var counter = 0;//答案的个数
////测试表达式是否正确
//function test(expn,a,b,c,d,m1,m2,m3)
//{
//    var exp;
//    var ret;
//    exp = genExpress(expn,a,b,c,d,m1,m2,m3);//生成计算表达式
//    eval_r("ret = "+exp);
//    if ( Math.abs(ret - 24) < 0.1 )
//    {
//        exp = exp.replace(";","");
//        exp = replaceAll(exp,"*","×");
//        exp = replaceAll(exp, "/","÷");
//        var have = false;
//        for ( var i=0; i<counter; i++)
//        {
//            if ( exp == answer[i] )
//            {
//                have = true;
//                break;
//            }
//        }
//        if ( !have )
//        {
//            answer[counter] = exp;
//            counter++;
//            log("<font color=red><b>"+counter+":&nbsp;&nbsp;"+exp+"</b></font>");
//        }
//    }
//}
//function replaceAll (streng, soeg, erstat)
//{
//    var st = streng;
//    if (soeg.length == 0)
//        return st;
//    var idx = st.indexOf(soeg);
//    while (idx >= 0)
//    {
//        st = st.substring(0,idx) + erstat + st.substr(idx+soeg.length);
//        idx = st.indexOf(soeg);
//    }
//    return st;
//}
//var n = new Array();//四个数字
//
//
////接收四个输入框的数字，调用主程序
//function funCount([a,b,c,d])
//{
//
//    n[0] = a;
//    n[1] = b;
//    n[2] = c;
//    n[3] = d;
//    //console.log(n)
//    if ( n[0] > 0 && n[1] > 0 && n[2] > 0 && n[3] > 0 && n[0] < 14 && n[1] < 14 && n[2] < 14 && n[3] < 14 )
//    {
//        //log("<font size=5><b>"+n[0]+", "+n[1]+", "+n[2]+", "+n[3]+"的24点答案：</b></font><br>");
//        //log("<input type='button' onclick='history.back(-1);' value=' 再来一次 '><br>");
//        funMain();
//        if ( counter == 0 )
//        {
//            //log("没有答案！");
//        }
//    }
//    else
//    {
//        //alert("输入错误！");
//    }
//    let result = solution;
//    //solution.pop();
//    return result;
//    ct = false;
//
//}
////主程序
//function funMain()
//{
//    var m = new Array();
//
////四种运算符
//    m[0] = "+";
//    m[1] = "-";
//    m[2] = "*";
//    m[3] = "/";
//
////11种表达式
//    var exp1 = "a m1 b m2 c m3 d;";
//    var exp2 = "(a m1 b) m2 c m3 d;";
//    var exp3 = "(a m1 b m2 c) m3 d;";
//    var exp4 = "((a m1 b) m2 c) m3 d;";
//    var exp5 = "(a m1 (b m2 c)) m3 d;";
//    var exp6 = "a m1 (b m2 c) m3 d;";
//    var exp7 = "a m1 (b m2 c m3 d);";
//    var exp8 = "a m1 ((b m2 c) m3 d);";
//    var exp9 = "a m1 (b m2 (c m3 d));";
//    var exp10 = "a m1 b m2(c m3 d);";
//    var exp11 = "(a m1 b) m2 (c m3 d);";
//
//    var a,b,c,d;//四个数字
//    var m1,m2,m3;//三个运算符
//
//    for (var i=0;i<4;i++)
//    {
//        a = n[i];
//        //console.log(n,a)
//
//        for (var j=0;j<4;j++)
//        {
//            if ( i == j ) continue;//从未选的三个数字中选择一个数字
//            b = n[j];
//            for (var x=0;x<4;x++)
//            {
//                if ( x == j || x == i ) continue;//从未选的两个数字中选择一个数字
//                c = n[x];
//                for (var y=0;y<4;y++)
//                {
//                    if ( y == x || y == j || y == i ) continue;//从未选的一个数字中选择一个数字
//                    d = n[y];
//
//                    for (var ta=0;ta<4;ta++)
//                    {
//                        m1 = m[ta];
//                        for (var tb=0;tb<4;tb++)
//                        {
//                            m2 = m[tb];
//                            for (var tc=0;tc<4;tc++)
//                            {
//                                m3 = m[tc];
//                                for (var k=1;k<12;k++)
//                                {
//                                    //console.log(a)
//                                    //eval_r("test(exp"+k+",a,b,c,d,m1,m2,m3);");
//                                    ct = false;
//                                    collect(k,a,b,c,d,m1,m2,m3);
//
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
//    }
//}

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
    ct = false;

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
    let result = solution[0];
    solution.pop()
    return result;

}
//主程序
function funMain()
{
    ct = false;
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

//3_3_12_12_
function strSorted(st){
    "use strict";
    let comboList = [],st_result="";
    comboList = st.split(" ");
    //for(let i = 0;i<st.length;i++){
    //    comboList.push(st[i])
    //}
    // comboList.sort().reverse().forEach(x =>{st_result+=x+"_"});
    comboList.sort().forEach(x =>{st_result+=x+"_"});

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
function AoperateB(a,b){
    "use strict";
    let lst = [a*b,a-b,b-a,a/b,b/a,a+b];
    lst = lst.map(x=>eval(x));
    if(lst.indexOf(24)!=-1){
        return true;
    }
    else{
        return false
    }
}
function add_svg(link) {
    var node = document.createElement('object');
    //node.id = "svg1";
    node.data = link;
    node.type = "image/svg+xml";
    return node;
}
function add_png(round_list,cpu_div,suit,link,selector,player_div,player_div2,combo) {
    var node = document.createElement('img'),result = 0;
    //node.id = "svg1";
    player_div.onclick = function(){
        "use strict";
        // result board interactions

    }
    node.src = link;
    node.classList.add("card");
    let result_div = player_div;

    //only if no operator between the second and third click of cards;
    console.log(two_board)

    node.onclick = function(){
        another_board();
        if((!two_board)&&(counter_click!=0)&&(!round_perator)){
            console.log("round_oprt",round_perator)
            alert("select a operator and redo")
        }
        round_perator = false;
        if(two_board){
            two_board = false;
            result = 0;
            formula = [];
            switchornot = true;
            result_div = player_div2;
        }
        console.log(result_div)
        if(link[38]!=0){
            selector = jack2eleven(link[37]);
        }
        else{
            selector = 10;
        }
        if(switchornot){
            result_div = player_div2;
        }
        console.log(switchornot);

        console.log(selector);
        formula.push(selector);
      //  player_div.appendChild((elt("strong",selector)));
        console.log(formula,"formula before join");

       // console.log("evaluate formula",eval(formula.join("")));
        result = eval(formula.join(""));
        formula = [result];
        result_div.textContent = result;
        counter_click++;
        node.classList.add("hidden");
        if((result==24&&counter_click==4)||AoperateB(parseInt(player_div.innerHTML),parseInt(player_div2.innerHTML))){
            if(counter_round == 5){
                if(counter_correct==5){
                    window.location.href = '/result';
                    alert('congrats!');
                    let req= new XMLHttpRequest();
                    req.open('POST', '/result/post', true);
                    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                    req.send("time="+document.getElementById("minutes").innerHTML+":"+document.getElementById("seconds").innerHTML+"&city="+city);

                }
                else{
                    location.href = '/result';
                }
            }
            console.log("great!you solved",combo);
           // post('/game/round',{roundCombo:strSorted(combo)});
            let req= new XMLHttpRequest();
            req.open('POST', '/game/round', true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
            req.send("roundCombo="+strSorted(combo));
            player_div.innerHTML = "";
            player_div2.innerHTML = "";

            Game_levels(round_list,cpu_div,suit,selector,player_div,player_div2);
        }
        //if(player_div)
        console.log(formula,"formula after join")
    }
    return node;
}

function another_board(){
    "use strict";
    if((counter_click==2)&&(operater==false)){
        two_board = true;
    }
}
function round_redo(player_div,player_div2){
    "use strict";
        formula = [];
        counter_click = 0;
        document.querySelectorAll('img').slice(-4).forEach(function(x){
            x.classList.remove("hidden");
        })
        player_div.textContent = "";
        player_div2.textContent = "";
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
    form.id = "myForm";

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
    //$('#myForm').submit(function(e){
    //    e.preventDefault();
    //    $.ajax({
    //        url:path,
    //        type:'post',
    //        data:$('#myForm').serialize(),
    //        success:function(){
    //            //whatever you wanna do after the form is successfully submitted
    //            console.log("ajax post successfully")
    //        }
    //    });
    //});
    form.submit(function(e){
        "use strict";
        e.preventDefault();
        console.log("posting")
    });
}
var geocoder;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

function initialize() {
    geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            if (results[1]) {
                //formatted address
                //alert(results[0].formatted_address)
                //find country name
                for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {

                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            city= results[0].address_components[i];
                            break;
                        }
                    }
                }
                //city data
                //alert(city.short_name + " " + city.long_name)
                city =  city.long_name;
                console.log("player in city:",city);


            } else {
                //return("No results found");
            }
        } else {
            //return("Geocoder failed due to: " + status);
        }
    });
    //}
}
document.addEventListener('DOMContentLoaded', main);

