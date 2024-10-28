// Simulasi login sederhana
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Ambil data yang disimpan dari register
    const storedUsername = localStorage.getItem('registeredUsername');
    const storedPassword = localStorage.getItem('registeredPassword');

    if (username === storedUsername && password === storedPassword) {
        window.location.href = 'about.html';
    } else {
        document.getElementById('errorMessage').textContent = 'Username atau password salah!';
    }
}

// Fungsi untuk registrasi pengguna baru
function register() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('registerMessage').textContent = 'Password tidak cocok!';
        return;
    }

    // Simpan data registrasi ke localStorage
    localStorage.setItem('registeredUsername', username);
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    document.getElementById('registerMessage').textContent = 'Registrasi berhasil! Silakan login.';
}

// Simpan data dari Tentang Aku ke localStorage
function saveAboutData() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const guardianEmail = document.getElementById("guardianEmail").value;

    if (name && email && birthdate && guardianEmail) {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("birthdate", birthdate);
        localStorage.setItem("guardianEmail", guardianEmail);
        document.getElementById('successMessage').textContent = "Data berhasil disimpan!";
    } else {
        document.getElementById('successMessage').textContent = "Silahkan isi semua data.";
    }
}

// Menampilkan kalender menstruasi
const calendarElement = document.getElementById("calendar");
const daysInMonth = 30; // Asumsikan bulan 30 hari untuk kemudahan
const menstruationStart = 5; // Hari awal menstruasi

function generateCalendar() {
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.innerText = day;

        if (day >= menstruationStart && day < menstruationStart + 5) {
            dayElement.style.backgroundColor = "#ff6f91"; // Highlight hari menstruasi
        }

        if (calendarElement) calendarElement.appendChild(dayElement);
    }
}

generateCalendar();

// Notifikasi keterlambatan haid
function showNotification() {
    const lastMenstruationDay = menstruationStart + 5;
    const today = new Date().getDate();

    if (today > lastMenstruationDay) {
        document.getElementById("notification").style.display = "block";
    }
}

showNotification();
