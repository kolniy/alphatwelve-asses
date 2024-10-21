document.addEventListener("DOMContentLoaded", function () {
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
});
