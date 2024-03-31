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
    <div className="border border-gray-400 rounded-xl shadow-xl">
      <canvas ref={chartRef} aria-label={ariaLabel}></canvas>
    </div>
  );
};

const ForwardGraph = ({
  forward_r1,
  forward_r2,
  forward_lambda1,
  backward_r1,
  backward_r2,
  backward_lambda1,
}) => {
  const forwardR1Ref = useRef(null);
  const forwardR2Ref = useRef(null);
  const backwardR1Ref = useRef(null);
  const backwardR2Ref = useRef(null);

  const forwardR1ChartData = {
    datasets: [
      {
        data: forward_lambda1?.map((val, index) => ({
          x: val,
          y: forward_r1[index],
        })),
        label: 'r1 vs lambda1 (Forward)',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const forwardR2ChartData = {
    datasets: [
      {
        data: forward_lambda1?.map((val, index) => ({
          x: val,
          y: forward_r2[index],
        })),
        label: 'r2 vs lambda1 (Forward)',
        borderColor: 'rgb(192, 75, 192)',
        backgroundColor: 'rgba(192, 75, 192, 0.5)',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const backwardR1ChartData = {
    datasets: [
      {
        data: backward_lambda1?.map((val, index) => ({
          x: val,
          y: backward_r1[index],
        })),
        label: 'r1 vs lambda1 (Backward)',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const backwardR2ChartData = {
    datasets: [
      {
        data: backward_lambda1?.map((val, index) => ({
          x: val,
          y: backward_r2[index],
        })),
        label: 'r2 vs lambda1 (Backward)',
        borderColor: 'rgb(192, 75, 192)',
        backgroundColor: 'rgba(192, 75, 192, 0.5)',
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
          text: 'lambda1',
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'r',
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
    <div className=" mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Forward and Backward Graphs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Forward Graphs</h2>
          <div className="grid grid-cols-1  gap-4">
            <ChartContainer
              chartRef={forwardR1Ref}
              chartData={forwardR1ChartData}
              chartOptions={chartOptions}
              ariaLabel="Forward R1 vs Lambda1"
            />
            <ChartContainer
              chartRef={forwardR2Ref}
              chartData={forwardR2ChartData}
              chartOptions={chartOptions}
              ariaLabel="Forward R2 vs Lambda1"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Backward Graphs</h2>
          <div className="grid grid-cols-1  gap-4">
            <ChartContainer
              chartRef={backwardR1Ref}
              chartData={backwardR1ChartData}
              chartOptions={chartOptions}
              ariaLabel="Backward R1 vs Lambda1"
            />
            <ChartContainer
              chartRef={backwardR2Ref}
              chartData={backwardR2ChartData}
              chartOptions={chartOptions}
              ariaLabel="Backward R2 vs Lambda1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForwardGraph;