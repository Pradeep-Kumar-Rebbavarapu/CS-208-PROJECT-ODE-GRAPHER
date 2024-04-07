import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const ChartContainer = ({ chartRef, chartData, chartOptions, ariaLabel }) => {
  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'scatter',
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chartInstance.destroy();
    };
  }, [chartRef, chartData, chartOptions]);

  return (
    <div className="relative h-screen">
      <canvas ref={chartRef} aria-label={ariaLabel}></canvas>
    </div>
  );
};

export default function Graph({ forward_r1, forward_lambda1, backward_r1, backward_lambda1 }) {
  const forwardR1Ref = useRef(null);
  const backwardR1Ref = useRef(null);

  const forwardR1ChartData = {
    datasets: [
      {
        data: forward_lambda1?.map((val, index) => ({ x: val, y: forward_r1[index] })),
        label: 'k1 vs r1 (Forward)',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const backwardR1ChartData = {
    datasets: [
      {
        data: backward_lambda1?.map((val, index) => ({ x: val, y: backward_r1[index] })),
        label: 'k1 vs r1 (Backward)',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'k1',
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'r1',
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const { parsed } = context;
            return `(${parsed.x.toFixed(2)}, ${parsed.y.toFixed(2)})`;
          },
        },
      },
    },
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-white bg-blueGray-700 mb-1 text-xs font-semibold">
              Overview
            </h6>
            <h2 className="text-white text-xl font-semibold ">K vs R1 (Forward & Backward)</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="grid grid-cols-1  ">
          <div>
            <h2 className="text-white text-lg font-semibold ">R1 Case (Forward)</h2>
            <ChartContainer
              chartRef={forwardR1Ref}
              chartData={forwardR1ChartData}
              chartOptions={chartOptions}
              ariaLabel="Forward k1 vs r1"
            />
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold ">R1 Case (Backward)</h2>
            <ChartContainer
              chartRef={backwardR1Ref}
              chartData={backwardR1ChartData}
              chartOptions={chartOptions}
              ariaLabel="Backward k1 vs r1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}