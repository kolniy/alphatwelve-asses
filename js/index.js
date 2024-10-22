let isSidebarOpen = false;
const $sidebarElement = document.getElementById("sidebar");
const $sidebarLogoContainer = document.getElementById("sidebar-logo");
const $darkmodeBtn = document.getElementById("dark-mode-switch");
const $userProfileInfo = document.getElementById("user-profile-info");
const collapseIconNavbar = document.getElementById("collapseIcon");

const $collapseBtn = document.getElementById("collapseLink");
const $toggleNavbarBtn = document.querySelector(".mobile-menu__btn-container");
const $toggleNavbarBtnOnNavbar = document.querySelector(
  ".mobile-menu__btn-container-navbar"
);

const $navLinkSpans = document.querySelectorAll(".link-item-menu-span");
const $dashboardNotificationCount = document.querySelector(
  ".dashboard-notification-indicator"
);
// side navbar ul element
const $navlinksContainer = document.getElementById("nav-links");

// side navbar anchor elements
const $sideNavbarAnchorElement = document.querySelectorAll(
  ".side-navbar-link-element"
);

const removeNavbarLinkSpanForUI = () => {
  // All Navbar sapn items
  $navLinkSpans.forEach((span) => {
    span.style.display = "none";
  });
};

const addNavbarLinkSpanToUi = () => {
  // All Navbar sapn items
  $navLinkSpans.forEach((span) => {
    span.style.display = "block";
  });
};

const addCentralJustificationFromAllNavLinks = () => {
  $sideNavbarAnchorElement.forEach((a) => (a.style.justifyContent = "center"));
};

const removeCentralJustificationFromAllNavLinks = () => {
  $sideNavbarAnchorElement.forEach((a) => (a.style.justifyContent = ""));
};

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

const toggleNavbarCollapse = (e) => {
  e.preventDefault();
  if ($sidebarElement.style.width === "64px") {
    $sidebarElement.style.width = "240px"; // enlarge sidebar width
    $sidebarLogoContainer.style.visibility = "visible"; // display logo
    $darkmodeBtn.style.display = "flex"; // display darkmode switch
    $userProfileInfo.style.display = "flex"; // display the user info

    // collapse icon add
    collapseIconNavbar.classList.remove("fa-angle-double-right");
    collapseIconNavbar.classList.add("fa-angle-double-left");

    // add navbar notification
    $dashboardNotificationCount.style.display = "flex";

    // make navlink ul back to default width
    $navlinksContainer.style.width = "87%";

    // remove central justification from a links in navbar
    removeCentralJustificationFromAllNavLinks();

    // add navbar text when collapse is removed
    addNavbarLinkSpanToUi();
  } else {
    $sidebarElement.style.width = "64px"; // shorten sidebar width
    $sidebarLogoContainer.style.visibility = "hidden"; // remove logo from page
    $darkmodeBtn.style.display = "none"; // remove darkmode switch
    $userProfileInfo.style.display = "none"; // remove the user info

    // collapse icon remove
    collapseIconNavbar.classList.remove("fa-angle-double-left");
    collapseIconNavbar.classList.add("fa-angle-double-right");

    // remove navbar notification
    $dashboardNotificationCount.style.display = "none";

    // make icon items justify to the center
    addCentralJustificationFromAllNavLinks();

    // make navlink ul back to default width
    $navlinksContainer.style.width = "100%";

    // remove navbar text when collapsed
    removeNavbarLinkSpanForUI();
  }
};

$toggleNavbarBtn.addEventListener("click", toggleSidebar);
$toggleNavbarBtnOnNavbar.addEventListener("click", toggleSidebar);

// collapse button click
$collapseBtn.addEventListener("click", toggleNavbarCollapse);

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

const populateTableDataMobile = () => {
  const historyContainerMobile = document.querySelector(
    ".mobile-history__body"
  );

  eventsData.forEach((item, index) => {
    // Create accordion item container
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    //  Create title element
    const accordionTitle = document.createElement("div");
    accordionTitle.classList.add("accordion-title");

    const accordionTitleElement = document.createElement("p");
    accordionTitleElement.textContent = item.eventName;

    const accordionTitleIcon = document.createElement("i");
    accordionTitleIcon.classList.add("fas", "fa-chevron-right");

    const accordionTitleInnerDiv = document.createElement("div");
    accordionTitleInnerDiv.classList.add("accordion-title-inner-div");

    const accordionTitleStatus = document.createElement("span");
    if (item.status.toLowerCase() === "completed") {
      accordionTitleStatus.classList.add(
        "accordion-title-status",
        "title-completed"
      );
    } else {
      accordionTitleStatus.classList.add(
        "accordion-title-status",
        "title-inprogress"
      );
    }
    accordionTitleStatus.textContent = item.status;

    // append inner p and i tag into the inner div
    accordionTitleInnerDiv.appendChild(accordionTitleIcon);
    accordionTitleInnerDiv.appendChild(accordionTitleElement);

    // then append inner div into title div
    accordionTitle.appendChild(accordionTitleInnerDiv);
    accordionTitle.appendChild(accordionTitleStatus);

    // Creat content element
    const accordionContent = document.createElement("div");

    const contentElementText = document.createElement("p");
    contentElementText.textContent = item.speaker;

    const contentElementDate = document.createElement("p");
    contentElementDate.textContent = item.date;

    accordionContent.classList.add("accordion-content");
    accordionContent.appendChild(contentElementText);
    accordionContent.appendChild(contentElementDate);

    // Append title and content to the accordion item
    accordionItem.appendChild(accordionTitle);
    accordionItem.appendChild(accordionContent);

    // Add event listener to toggle content on click
    accordionTitle.addEventListener("click", function () {
      // toggle the active class
      this.parentElement.classList.toggle("active");

      //   toggle the icon class right and down arrow
      if (this.parentElement.classList.contains("active")) {
        accordionTitleIcon.classList.remove("fa-chevron-right");
        accordionTitleIcon.classList.add("fa-chevron-down");
      } else {
        accordionTitleIcon.classList.remove("fa-chevron-down");
        accordionTitleIcon.classList.add("fa-chevron-right");
      }
    });

    // Append accordion item to the main accordion container
    historyContainerMobile.appendChild(accordionItem);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  // function to populate table data
  populateTableData();
  populateTableDataMobile();
});
