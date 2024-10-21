let isSidebarOpen = false;

const toggleSidebar = () => {
  const sidebarImage = document.getElementById("sidebar-logo-img");
  const sidebarImageOnNavbar = document.getElementById(
    "sidebar-logo-img-on-navbar"
  );

  if (isSidebarOpen) {
    sidebarImage.src = "./images/breadcrumb.png";
    sidebarImageOnNavbar.src = "./images/breadcrumb.png";
  } else {
    sidebarImage.src = "./images/close.png";
    sidebarImageOnNavbar.src = "./images/close.png";
  }

  isSidebarOpen = !isSidebarOpen;
  document.getElementById("sidebar").classList.toggle("sidebar-mobile");
};

const $toggleNavbarBtn = document.querySelector(".mobile-menu__btn-container");
const $toggleNavbarBtnOnNavbar = document.querySelector(
  ".mobile-menu__btn-container-navbar"
);

$toggleNavbarBtn.addEventListener("click", toggleSidebar);
$toggleNavbarBtnOnNavbar.addEventListener("click", toggleSidebar);

const populateTableData = () => {
  const tableBody = document.querySelector(".table-body");

  eventsData.forEach((eventItem) => {
    const row = document.createElement("tr");

    for (const key in eventItem) {
      const cell = document.createElement("td");

      if (key.toLowerCase() === "status") {
        const statusSpan = document.createElement("span");

        const dotIcon = document.createElement("i");
        dotIcon.classList.add("fas");
        dotIcon.classList.add("fa-circle");

        const textSpan = document.createElement("span");
        textSpan.textContent = eventItem[key];

        statusSpan.appendChild(dotIcon);
        statusSpan.appendChild(textSpan);

        if (eventItem[key].toLowerCase() === "completed") {
          statusSpan.classList.add("status-span", "completed");
        } else {
          statusSpan.classList.add("status-span", "inprogress");
        }

        cell.appendChild(statusSpan);
      } else {
        cell.textContent = eventItem[key];
      }

      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  });
};
document.addEventListener("DOMContentLoaded", function () {
  // function to populate table data
  populateTableData();
});
