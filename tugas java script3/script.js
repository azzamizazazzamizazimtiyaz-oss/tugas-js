let students = JSON.parse(localStorage.getItem("students")) || [];

let editId = null;

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("studentName");
const scoreInput = document.getElementById("studentScore");
const studentList = document.getElementById("studentList");
const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");


function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}


function renderStudents() {
    studentList.innerHTML = "";

    if (students.length === 0) {
        studentList.innerHTML = `
            <div class="empty">
                Belum ada data siswa.
            </div>
        `;
    }

    for (let i = 0; i < students.length; i++) {
        let student = students[i];

        studentList.innerHTML += `
            <div class="student-item">
                <div class="student-name">
                    <span class="student-number">${i + 1}.</span>
                    ${student.name}
                </div>

                <div class="score">
                    ${student.score}
                </div>

                <div>
                    <button onclick="editStudent(${student.id})">
                        ✏️ Ubah
                    </button>

                    <button class="delete-btn" onclick="deleteStudent(${student.id})">
                        🗑️ Hapus
                    </button>
                </div>
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
        total += students[i].score;
    }

    let average = total / students.length;

    averageScore.textContent = average.toFixed(1);
}


form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = nameInput.value.trim();
    let score = Number(scoreInput.value);

    if (name === "" || scoreInput.value === "") {
        alert("Nama dan nilai harus diisi!");
        return;
    }

    if (editId === null) {

        let student = {
            id: Date.now(),
            name: name,
            score: score
        };

        students.push(student);

        saveStudents();
        renderStudents();

        alert(`Data siswa ${name} berhasil ditambahkan.`);

    } else {

        for (let i = 0; i < students.length; i++) {

            if (students[i].id === editId) {
                students[i].name = name;
                students[i].score = score;
                break;
            }

        }

        saveStudents();
        renderStudents();

        alert(`Data siswa ${name} berhasil diperbarui.`);

        editId = null;
        form.querySelector("button").textContent = "➕ Tambah Siswa";
    }

    form.reset();
});


function editStudent(id) {

    for (let i = 0; i < students.length; i++) {

        if (students[i].id === id) {

            nameInput.value = students[i].name;
            scoreInput.value = students[i].score;

            editId = id;

            form.querySelector("button").textContent = "💾 Update Siswa";

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

    if (!yakin) {
        return;
    }

    students = students.filter(function(student) {
        return student.id !== id;
    });

    saveStudents();
    renderStudents();

    alert(`Data siswa ${studentName} berhasil dihapus.`);
}


renderStudents();