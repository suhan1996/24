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

function game(){
    "use strict";
    const card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let a = card[Math.floor(Math.random() * card.length)],b = card[Math.floor(Math.random() * card.length)],c = card[Math.floor(Math.random() * card.length)],d = card[Math.floor(Math.random() * card.length)];
    let combo = [a,b,c,d];
    return combo;

}

console.log(game())