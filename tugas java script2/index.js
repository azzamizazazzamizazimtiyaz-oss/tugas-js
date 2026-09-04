// ========================================
// Student Data Processor
// Nama : Nama Kamu
// Kelas : XI Rombel 1
// ========================================

const studentName = "  Azzam Izaz  ";
const ageText = "17 tahun";
const scoreText = "85.678";
const registrationText = "23-09-2009";

// Data siswa
const student = {
    name: studentName,
    age: ageText,
    score: scoreText,
    registration: registrationText
};


// PART 1 - MEMBERSIHKAN NAMA

let cleanName = studentName.trim();
cleanName = cleanName.toLowerCase();

let nameArray = cleanName.split(" ");

for (let i = 0; i < nameArray.length; i++) {
    nameArray[i] =
        nameArray[i].charAt(0).toUpperCase() +
        nameArray[i].slice(1);
}

cleanName = nameArray.join(" ");

let username = cleanName.toLowerCase().split(" ").join(".");


// PART 2 - ANALISIS NAMA

let containsAhmad = cleanName.includes("Ahmad");
let firstFive = cleanName.slice(0, 5);
let replacement = cleanName.replace("Ahmad", "Budi");


// Bonus menghitung jumlah karakter nama
let nameLength = cleanName.length;


// PART 3 - UMUR

let age = parseInt(ageText);

let currentYear = new Date().getFullYear();
let birthYear = currentYear - age;


// PART 4 - NILAI

let score = parseFloat(scoreText);

let formattedScore = score.toFixed(2);
let roundScore = Math.round(score);
let floorScore = Math.floor(score);
let ceilScore = Math.ceil(score);


// PART 5 - GRADE

let grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "E";
}


// PART 6 - TANGGAL PENDAFTARAN

let registration = registrationText.split("-");

let registrationDay = Number(registration[0]);
let registrationMonth = Number(registration[1]);
let registrationYear = Number(registration[2]);


// PART 7 - TANGGAL DAN WAKTU SEKARANG

let now = new Date();

let year = now.getFullYear();
let month = now.getMonth() + 1;
let date = now.getDate();
let day = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();


// PART 8 - FUNCTION FORMAT TANGGAL

function formatDate(date) {
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = String(date.getFullYear());

    return day + "/" + month + "/" + year;
}


// PART 9 - LUCKY DICE

let dice = Math.floor(Math.random() * 6) + 1;

let diceResult;

if (dice === 6) {
    diceResult = "🔥 JACKPOT!";
} else if (dice === 1) {
    diceResult = "💀 BAD LUCK!";
} else {
    diceResult = "😎 GOOD LUCK!";
}


console.log(`
========================================
        STUDENT DATA PROCESSOR
========================================

 STUDENT
----------------------------------------
Original Name : "${studentName}"
Clean Name    : ${cleanName}
Username      : ${username}
Name Length   : ${nameLength} karakter

 NAME ANALYSIS
----------------------------------------
Contains Ahmad : ${containsAhmad}
First 5 chars  : ${firstFive}
Replacement    : ${replacement}

 AGE
----------------------------------------
Age Text       : ${ageText}
Age            : ${age}
Birth Year     : ${birthYear}

 SCORE
----------------------------------------
Original Score : ${scoreText}
Formatted      : ${formattedScore}
Round          : ${roundScore}
Floor          : ${floorScore}
Ceil           : ${ceilScore}
Grade          : ${grade}

 REGISTRATION
----------------------------------------
Day            : ${registrationDay}
Month          : ${registrationMonth}
Year           : ${registrationYear}
Date           : ${String(registrationDay).padStart(2, "0")}/${String(registrationMonth).padStart(2, "0")}/${registrationYear}

 REPORT GENERATED
----------------------------------------
Year           : ${year}
Month          : ${month}
Date           : ${date}
Day            : ${day}
Time           : ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}

 Report Date  : ${formatDate(now)}

 LUCKY DICE
----------------------------------------
Dice           : ${dice}
Result         : ${diceResult}

========================================
        PROCESS COMPLETE!
========================================
`);