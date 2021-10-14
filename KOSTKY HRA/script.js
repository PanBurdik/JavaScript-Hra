//základní proměné
var totalScore, roundScore, activePlayer, dice, playGame, hodnota;

alert("Vítej v mí hře! Hra se hraje tak, že si určíš do kolika bodů se bude hrát a házíš kostkou, " +
    "ten kdo prní dosáhne těch počtů bodů vyhrál! Pochopíš při hraní :D")

newStart();

function newStart() {
    totalScore = [0,0];
    roundScore = 0;
    activePlayer = 0;
    playGame = true;

    // do kolika se bude hrát
    hodnota = prompt("Zadej do kolika bodů se bude hrát:")

    // vynulování a odstranění kostky
    document.getElementById("totalScorePlayer-0").textContent = 0;
    document.getElementById("totalScorePlayer-1").textContent = 0;
    document.getElementById("currentScore-0").textContent = 0;
    document.getElementById("currentScore-1").textContent = 0;

    //skrytí kostky
    document.querySelector(".diceImage").style.display = "none";

    //texty do původního stavu
    document.querySelector("#name-0").textContent = "Skóre 1. hráče";
    document.querySelector("#name-1").textContent = "Skóre 2. hráče";

    //vrátíme zvýraznění aktivního hráče k prvnímu a u druhého odstraněníme
    document.querySelector(".totalScore0").classList.add("active")
    document.querySelector(".totalScore1").classList.remove("active")
}

//měníme obrázek podle náhodného čísla
document.querySelector(".rollDice").addEventListener("click", function () {
    if(playGame){
        // 1. generujeme náhodné číslo mezi 1 a 6
        var dice = Math.ceil(Math.random()*6);

        // 2. zobrazit správný obrázek
        var diceElement = document.querySelector(".diceImage");
        diceElement.style.display = "block";
        diceElement.src = "img/kostka" + dice +".jpg";

        //3. Nasčítáme čísla z kostky
        if (dice !== 1){
            roundScore = roundScore + dice;
            document.getElementById("currentScore-" + activePlayer).textContent = roundScore;
        }   else {
            nextPlayer()
        }
    }
})

function nextPlayer() {
    if(activePlayer === 0){
        activePlayer = 1;
    } else{
        activePlayer = 0;
    }

    roundScore = 0;

    document.getElementById("currentScore-0").textContent = 0;
    document.getElementById("currentScore-1").textContent = 0;

    document.querySelector(".diceImage").style.display = "none";

    document.querySelector(".totalScore0").classList.toggle("active")
    document.querySelector(".totalScore1").classList.toggle("active")
}

document.querySelector(".holdScore").addEventListener("click", function () {
    if(playGame){
        // celkové skóre se vyplní současným skóre
        totalScore[activePlayer] = totalScore[activePlayer] + roundScore;

        document.querySelector("#totalScorePlayer-" + activePlayer).textContent = totalScore[activePlayer];

        if(totalScore[activePlayer] >= hodnota){
            document.querySelector("#name-" + activePlayer).textContent = "Vítěz! Vítěz!";
            document.querySelector(".diceImage").style.display = "none";
            playGame = false;
        } else{
            nextPlayer();
        }
    }
})

//nová hra
document.querySelector(".newGame").addEventListener("click", newStart)