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
    console.log(n)
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

//funCount([5,5,5,5])

module.exports = {
    funCount:funCount,
    solution:solution
}

//console.log(solution.length);