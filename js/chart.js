document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("reg-chart");
  let ticksColor = "#64748b";
  const chartData = {
    labels: [
      "Jan",
      "Fab",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [700, 950, 780, 420, 1000, 590, 830, 380, 810, 620, 970, 600],
        backgroundColor: "#8576FF",
        borderWidth: 1,
      },
    ],
  };
  // Define the chart options (optional)
  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          drawTicks: false,
        },
        ticks: {
          color: ticksColor,
          fontSize: "80",
          fontWeight: "400",
          margin: "20",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 200, // Increment of 200
          color: ticksColor,
        },
        grid: {
          drawTicks: false,
        },
      },
    },
  };
  const myBarChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: chartOptions,
  });
});
