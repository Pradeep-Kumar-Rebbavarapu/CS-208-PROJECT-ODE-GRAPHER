import { useContext, useEffect } from "react";
import Chart from "chart.js"; // Note: Importing 'chart.js/auto' instead of 'chart.js'
import { Context } from "@/context/Context";

function ForwardGraph() {
  const { couplingVals, rMean } = useContext(Context);

  useEffect(() => {
    

    const ctx = document.getElementById(`ForwardGraph`).getContext("2d");

    const myChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            data: couplingVals.map((val, index) => ({ x: val, y: rMean[index] })),
            label: "rMean vs couplingVals",
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192)",
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            scaleLabel: {
              display: true,
              labelString: "couplingVals",
            },
          },
          y: {
            type: "linear",
            position: "left",
            scaleLabel: {
              display: true,
              labelString: "rMean",
            },
          },
        },
      },
    });

    
  }, [couplingVals, rMean]);

  return (
    <>
      <div className="flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto shadow-xl">
          <canvas id="ForwardGraph"></canvas>
        </div>
      </div>
    </>
  );
}

export default ForwardGraph;
