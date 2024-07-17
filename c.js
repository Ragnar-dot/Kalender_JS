


document.addEventListener('DOMContentLoaded', (event) => {
    generateCalendar();
});

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const currentDay = new Date().getDate(); // Define currentDay here

const holidays = {
    0: { 1: "Neujahr" }, // Januar
    4: { 1: "Tag der Arbeit" }, // Mai
    9: { 3: "Tag der Deutschen Einheit" }, // Oktober
    11: { 25: "Erster Weihnachtsfeiertag", 26: "Zweiter Weihnachtsfeiertag" } // Dezember
};

function generateCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarTitle = document.getElementById('calendar-title');
    const calendarTableBody = document.querySelector('#calendar-table tbody');
    const holidayInfoDiv = document.getElementById('holiday-info');

    // Monatsnamen auf Deutsch
    const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    // Kalender Titel setzen
    calendarTitle.textContent = `Kalenderblatt ${monthNames[currentMonth]} ${currentYear}`;

    // Kalender-Tabellenkörper und Feiertagsinformationen leeren
    calendarTableBody.innerHTML = '';
    holidayInfoDiv.innerHTML = '';

    let date = 1;
    let firstDay = (firstDayOfMonth + 6) % 7; // Anpassung für Montag als ersten Wochentag

    // Schleife für Kalenderreihen
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        // Schleife für Kalenderspalten
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.textContent = '';
            } else if (date > daysInMonth) {
                cell.textContent = '';
            } else {
                cell.textContent = date;

                // Feiertage markieren und Informationen hinzufügen
                if (holidays[currentMonth] && holidays[currentMonth][date]) {
                    cell.classList.add('holiday');
                    cell.title = holidays[currentMonth][date];

                    // Feiertagsinformationen hinzufügen
                    const holidayInfo = document.createElement('h3');
                    holidayInfo.textContent = `${date}. ${monthNames[currentMonth]}: ${holidays[currentMonth][date]}`;
                    holidayInfoDiv.appendChild(holidayInfo);
                }

                // Aktuellen Tag markieren
                if (currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() && date === currentDay) {
                    cell.classList.add('current-day');
                }

                date++;
            }

            row.appendChild(cell);
        }

        calendarTableBody.appendChild(row);

        if (date > daysInMonth) {
            break;
        }
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
}