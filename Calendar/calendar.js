// HTML additions for Month and Year selection
const calendarContainer = document.getElementById("calendar");
calendarContainer.insertAdjacentHTML('beforebegin', `
    <div class="calendar-controls">
        <label for="year-select">Year:</label>
        <select id="year-select"></select>
        <label for="month-select">Month:</label>
        <select id="month-select">
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
        </select>
        <button onclick="updateCalendar()">Go</button>
    </div>
`);

// JavaScript to initialize and handle the calendar display
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

// Populate the year dropdown
const yearSelect = document.getElementById("year-select");
for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    if (i === currentYear) option.selected = true;
    yearSelect.appendChild(option);
}

// Set the initial month selection
document.getElementById("month-select").value = currentMonth;

// Function to generate calendar for the selected month and year
function generateCalendar(year, month) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = ""; // Clear previous calendar

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = "<table><tr>";

    // Create table header for days of the week
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (const day of daysOfWeek) {
        html += `<th>${day}</th>`;
    }
    html += "</tr><tr>";

    // Fill initial empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        html += "<td></td>";
    }

    // Fill cells with dates of the month
    for (let day = 1; day <= daysInMonth; day++) {
        if ((day + firstDay - 1) % 7 === 0) html += "</tr><tr>";
        html += `<td onclick="selectDate(${year}, ${month}, ${day})">${day}</td>`;
    }

    html += "</tr></table>";
    calendar.innerHTML = html;
}

// Update calendar when user selects a new month or year
function updateCalendar() {
    const selectedYear = parseInt(document.getElementById("year-select").value);
    const selectedMonth = parseInt(document.getElementById("month-select").value);
    generateCalendar(selectedYear, selectedMonth);
}

// Function to handle date selection and highlight 7-day period
function selectDate(year, month, day) {
    const calendar = document.getElementById("calendar");
    const cells = calendar.getElementsByTagName("td");

    // Clear previous highlights
    for (const cell of cells) {
        cell.classList.remove("highlighted");
    }

    // Highlight selected date and the next 6 days
    for (let i = 0; i < 7; i++) {
        const date = day + i;
        let cell = Array.from(cells).find(
            cell => cell.textContent == date && !cell.classList.contains("empty")
        );

        if (cell) {
            cell.classList.add("highlighted");
        } else {
            break; // Stop if we exceed the month's days
        }
    }
}

// Initial display
generateCalendar(currentYear, currentMonth);
