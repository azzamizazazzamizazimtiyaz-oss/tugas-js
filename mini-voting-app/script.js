let footballVotes = 0;
let basketballVotes = 0;
let badmintonVotes = 0;
let swimmingVotes = 0;

let totalVotes = 0;


const footballBtn = document.querySelector("#footballBtn");
const basketballBtn = document.querySelector("#basketballBtn");
const badmintonBtn = document.querySelector("#badmintonBtn");
const swimmingBtn = document.querySelector("#swimmingBtn");


const footballVotesText = document.querySelector("#footballVotes");
const basketballVotesText = document.querySelector("#basketballVotes");
const badmintonVotesText = document.querySelector("#badmintonVotes");
const swimmingVotesText = document.querySelector("#swimmingVotes");

const totalVotesText = document.querySelector("#totalVotes");
const message = document.querySelector("#message");


footballBtn.addEventListener("click", function () {

    footballVotes++;
    totalVotes++;

    footballVotesText.textContent = footballVotes;
    totalVotesText.textContent = totalVotes;

    message.textContent = "✅ Kamu memilih Sepak Bola!";
});


basketballBtn.addEventListener("click", function () {

    basketballVotes++;
    totalVotes++;

    basketballVotesText.textContent = basketballVotes;
    totalVotesText.textContent = totalVotes;

    message.textContent = "✅ Kamu memilih Basket!";
});


badmintonBtn.addEventListener("click", function () {

    badmintonVotes++;
    totalVotes++;

    badmintonVotesText.textContent = badmintonVotes;
    totalVotesText.textContent = totalVotes;

    message.textContent = "✅ Kamu memilih Badminton!";
});


swimmingBtn.addEventListener("click", function () {

    swimmingVotes++;
    totalVotes++;

    swimmingVotesText.textContent = swimmingVotes;
    totalVotesText.textContent = totalVotes;

    message.textContent = "✅ Kamu memilih Renang!";
});