"use strict";

// let rightSideBarBtn = [...document.querySelectorAll("#rightSideBarBtn")];

let inputRootin = [...document.querySelectorAll("input[type=checkbox]")];
let resultRootin = document.querySelector("#resultRootin");

// logic of RootinRozaneh
let filteredCheckBox = [];

inputRootin.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    filteredCheckBox = Array.from(inputRootin)
      // Convert checkboxes to an array to use filter and map.
      .filter((item) => item.checked)
      // Use Array.map to extract only the checkbox values from the array of objects.
      .map((item, index) => {
        console.log(index);
        resultRootin.textContent = `${Math.round(((index + 1) / 21) * 100)} %`;
        return item.value;
      });
    console.log(filteredCheckBox);
  });
});

// logic of calender

// Function to convert Gregorian date to Shamsi date
function gregorianToShamsi(year, month, day) {
  const gregorianDate = new Date(year, month - 1, day);
  const gregorianYear = gregorianDate.getFullYear();
  const gregorianMonth = gregorianDate.getMonth() + 1;
  const gregorianDay = gregorianDate.getDate();

  // Convert the Gregorian date to Persian date
  const gregorianDaysSinceEpoch =
    Math.floor((gregorianYear - 1) * 365.25) +
    Math.floor((gregorianMonth - 1) * 30.6) +
    gregorianDay -
    1;
  const shamsiDaysSinceEpoch = gregorianDaysSinceEpoch + 226895 - 77;

  const shamsiYear = gregorianYear - 621;
  document.querySelector("#currentYear").textContent = `سال ${shamsiYear}`;

  const remainingDays = shamsiDaysSinceEpoch % 365;

  let shamsiMonth = 1;
  let shamsiDay = 1;

  if (remainingDays < 186) {
    shamsiMonth = Math.floor(remainingDays / 31) + 1;
    shamsiDay = (remainingDays % 31) + 1;
  } else {
    shamsiMonth = Math.floor((remainingDays - 186) / 30) + 7;
    shamsiDay = ((remainingDays - 186) % 30) + 1;
  }
  console.log(shamsiMonth);
  return { year: shamsiYear, month: shamsiMonth, day: shamsiDay };
}

// Generate the Shamsi calendar for a specific month
function generateCalendar(year, month) {
  const daysInMonth = [
    31, // Farvardin
    31, // Ordibehesht
    31, // Khordad
    31, // Tir
    31, // Mordad
    31, // Shahrivar
    30, // Mehr
    30, // Aban
    30, // Azar
    30, // Dey
    30, // Bahman
    29, // Esfand
  ];

  const firstDay = new Date(year, month - 1, 1).getDay();

  let calendarHTML = '<table class="table-auto">';
  calendarHTML += "<thead><tr>";
  calendarHTML += '<th class="px-4 py-2">ش</th>'; // Shamsi days
  calendarHTML += '<th class="px-4 py-2">ی</th>';
  calendarHTML += '<th class="px-4 py-2">د</th>';
  calendarHTML += '<th class="px-4 py-2">س</th>';
  calendarHTML += '<th class="px-4 py-2">چ</th>';
  calendarHTML += '<th class="px-4 py-2">پ</th>';
  calendarHTML += '<th class="px-4 py-2">ج</th>';
  calendarHTML += "</tr></thead>";
  calendarHTML += "<tbody>";

  let dayCount = 1;
  for (let i = 0; i < 6; i++) {
    calendarHTML += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        calendarHTML += '<td class="px-4 py-2 text-sm font-light"></td>';
      } else if (dayCount > daysInMonth[month - 1]) {
        calendarHTML += '<td class="px-4 py-2 text-sm font-light"></td>';
      } else {
        calendarHTML += `<td class="px-4 py-2 text-sm font-light">${dayCount}</td>`;
        dayCount++;
      }
    }
    calendarHTML += "</tr>";
  }

  calendarHTML += "</tbody></table>";

  return calendarHTML;
}

// Display the calendar for a specific month
function displayCalendar(year, month) {
  const calendarContainer = document.getElementById("calendarContainer");
  const monthNameElement = document.getElementById("monthName");
  const shamsiDate = gregorianToShamsi(year, month, 1);
  const calendarHTML = generateCalendar(shamsiDate.year, shamsiDate.month);
  const monthNames = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const monthName = monthNames[shamsiDate.month - 1];

  calendarContainer.innerHTML = calendarHTML;
  monthNameElement.textContent = monthName;
}

// Initial display for the current month
const today = new Date();
displayCalendar(today.getFullYear(), today.getMonth() + 1);

// Button event listeners to navigate between months
document.getElementById("prevMonthBtn").addEventListener("click", () => {
  today.setMonth(today.getMonth() - 1);
  displayCalendar(today.getFullYear(), today.getMonth() + 1);
});

document.getElementById("nextMonthBtn").addEventListener("click", () => {
  today.setMonth(today.getMonth() + 1);
  displayCalendar(today.getFullYear(), today.getMonth() + 1);
});

//  for logic of Single webPage
const allPages = {
  main: {
    page: "./index.html",
    title: "Planner Plus",
  },

  calender: {
    page: "./calender.html",
    title: "Calender Section",
  },

  helpCenter: {
    page: "./helpCenter.html",
    title: "Help And Center Section",
  },

  job: {
    page: "./job.html",
    title: "Job Section",
  },

  projects: {
    page: "./projects.html",
    title: "Project Section",
  },

  setting: {
    page: "./setting.html",
    title: "Setting Section",
  },

  tasks: {
    page: "./tasks.html",
    title: "Tasks Section",
  },

  teamMate: {
    page: "./teamMate.html",
    title: "TeamMate Section",
  },
};

let navRightLinks = document.querySelectorAll(".nav-right");
let centerContent = document.getElementById("center-Content-Container");

console.log(navRightLinks);
console.log(centerContent);

navRightLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    //logic of the border-left-orange
    link.classList.add("btn-click");
    navRightLinks.forEach((link2) => {
      if (link2 !== link) {
        link2.classList.remove("btn-click");
      }
    });
    // logic of the border-left-orange

    const href = link.getAttribute("href").substring(1);
    changeUrkRoute(href);
  });
});

const changeUrkRoute = (href) => {
  window.history.pushState({ href }, "", `#${href}`);
  changePageContent(href);
};

const changePageContent = async (href) => {
  const { page, title } = allPages[href];

  //fetch to current page
  const res = await fetch(page);
  const html = await res.text();

  //change html format text into valid html
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // check if new content is home page or another pages
  const existHeader = doc.body.querySelector("#right-SideBar-Layout");

  // if it was home page, just add main content (not header)

  if (existHeader) {
    const homeMainContent = doc.body.querySelector("#center-Content-Container");
    centerContent.innerHTML = homeMainContent.outerHTML;
  } else {
    centerContent.innerHTML = doc.body.outerHTML;
  }
  document.title = title;
  navRightLinks.forEach((link) => {
    link.classList.remove("btn-click");
    if (link.getAttribute("href").substring(1) === href) {
      link.classList.add("btn-click");
    }
  });
};

//update content when click in go back button
window.addEventListener("popstate", (e) => {
  if (e.state === null) {
    changePageContent("home");
  } else {
    changePageContent(e.state.href);
  }
});

// update last loaded content when refresh
window.addEventListener("DOMContentLoaded", () => {
  const initiaState = location.hash ? location.hash.substring(1) : "home";

  changePageContent(initiaState);
});
//  for logic of Single webPage
