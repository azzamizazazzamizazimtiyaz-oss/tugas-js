// ==========================================
// HSI STUDENT REPORT CARD
// ==========================================

const students = [
    {
        name: "Ahmad",
        className: "10A",
        scores: [80, 90, 85],
        attendance: 90,
        hasViolation: false
    },
    {
        name: "Budi",
        className: "10B",
        scores: [75, 80, 70],
        attendance: 85,
        hasViolation: false
    },
    {
        name: "Cahya",
        className: "10C",
        scores: [60, 65, 70],
        attendance: 75,
        hasViolation: true
    }
];


const reportDate = new Date();

console.log(`
========================================
       HSI STUDENT REPORT CARD
========================================
Tanggal : ${reportDate.toLocaleDateString()}
`);

let totalLulus = 0;
let totalBelumLulus = 0;
let highestAverage = 0;
let highestStudent = "";

for (let i = 0; i < students.length; i++) {

    let student = students[i];

    // Menghitung total nilai
    let total = 0;

    for (let j = 0; j < student.scores.length; j++) {
        total = total + student.scores[j];
    }

     let average = total / student.scores.length;

     let grade;

    if (average >= 90) {
        grade = "A";
    } else if (average >= 80) {
        grade = "B";
    } else if (average >= 70) {
        grade = "C";
    } else {
        grade = "D";
    }

    // Menentukan status
    let status;
    if (average >= 75 && student.attendance >= 80 && !student.hasViolation) {
        status = "LULUS";
        totalLulus++;
    } else {
        status = "BELUM LULUS";
        totalBelumLulus++;
    }

    // Mencari rata-rata tertinggi
    if (average > highestAverage) {
        highestAverage = average;
        highestStudent = student.name;
    }

    // Menampilkan laporan siswa
    console.log(`
Student #${i + 1}
Nama        : ${student.name}
Kelas       : ${student.className}
Nilai       : ${student.scores}
Total       : ${total}
Rata-rata   : ${average.toFixed(2)}
Grade       : ${grade}
Kehadiran   : ${student.attendance}%
Pelanggaran : ${student.hasViolation}
Status      : ${status}
`);
}

console.log(`
========================================
              RINGKASAN
========================================
Jumlah Lulus       : ${totalLulus}
Jumlah Belum Lulus : ${totalBelumLulus}
Nilai Tertinggi    : ${highestStudent}
Rata-rata Tertinggi: ${highestAverage.toFixed(2)}
========================================
`);