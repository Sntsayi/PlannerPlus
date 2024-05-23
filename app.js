"use strict";

let inputRootin = [...document.querySelectorAll("input[type=checkbox]")];
let resultRootin = document.querySelector("#resultRootin");
const projectBtn = document.querySelector("#projectBtn");
const projectShown = document.querySelector(".projectShown");

// forAddNewTask
const htmlTag = document.querySelector("html");
const headerTag = document.querySelector("header");
const rightSideBarBtn = document.querySelector(".right-SideBar-Layout");
const leftSideBarBtn = document.querySelector(".left-SideBar-Layout");
// forAddNewTask

// for tbn of the project
projectBtn.addEventListener("click", () => {
  projectShown.classList.toggle("hidden");
});
// for tbn of the project

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
        resultRootin.textContent = `${Math.round(
          ((index + 1) / inputRootin.length) * 100
        )} %`;
        return item.value;
      });
    console.log(filteredCheckBox);
  });
});

// today date
let todayDate = new Date().toLocaleDateString("fa-IR");
console.log(todayDate);
document.querySelector("#today_date").innerHTML = todayDate;
// today date

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
  newTicket: {
    page: "./newTicket.html",
    title: "Add New Ticket",
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

// console.log(navRightLinks);
// console.log(centerContent);

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

  // for change and add left and centre side
  const centerMainTag = document.querySelector("#center_content");
  const leftSideBarLayout = document.querySelector(".left-SideBar-Layout");

  // check if new content is home page or another pages
  const existHeader = doc.body.querySelector("#right-SideBar-Layout");

  // if it was home page, just add main content (not header)

  if (existHeader) {
    const homeMainContent = doc.body.querySelector("#center-Content-Container");
    centerContent.innerHTML = homeMainContent.outerHTML;
    centerMainTag.classList.add("w-2/3");
    centerMainTag.classList.remove("w-4/5");
    leftSideBarLayout.classList.remove("hidden");
  } else {
    centerMainTag.classList.remove("w-2/3");
    centerMainTag.classList.add("w-4/5");
    leftSideBarLayout.classList.add("hidden");

    centerContent.innerHTML = doc.body.outerHTML;

    function setSweetAlert() {
      Swal.fire({
        icon: "success",
        text: "با موفیت افزوده شد.",
        title: "موفق",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
        timer: 3000,
      });
    }

    // for taskPageLogic
    if (doc.title == "Tasks Section") {
      $("#elementId ,#elementId1 ").persianDatepicker({
        theme: "dark",
        cellWidth: 30, // by px
        cellHeight: 30, // by px
        alwaysShow: !1,
        //   fontSize: 13, // by px
        // onShow: function () {},
        // onHide: function () {},
        // onSelect: function () {},
        // onRender: function () {},
      });

      //for multi select tag
      new MultiSelectTag("countries", {
        rounded: true, // default true
        shadow: true, // default false
        placeholder: "Search", // default Search...
        tagColor: {
          textColor: "#327b2c",
          borderColor: "#92e681",
          bgColor: "#111",
        },
        onChange: function (values) {
          console.log(values);
        },
      });
      //for multi select tag

      // for clickedAddNewTaksBtn
      const addNewTask = centerContent.querySelector(".addNewTask");
      const newTaskWindow = centerContent.querySelector(".newTaskWindow");
      const centerElements = centerContent.querySelector(".centerElements");
      const closeNewTaskWindow = centerContent.querySelector(
        ".closeNewTaskWindow"
      );

      // console.log(addNewTask);
      addNewTask.addEventListener("click", () => {
        newTaskWindow.classList.remove("translate-x-400%");
        // htmlTag.classList.add("overflow-y-hidden");
        headerTag.classList.add("blur-sm");
        rightSideBarBtn.classList.add("blur-md");
        centerElements.classList.add("blur-md");
        leftSideBarBtn.classList.add("blur-md");
      });
      // for closeTheAddNewTaskWindow
      closeNewTaskWindow.addEventListener("click", () => {
        newTaskWindow.classList.add("translate-x-400%");
        // htmlTag.classList.remove("overflow-y-hidden");
        headerTag.classList.remove("blur-sm");
        rightSideBarBtn.classList.remove("blur-md");
        centerElements.classList.remove("blur-md");
        leftSideBarBtn.classList.remove("blur-md");
      });

      // for confirmNewTaskBtn
      document.querySelector("#submitForm").addEventListener("submit", (e) => {
        e.preventDefault();

        setSweetAlert();
        setTimeout(() => {
          newTaskWindow.classList.add("translate-x-400%");
          htmlTag.classList.remove("overflow-y-hidden");
          headerTag.classList.remove("blur-sm");
          rightSideBarBtn.classList.remove("blur-md");
          centerElements.classList.remove("blur-md");
          leftSideBarBtn.classList.remove("blur-md");
        }, 4000);

        // reset the all input tags
        e.target.reset();
        // document.querySelector("#countries").selectedIndex = -1;
      });
    }
    // for taskPageLogic

    // for the helpCenter
    if (doc.title == "Help And Center Section") {
      // for clickedAddNewTaksBtn
      const newTicketBtn = centerContent.querySelector("#newTicket");
      const centerElements = centerContent.querySelector(".centerElements");
      const searchBar = centerContent.querySelector("#searchBar");
      const statusOfTicket = centerContent.querySelector("#statusOfTicket");
      const newTicketWindow = centerContent.querySelector(".newTicketWindow");
      const closeNewTicketWindow = centerContent.querySelector(
        ".closeNewTicketWindow"
      );

      console.log(newTicketBtn);
      newTicketBtn.addEventListener("click", () => {
        // console.log(addNewTask);

        newTicketWindow.classList.remove("translate-x-400%");
        // htmlTag.classList.add("overflow-y-hidden");
        headerTag.classList.add("blur-sm");
        rightSideBarBtn.classList.add("blur-md");
        centerElements.classList.add("blur-md");
        searchBar.classList.add("blur-md");
        statusOfTicket.classList.add("blur-md");
        leftSideBarBtn.classList.add("blur-md");
      });
      // for closeTheAddNewTaskWindow
      closeNewTicketWindow.addEventListener("click", () => {
        newTicketWindow.classList.add("translate-x-400%");
        // htmlTag.classList.remove("overflow-y-hidden");
        headerTag.classList.remove("blur-sm");
        rightSideBarBtn.classList.remove("blur-md");
        centerElements.classList.remove("blur-md");
        searchBar.classList.remove("blur-md");
        statusOfTicket.classList.remove("blur-md");
        leftSideBarBtn.classList.remove("blur-md");
      });

      //for added the newTicketSubmit
      document.querySelector("#submitForm").addEventListener("submit", (e) => {
        e.preventDefault();

        setSweetAlert();
        setTimeout(() => {
          newTicketWindow.classList.add("translate-x-400%");
          htmlTag.classList.remove("overflow-y-hidden");
          headerTag.classList.remove("blur-sm");
          rightSideBarBtn.classList.remove("blur-md");
          centerElements.classList.remove("blur-md");
          leftSideBarBtn.classList.remove("blur-md");
        }, 4000);

        // reset the all input tags
        e.target.reset();
        // document.querySelector("#countries").selectedIndex = -1;
      });
      //for added the newTicketSubmit

      // for show the detail of the ticket
      const tickets = centerContent.querySelectorAll(".ticket");
      const ticketListWindow = centerContent.querySelector(".ticketListWindow");
      const closeTicketListWindow = centerContent.querySelector(
        ".closeTicketListWindow"
      );
      tickets.forEach((ticket) => {
        ticket.addEventListener("click", () => {
          ticketListWindow.classList.remove("translate-x-400%");
          // htmlTag.classList.add("overflow-y-hidden");
          headerTag.classList.add("blur-sm");
          rightSideBarBtn.classList.add("blur-md");
          centerElements.classList.add("blur-md");
          searchBar.classList.add("blur-md");
          statusOfTicket.classList.add("blur-md");
          leftSideBarBtn.classList.add("blur-md");
        });
      });

      // for closeTheTicketListWindow
      closeTicketListWindow.addEventListener("click", () => {
        ticketListWindow.classList.add("translate-x-400%");
        // htmlTag.classList.remove("overflow-y-hidden");
        headerTag.classList.remove("blur-sm");
        rightSideBarBtn.classList.remove("blur-md");
        centerElements.classList.remove("blur-md");
        searchBar.classList.remove("blur-md");
        statusOfTicket.classList.remove("blur-md");
        leftSideBarBtn.classList.remove("blur-md");
      });

      // for show the detail of the ticket
    }
    // for the helpCenter
  }
  document.title = title;
  // for when the refresh the page ,current page and current button of right link is actived button
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

// // for login page
// window.onload = function () {
//   document.querySelector(".inputOfLogin").value = " ";
// };
