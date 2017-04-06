let comboList = [];
let st = "12";
for(let i = 0;i<st.length;i++){
    comboList.push(st[i])
}
//console.log(comboList['1','2'])



function strSorted(st){
    "use strict";
    let comboList = [],st_result=""
    for(let i = 0;i<st.length;i++){
        comboList.push(st[i])
    }
    comboList.sort().forEach(x =>{st_result+=x});
    return st_result

}

console.log(strSorted("3243")=="2334")