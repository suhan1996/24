/**
 * Created by Suhan on 01/04/2017.
 */
function game(){
    "use strict";
    const card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let a = card[Math.floor(Math.random() * card.length)],b = card[Math.floor(Math.random() * card.length)],c = card[Math.floor(Math.random() * card.length)],d = card[Math.floor(Math.random() * card.length)];
    let combo = [a,b,c,d];
    return combo;
}

console.log(game())