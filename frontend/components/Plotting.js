import { useEffect } from "react";
import { Chart } from "chart.js";

function PlotGraph({ xValues, data }) {
  console.log(xValues, data);

  useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'scatter', // Specify scatter type
      data: {
        datasets: [{
          data: xValues.map((x, index) => ({ x, y: data[index] })), // Format data for scatter plot
          label: "sin(theta) vs time",
          borderColor: "#3e95cd",
          backgroundColor: "#7bb6dd",
          fill: false,
          pointRadius: 3, // Customize point radius
          pointHoverRadius: 8 // Customize point hover radius
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear', // Use linear scale for x-axis
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Time' // X-axis label
            }
          },
          y: {
            type: 'linear', // Use linear scale for y-axis
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'sin(theta)' // Y-axis label
            }
          }
        }
      }
    });

    return () => {
      // Cleanup
      myChart.destroy();
    };
  }, [xValues, data]);

  return (
    <>
      {/* Scatter plot */}
      <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">Scatter Plot</h1>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </>
  );
}

export default PlotGraph;
