import React, { useState, useEffect } from "react";
import { Chart } from "chart.js";

function PolarPlot({ activity }) {
  

  useEffect(() => {
    if (!activity || !activity.length) return;

    const ctx = document.getElementById("polarChart").getContext("2d");

    const data = {
      datasets: [
        {
          data: activity.map((value) => Math.abs(value)), // Using absolute values for activity
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
      labels: Array.from({ length: activity.length }, (_, i) => i + 1), // Assuming indices as labels
    };

    const config = {
      type: "polarArea",
      data: data,
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: Math.max(...activity.map((value) => Math.abs(value))) + 1, // Adjusting scale based on activity values
          },
        },
        responsive: true,
      },
    };

    const chart = new Chart(ctx, config);
    setPolarChart(chart);

    return () => {
      chart.destroy();
    };
  }, [activity]);

  const handleTimeChange = (e) => {
    setTime(parseInt(e.target.value));
  };

  const handleDraw = () => {
    if (!polarChart) return;

    const timeIndex = time; // Assuming time corresponds to index in activity array
    const newData = {
      datasets: [
        {
          data: activity.map((value) => Math.abs(value)), // Using absolute values for activity
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
      labels: Array.from({ length: activity.length }, (_, i) => i + 1), // Assuming indices as labels
    };

    polarChart.data = newData;
    polarChart.update();
  };

  return (
    <div>
      <div>
        <label htmlFor="timeInput">Enter Time:</label>
        <input
          type="number"
          id="timeInput"
          value={time}
          onChange={handleTimeChange}
        />
        <button onClick={handleDraw}>Draw</button>
      </div>
      <canvas id="polarChart" width="400" height="400"></canvas>
    </div>
  );
}

export default PolarPlot;
