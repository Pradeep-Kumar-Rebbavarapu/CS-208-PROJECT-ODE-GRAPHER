import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

const ThetavsT = ({ xValues, yValues }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: yValues?.map((yData, index) => ({
          data: yData.map((y, i) => ({ x: xValues[i], y })),
          borderColor: getRandomColor(),
          fill: false,
          tension: 0, // Set to 0 for straight lines
          label: `Line ${index + 1}`, // Add line labels for legend
        })),
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false, // Disable tooltips
          },
          legend: {
            display: true, // Enable legend
            position: 'bottom', // Position legend at the bottom
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: false, // Disable zooming by mouse wheel
              },
              pinch: {
                enabled: false, // Disable zooming by pinch gesture
              },
              mode: 'xy', // Enable both X and Y axis zooming
            },
          },
          pan: {
            enabled: false, // Disable panning
            mode: 'xy', // Enable both X and Y axis panning
          },
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'X',
            },
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Y',
            },
          },
        },
        elements: {
          line: {
            borderWidth: 1, // Set the line width to 1
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [xValues, yValues]);

  return <canvas ref={chartRef} />;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default ThetavsT;