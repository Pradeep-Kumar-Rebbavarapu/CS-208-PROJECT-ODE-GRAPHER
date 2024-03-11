import { useEffect } from "react";
import { Chart } from "chart.js";

function GeneralPlotGraph({id, x, data, xlabel, ylabel, graphLabel }) {
  console.log(x, data);

  useEffect(() => {
    var ctx = document.getElementById(`myChart-${id}`).getContext('2d');

    
    function randomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    var myChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          data: x.map((ele, index) => ({ x: ele, y: data[index] })),
          label: graphLabel || "Scatter Plot",
          borderColor: randomColor(), 
          backgroundColor: randomColor(), 
          fill: false,
          pointRadius: 3,
          pointHoverRadius: 8
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: xlabel || 'X-Axis'
            }
          },
          y: {
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: ylabel || 'Y-Axis'
            }
          }
        }
      }
    });

    
  }, [x, data]);

  return (
    <>
      
      <div className=" flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
          <canvas id={`myChart-${id}`}></canvas>
        </div>
      </div>
    </>
  );
}

export default GeneralPlotGraph;
