//our player class
class player {
    //creating our player with the default features
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.move = null;
    }

}
//our game instance class
class game {
    constructor(p1, p2) {
        this.player1 = p1;
        this.player2 = p2;
        this.finalwinner = null;
    }
    getbotmove() {
        let Random_1_to_3 = 1 + (Math.ceil(Math.random() * 10) % 3);
        switch (Random_1_to_3) {
            case 1:
                bot.move = "rock";
                break;
            case 2:
                bot.move = "paper";
                break;
            case 3:
                bot.move = "scissor";
                break;

            default:
                break;
        }

    }
    gethumanmove() {
        //displaying that bot has submitted it's move
        document.querySelector("#husection > .content").innerHTML = `<div class="maintext"></div>
        <div class="comptext">Waiting for your move...</div>`;
        document.querySelector("#husection > .content > .maintext").textContent = "Terminator has already submitted it's move";
        let rock = document.getElementById("rock");
        let paper = document.getElementById("paper");
        let sci = document.getElementById("scissor");
        [rock, paper, sci].forEach(element => {
            element.setAttribute("onclick", "human.move=clicked(this)");

        });

    }
    getwinner() {
        let b = bot.move, h = human.move;
        if (h == b) { return null; }
        else if (h == "rock" && b == "paper") { return bot; }
        else if (h == "rock" && b == "scissor") { return human; }
        else if (h == "paper" && b == "rock") { return human; }
        else if (h == "paper" && b == "scissor") { return bot; }
        else if (h == "scissor" && b == "rock") { return bot; }
        else if (h == "scissor" && b == "paper") { return human; }
    }
}
let max_score = 5;
function clicked(element) {
    if (human.score < max_score && bot.score < max_score) {
        let a = element.getAttribute("id");
        human.move = a;
        // removehandler();
        handlegame();
        return a;
    }


}
function removehandler() {
    let rock = document.getElementById("rock");
    let paper = document.getElementById("paper");
    let sci = document.getElementById("scissor");
    [rock, paper, sci].forEach(element => {
        element.removeAttribute("onclick");
    });

}
//our players
let human = new player("Rajan");
let bot = new player("Terminator");
let game1 = new game(human, bot);
//running our game
game1.gethumanmove();

function handlegame() {
    game1.getbotmove();
    let winner = game1.getwinner();
    if (winner != null) {
        console.log(`Winner is ${winner.name}!!`);
        winner.score++;
        // winner.name==human.name ?? showresult("win")
        showresult(winner.name == human.name ? "win" : "loose")
        console.log(human.score, bot.score);
    } else {
        showresult("tie");
        console.log("Nobody is the winner");
    }

}
// showresult("win");
function showresult(type) {
    showbotmove();
    let result = document.querySelector(".result");
    result.textContent = `You ${type}!!`
    if (type == "tie") {
        result.textContent = `Tie!!`
    }
    result.classList.add(type);
    result.style.opacity = "1";
    result.style.fontSize = "130px";
    result.style.transition = "all 1s ease-in";
    result.style.display = "block";
    setTimeout(() => {
        result.style.opacity = "0";
        result.style.transition = "all 1s ease-in";
    }, 1000);
    setTimeout(() => {
        result.style.display = "none";
        result.classList.remove(type);
    }, 2000);
}
function showbotmove() {
    let node = ` <div class="imagesection">
<div class="pretext">Terminator submitted</div>
<div class="image"><img src="${bot.move}.png" alt="" /></div>
<div class="posttext">Rock</div>
</div>`;
    document.querySelector("#aisection > .content").innerHTML = node;
}
function showhumanmove() {
    let node = ` <div class="imagesection">
    <div class="pretext">You submitted</div>
    <div class="image"><img src="${human.move}.png" alt="" /></div>
    <div class="posttext">${human.move}</div>
    </div>`;
    document.querySelector("#husection > .content").innerHTML = node;
}