import React, { useContext, useEffect, useRef } from "react";
import Chart from "chart.js"; // Import Chart.js with auto-configuration
import { Context } from "@/context/Context";

function PolarGraph() {
  const canvasRef = useRef(null);
  const { activity, time } = useContext(Context);
  useEffect(() => {
    
    const ctx = canvasRef.current.getContext("2d");

    console.log("Activity:", activity);
    console.log("Time:", time);

    // Ensure canvas element exists
    if (!ctx) {
      console.error("Canvas context not available");
      return;
    }

    

    const colors = ["red", "green", "blue"]; // Define colors for each subplot

    // Create a scatter plot
    const xData = activity.map(row => Math.cos(row[time]));
    const yData = activity.map(row => Math.sin(row[time]));
    console.log(xData , yData)
    new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: `Time ${time}`,
            data: xData.map((x, i) => ({ x, y: yData[i] })),
            backgroundColor: colors[0], // Using the first color for simplicity
            pointRadius: 5,
          }
        ]
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false // Disable tooltips
          },
          legend: {
            display: false // Disable legend
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: false // Disable zooming by mouse wheel
              },
              pinch: {
                enabled: false // Disable zooming by pinch gesture
              },
              mode: 'xy' // Enable both X and Y axis zooming
            }
          },
          pan: {
            enabled: false, // Disable panning
            mode: 'xy' // Enable both X and Y axis panning
          }
        },
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            ticks: {
              min: -1.1,
              max: 1.1
            },
            scaleLabel: {
              display: true,
              labelString: "cos(theta)"
            }
          },
          y: {
            type: "linear",
            position: "left",
            ticks: {
              min: -1.1,
              max: 1.1
            },
            scaleLabel: {
              display: true,
              labelString: "sin(theta)"
            }
          }
        }
      }
    });
    return ()=>{
      localStorage.clear()
    }
  }, [activity, time]);

  return (
    <div className=" flex mx-auto my-auto">
      <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  )
}

export default PolarGraph;
