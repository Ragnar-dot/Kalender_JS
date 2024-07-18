document.addEventListener('DOMContentLoaded', (event) => {
    generateCalendar();
});

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const currentDay = currentDate.getDate();

const holidays = {
    0: { 1: "Neujahr" },
    2: { 29: "Karfreitag" }, // Karfreitag (Beweglicher Feiertag)
    4: { 1: "Tag der Arbeit" },
    5: { 11: "Fronleichnam" }, // Fronleichnam (Beweglicher Feiertag in einigen Bundesländern)
    9: { 3: "Tag der Deutschen Einheit" },
    11: { 25: "Erster Weihnachtsfeiertag", 26: "Zweiter Weihnachtsfeiertag" }
};

const events = {}; // Objekt zur Speicherung der Ereignisse

function generateCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarTitle = document.getElementById('calendar-title');
    const calendarTableBody = document.querySelector('#calendar-table tbody');
    const holidayInfoDiv = document.getElementById('holiday-info');

    const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    calendarTitle.textContent = `Kalenderblatt ${monthNames[currentMonth]} ${currentYear}`;

    calendarTableBody.innerHTML = '';@
    holidayInfoDiv.innerHTML = '';

    let date = 1;
    let firstDay = (firstDayOfMonth + 6) % 7;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.textContent = '';
            } else if (date > daysInMonth) {
                cell.textContent = '';
            } else {
                cell.textContent = date;
                cell.dataset.date = date; // Datum als Datensatz speichern

                if (holidays[currentMonth] && holidays[currentMonth][date]) {
                    cell.classList.add('holiday');
                    cell.title = holidays[currentMonth][date];

                    const holidayInfo = document.createElement('h3');
                    holidayInfo.textContent = `${date}. ${monthNames[currentMonth]}: ${holidays[currentMonth][date]}`;
                    holidayInfoDiv.appendChild(holidayInfo);
                }

                if (currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() && date === currentDay) {
                    cell.classList.add('current-day');
                }

                // Ereignisse aus events-Objekt laden und anzeigen
                const eventKey = `${currentYear}-${currentMonth + 1}-${date}`;
                if (events[eventKey]) {
                    events[eventKey].forEach((event, index) => {
                        const eventDiv = createEventElement(event, index, eventKey);
                        cell.appendChild(eventDiv);
                    });
                }

                cell.addEventListener('click', function () {
                    // Alle markierten Tage zurücksetzen
                    document.querySelectorAll('.selected-day').forEach(el => el.classList.remove('selected-day'));
                    // Den geklickten Tag rot markieren
                    this.classList.add('selected-day');

                    // Termin hinzufügen
                    const eventText = prompt("Geben Sie den Termin für diesen Tag ein:");
                    if (eventText) {
                        if (!events[eventKey]) {
                            events[eventKey] = [];
                        }
                        events[eventKey].push(eventText);

                        // Ereignis in die Zelle einfügen
                        const eventDiv = createEventElement(eventText, events[eventKey].length - 1, eventKey);
                        this.appendChild(eventDiv);
                    }
                });

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

function createEventElement(eventText, index, eventKey) {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.textContent = eventText;

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', function (e) {
        e.stopPropagation(); // Stoppt das Event-Bubbling, um das Löschen des Tages zu verhindern
        if (confirm('Sind Sie sicher, dass Sie diesen Termin löschen möchten?')) {
            events[eventKey].splice(index, 1); // Löscht das Ereignis aus dem events-Objekt
            eventDiv.remove(); // Entfernt das HTML-Element aus der Zelle
        }
    });

    eventDiv.appendChild(deleteButton);
    return eventDiv;
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










