# 24PointChallenge


Online version of the classic game -- 24

![Alt text](/documentation/cards1.jpg?raw=true )



Key: (13-11)x1x12 = 24

**Overview:**

Name: 24

Game Introduction: Make the number 24 from the four numbers on a game card. You can add, subtract, multiply and divide. Use all four numbers on the card, but use each number only once.

Example: 3 4 5 6 Solution: (5-4+3)x6

Section1_Game: Play the game, and get total time counted, you can see your rand based on your total time.

Section2_24Calculator: Calculate if 4 number could get 24, for example 1,1,1,1 cannot result in 24.

Section3_Collection: While the user playing, every round there'll be a timer, and every combination will have it hard level counted thereafter, i.e. the average time consumption on the combination will be the degree of difficulty; there will be a collection of the twenty most difficult combinations.


**Data Model:**

The application will store: Player Result, Combination's Average Time;

Player Result: After the game, the player could leave their name, and his result will be compared with other players and get his rank.

Combination's Average Time: There will be 5 rounds in one game. Every round, the server will randomly choose 4 cards for the user, how many times has this combo been generated and the average time for the card set to be solved will be stored.

An Example of Player Result:
```
{
    username: "AlextheGreatest",
    time: "100.0s"
    round_time:{[3,3,7,7]:20.5 , [2,4,7,4]:10.5 , [6,6,3,11]:38.7 , [8,3,3,8]:30.3},
}
```
An Example of Combination's Average Time:
```
{
    combination: [3,3,7,7],
    times: 3,
    average_time: 40.4s
}
```

***First Draft Schema:***

[My First Draft Schema](https://github.com/suhan1996/24PointChallenge/blob/master/db.js)


**Wireframes**

/game

![Alt text](/documentation/demo_game.png?raw=true )

/ranking

![Alt text](/documentation/ranking.png?raw=true )

/elite

![Alt text](/documentation/elite.png?raw=true )

/calculator

![Alt text](/documentation/calculator.png?raw=true )

**Site Map**

![Alt text](/documentation/page.png?raw=true )

**User Cases**

Function 1: Game

User A,B: A played the game, within 90s he solved all the card sets, and his ranking is No.1, A showed off his result with B, B was infuriated, and decided to play, B finished all the sets in 80s, and destroyed his friend at the Final Ranking.

Function 2: Elite Combo

A,B Continued: A was not convinced by B, and thought maybe B got some easy sets, so A invited B to come to his place and have a 24 duel. Of course, the card sets should be harder, so they get to the Elite Combo and see if any of them could solve the hardest one, and the first(most difficult) set was so hard that they beat their brains out, the set is "3 3 8 8".

Function 3: 24 Calculator

Still A,B: Both A and B fail at figuring out how to make 3 3 8 8 to 24, and they doubt if there's acually an answer for that, so they resort to 24 calculator...wow sooo smooth, they were amazed by the answer: "8/(3-(8/3))
"

**Research Topics**

(4 points) Perform client side form validation using a JavaScript library

(5 points) vue.js // Vue is said to be good for transition animations, I'd use that for the game part.


***Main Project:***

[App.js](https://github.com/suhan1996/24PointChallenge/blob/master/app.js)

***Annotations / References Used***

