let students = JSON.parse(localStorage.getItem("students")) || [];
let editId = null;

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const submitButton = document.getElementById("submitButton");

const studentList = document.getElementById("studentList");
const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");
const alertMessage = document.getElementById("alertMessage");


function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}


function showAlert(message) {
    alertMessage.textContent = message;

    setTimeout(function() {
        alertMessage.textContent = "";
    }, 3000);
}


function renderStudents() {
    studentList.innerHTML = "";

    if (students.length === 0) {
        studentList.innerHTML = "<p>Belum ada siswa.</p>";
    }

    for (let i = 0; i < students.length; i++) {
        let student = students[i];

        studentList.innerHTML += `
            <div class="student-card">
                <h3>${i + 1}. ${student.name}</h3>
                <p>Nilai: ${student.score}</p>

                <button onclick="editStudent(${student.id})">
                    ✏️ Ubah
                </button>

                <button onclick="deleteStudent(${student.id})">
                    🗑️ Hapus
                </button>
            </div>
        `;
    }

    updateStats();
}


function updateStats() {
    totalStudents.textContent = students.length;

    if (students.length === 0) {
        averageScore.textContent = "0";
        return;
    }

    let total = 0;

    for (let i = 0; i < students.length; i++) {
        total += Number(students[i].score);
    }

    let average = total / students.length;

    averageScore.textContent = average.toFixed(1);
}


form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = nameInput.value.trim();
    let score = scoreInput.value;

    if (name === "" || score === "") {
        alert("Nama dan nilai harus diisi!");
        return;
    }

    if (editId === null) {

        let newStudent = {
            id: Date.now(),
            name: name,
            score: Number(score)
        };

        students.push(newStudent);

        saveStudents();
        renderStudents();

        showAlert(`✅ Data siswa ${name} berhasil ditambahkan.`);

    } else {

        for (let i = 0; i < students.length; i++) {

            if (students[i].id === editId) {
                students[i].name = name;
                students[i].score = Number(score);
                break;
            }

        }

        saveStudents();
        renderStudents();

        showAlert(`🔄 Data siswa ${name} berhasil diperbarui.`);

        editId = null;
        submitButton.textContent = "➕ Tambah Siswa";
    }

    form.reset();
});


function editStudent(id) {

    for (let i = 0; i < students.length; i++) {

        if (students[i].id === id) {

            nameInput.value = students[i].name;
            scoreInput.value = students[i].score;

            editId = id;

            submitButton.textContent = "💾 Update Siswa";

            break;
        }
    }
}


function deleteStudent(id) {

    let studentName = "";

    for (let i = 0; i < students.length; i++) {

        if (students[i].id === id) {
            studentName = students[i].name;
            break;
        }
    }

    let yakin = confirm(
        `Apakah kamu yakin ingin menghapus siswa ${studentName}?`
    );

    if (yakin === false) {
        return;
    }

    students = students.filter(function(student) {
        return student.id !== id;
    });

    saveStudents();
    renderStudents();

    showAlert(`🗑️ Data siswa ${studentName} berhasil dihapus.`);
}


renderStudents();