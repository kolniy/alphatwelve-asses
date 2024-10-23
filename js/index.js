let isSidebarOpen = false;
const $sidebarElement = document.getElementById("sidebar");
const $sidebarLogoContainer = document.getElementById("sidebar-logo");
const $darkmodeBtn = document.getElementById("dark-mode-switch");
const $userProfileInfo = document.getElementById("user-profile-info");
const collapseIconNavbar = document.getElementById("collapseIcon");

// modal handler
const $modal = document.getElementById("eventModal");

// event display elements
const $eventName = document.getElementById("modalEventName");
const $eventDate = document.getElementById("modalEventDate");
const $eventDescription = document.getElementById("event-description");
const $eventSpeake = document.getElementById("event-speakers");
const $attendees = document.getElementById("attendees");

const $collapseBtn = document.getElementById("collapseLink");
const $toggleNavbarBtn = document.querySelector(".mobile-menu__btn-container");
const $toggleNavbarBtnOnNavbar = document.querySelector(
  ".mobile-menu__btn-container-navbar"
);

const $searchInput = document.getElementById("search-input");
const $statusInput = document.getElementById("status-dropdown");

const $dashboardNotificationIndicator = document.querySelector(
  ".dashboard-notification-dot"
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

// side navbar icons
const $sideNavbarIcons = document.querySelectorAll(".link-item-menu-icon");

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

const addIconsMarginRightStyle = () => {
  $sideNavbarIcons.forEach((i) => (i.style.marginRight = "15px"));
};

const removeIconsMarginRightStyle = () => {
  $sideNavbarIcons.forEach((i) => (i.style.marginRight = ""));
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

const collapseNavbar = () => {
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

  // remove marginRight from links for proper centralization
  removeIconsMarginRightStyle();

  // add notification to UI
  $dashboardNotificationIndicator.style.display = "block";

  // make navlink ul back to default width
  $navlinksContainer.style.width = "100%";

  // remove navbar text when collapsed
  removeNavbarLinkSpanForUI();
};

const openNavbar = () => {
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

  // remove notification for from UI
  $dashboardNotificationIndicator.style.display = "none";

  // add marginRight back to links to set back as default
  addIconsMarginRightStyle();

  // add navbar text when collapse is removed
  addNavbarLinkSpanToUi();
};

const toggleNavbarCollapse = (e) => {
  e.preventDefault();
  if ($sidebarElement.style.width === "64px") {
    openNavbar();
  } else {
    collapseNavbar();
  }
};

// open modal
const launchModalView = (item) => {
  $eventName.textContent = item.eventName;
  $eventDate.textContent = item.date;
  $eventDescription.textContent = item.description;
  $eventSpeake.textContent = item.speaker;
  $attendees.textContent = `${item.attendees} Attendees`;

  $modal.style.display = "flex";
};

// close modal
const handleModalClose = () => {
  $modal.style.display = "none";
};

const handleFooterBtnClick = () => alert("We're working Here");

$toggleNavbarBtn.addEventListener("click", toggleSidebar);
$toggleNavbarBtnOnNavbar.addEventListener("click", toggleSidebar);

// collapse button click
$collapseBtn.addEventListener("click", toggleNavbarCollapse);

const populateTableData = (eventsData) => {
  const tableBody = document.querySelector(".table-body");

  tableBody.innerHTML = "";

  eventsData.forEach((eventItem) => {
    const row = document.createElement("tr");

    for (const key in eventItem) {
      if (key === "description" || key === "attendees") {
        break;
      }
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

    row.addEventListener("click", function () {
      launchModalView(eventItem);
    });
    tableBody.appendChild(row);
  });
};

const populateTableDataMobile = (eventsData) => {
  const historyContainerMobile = document.querySelector(
    ".mobile-history__body"
  );

  // list containerbody before repopulating
  historyContainerMobile.innerHTML = "";

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

    // add modal launching to accordion
    accordionContent.addEventListener("click", function () {
      launchModalView(item);
    });

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

const filterEvents = () => {
  const inputValue = $searchInput.value.toLowerCase();
  const statusValue = $statusInput.value.toLowerCase();
  // Convert input to lowercase for case-insensitive search
  const filteredData = eventsData.filter((event) => {
    const matchesInput =
      event.eventName.toLowerCase().includes(inputValue.toLowerCase()) ||
      event.speaker.toLowerCase().includes(inputValue.toLowerCase()) ||
      event.status.toLowerCase().includes(inputValue.toLowerCase()) ||
      event.date.includes(inputValue); // Keep date case-sensitive

    const matchesStatus =
      statusValue === "" || event.status.toLowerCase() === statusValue;

    return matchesInput && matchesStatus;
  });

  document.querySelector(
    ".list-count"
  ).textContent = `Displaying ${filteredData.length} results`;
  // Repopulate table with the filtered data
  populateTableData(filteredData);
  populateTableDataMobile(filteredData);
};

$searchInput.addEventListener("input", filterEvents);
$statusInput.addEventListener("change", filterEvents);

document.addEventListener("DOMContentLoaded", function () {
  // display the total number of documents on the UI on page load
  document.querySelector(
    ".list-count"
  ).textContent = `Displaying ${eventsData.length} results`;

  // function to populate table data
  populateTableData(eventsData);
  populateTableDataMobile(eventsData);
});
