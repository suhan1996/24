/**
 * Created by Suhan on 10/04/2017.
 */
function main(){
    "use strict";

    let InputList = [];
    const start = document.querySelector('.playBtn');
    const form = document.querySelector('.start');
    start.addEventListener('click',function(evt){
        form.style.display = 'none';
        evt.preventDefault();
        if(document.querySelector('#startValues').value.indexOf(',')==-1&&document.querySelector('#startValues').value.length>1){
            alert("Input invalid, should be separated with comma");
            console.log("invalid");
            window.location.reload();
        }
        InputList = (document.querySelector('#startValues').value).split(',');
        if(InputList[0] == ""){
            InputList = [];
        }
        //console.log(InputList);
        let InputList_1 = [];
        InputList.forEach((x)=>{
            if(x=='J'){
                InputList_1.push('jack');
            }
            else if(x=='Q'){
                InputList_1.push('queen');
            }
            else if(x=='K'){
                InputList_1.push('king');
            }
            else if(x=='A'){
                InputList_1.push('ace');
            }
            else{
                InputList_1.push(x);
            }
        })
        InputList = InputList_1;
        let game_cards = arr_subtract(InputList,cards()),cpu_cards=[],ply_cards=[];
        InputList.reverse().forEach(x => game_cards.unshift(x));
        game_cards = append_suit(game_cards);
        for(let i=0;i<52;i++){
            if (i%2){
                ply_cards.push(game_cards[i]);
            }
            else{
                cpu_cards.push(game_cards[i]);
            }
        }
        console.log(game_cards,ply_cards,cpu_cards);
        const game_field = document.querySelector('.game');
        const cpu_div = document.createElement("div");
        const player_div = document.createElement("div");
        const cpuScore_div = document.createElement("div");
        const playerScore_div = document.createElement("div");
        const hit = document.createElement("button");
        const stand = document.createElement("button");
        cpu_div.id = "cpu_div";
        player_div.id = "player_div";
        cpu_div.classList.add("center");
        player_div.classList.add("center");
        cpuScore_div.classList.add( "score", "center");
        playerScore_div.classList.add( "score","center");
        hit.classList.add("button");
        stand.classList.add("button");
        game_field.appendChild(cpuScore_div);
        game_field.appendChild(cpu_div);
        game_field.appendChild(playerScore_div);
        game_field.appendChild(player_div);
        game_field.appendChild(hit);
        game_field.appendChild(stand);
        let ply_sum = 0, cpu_sum = 0, plyhasA = 0, cpuhasA = 0;
        console.log("InputList.length",InputList.length,InputList);
        if(InputList.length>0){
            for(let x=0;x<InputList.length;x++){
                let num=x%2;
                if(num){
                    player_div.appendChild(add_svg("../public/images/SVG-cards-1.3/"+game_cards[x]+".svg"));
                    let card = game_cards[x][0];
                    if (card == "a"){
                        plyhasA += 1;
                    }
                    ply_sum+=card2num(card);
                    ply_cards.splice(0,1);

                }
                else{
                    cpu_div.appendChild(add_svg("../public/images/SVG-cards-1.3/"+game_cards[x]+".svg"));
                    let card = game_cards[x][0];
                    if (card == "a"){
                        cpuhasA += 1;
                    }
                    cpu_sum+=card2num(card);
                    cpu_cards.splice(0,1);
                }
            }

            for(let q=0;q<plyhasA;q++){
                if(ply_sum+10<22){
                    ply_sum+=10;
                }
                else{
                    ply_sum+=1;
                }
            }
            for(let q=0;q<cpuhasA;q++){
                if(cpu_sum+10<22){
                    cpu_sum+=10;
                }
                else{
                    cpu_sum+=1;
                }
            }
        }else{
            InputList=[];
        }
        console.log("sum",ply_sum,cpu_sum);

        playerScore_div.appendChild(elt("strong","Player Total:" + ply_sum.toString()));
        cpuScore_div.appendChild(elt("strong","Computer Total: You'll See"));
        hit.appendChild(elt("strong","   hit   "));
        stand.appendChild(elt("strong","stand"));
        hit.addEventListener('click',function(event){
            player_div.appendChild(add_svg("../public/images/SVG-cards-1.3/"+ply_cards[0]+".svg"));
            cpu_div.appendChild(add_svg_hidden("../public/images/SVG-cards-1.3/"+cpu_cards[0]+".svg"));
            let card = ply_cards[0][0];
            let card1 = cpu_cards[0][0];
            if (card == "a"){
                if(ply_sum+10<22){
                    ply_sum+=10;
                }
                else{
                    ply_sum+=1
                }
            }
            if (card1 == "a"){
                if(cpu_sum+10<22){
                    cpu_sum+=10;
                }
                else{
                    cpu_sum+=1
                }
            }
            ply_sum+=card2num(card);
            cpu_sum+=card2num(card1);
            ply_cards.splice(0,1);
            cpu_cards.splice(0,1);
            playerScore_div.replaceChild(elt("strong","Player Total:" + ply_sum.toString()),playerScore_div.getElementsByTagName('strong')[0]);
            //playerScore_div.replaceChild(elt("strong","CPU Total:" + ply_sum.toString()),playerScore_div.getElementsByTagName('strong')[0]);
            if((ply_sum>21)&&(cpu_sum<22)){
                end_game(playerScore_div,cpuScore_div,cpu_div,cpu_sum,"You Lost!");
            }
            if((ply_sum>21)&&(cpu_sum>21)){
                if(ply_sum>=cpu_sum){
                    end_game(playerScore_div,cpuScore_div,cpu_div,cpu_sum,"You Lost!");
                }
                else{
                    end_game(playerScore_div,cpuScore_div,cpu_div,cpu_sum,"You Win!");
                }
            }
        });
        stand.addEventListener('click',function(event){

            if((ply_sum>cpu_sum)||(cpu_sum>21)){
                end_game(playerScore_div,cpuScore_div,cpu_div,cpu_sum,"You Win!");
            }
            else{
                end_game(playerScore_div,cpuScore_div,cpu_div,cpu_sum,"You Lost!")
            }
        });
    });

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
    node.id = "svg1";
    node.data = link;
    node.type = "image/svg+xml";
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
        if (typeof child == "string")
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
document.addEventListener('DOMContentLoaded', main);

