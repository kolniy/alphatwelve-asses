document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector(".table-body");

  eventsData.forEach((eventItem) => {
    const row = document.createElement("tr");

    for (const key in eventItem) {
      const cell = document.createElement("td");
      cell.textContent = eventItem[key];
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  });
});
