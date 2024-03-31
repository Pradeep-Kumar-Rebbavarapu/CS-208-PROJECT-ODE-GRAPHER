import React, { useState, useEffect } from "react";
import Chart from "chart.js";

export default function Graph({
  forward_r1,
  forward_r2,
  forward_lambda1,
  backward_r1,
  backward_r2,
  backward_lambda1,
}) {
  useEffect(() => {
    // Forward and Backward R1
    var r1Config = {
      type: "line",
      data: {
        labels: forward_lambda1,
        datasets: [
          {
            label: "K vs R1 (Forward)",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: forward_r1?.map((value, index) => ({
              x: forward_lambda1[index],
              y: value,
            })),
            fill: false,
          },
          {
            label: "K vs R1 (Backward)",
            backgroundColor: "#ff0000",
            borderColor: "#ff0000",
            data: backward_r1?.map((value, index) => ({
              x: backward_lambda1[index],
              y: value,
            })),
            fill: false,
          },
        ],
      },
      options: {
        
      },
    };

    var r1Ctx = document.getElementById("r1-chart").getContext("2d");
    window.myR1Line = new Chart(r1Ctx, r1Config);

    // Forward and Backward R2
    var r2Config = {
      type: "line",
      data: {
        labels: forward_lambda1,
        datasets: [
          {
            label: "K vs R2 (Forward)",
            backgroundColor: "#10b981",
            borderColor: "#10b981",
            data: forward_r2?.map((value, index) => ({
              x: forward_lambda1[index],
              y: value,
            })),
            fill: false,
          },
          {
            label: "K vs R2 (Backward)",
            backgroundColor: "#ff0000",
            borderColor: "#ff0000",
            data: backward_r2?.map((value, index) => ({
              x: backward_lambda1[index],
              y: value,
            })),
            fill: false,
          },
        ],
      },
      options: {
        
      },
    };

    var r2Ctx = document.getElementById("r2-chart").getContext("2d");
    window.myR2Line = new Chart(r2Ctx, r2Config);
  }, [
    forward_r1,
    forward_r2,
    forward_lambda1,
    backward_r1,
    backward_r2,
    backward_lambda1,
  ]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-white bg-blueGray-700 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">
                K vs R1/R2 (Forward & Backward)
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* R1 Chart */}
          <div className="relative h-screen">
            <h2 className="text-white text-lg font-semibold mb-4">R1 Case</h2>
            <canvas id="r1-chart"></canvas>
          </div>

          {/* R2 Chart */}
          <div className="relative h-screen">
            <h2 className="text-white text-lg font-semibold mb-4">R2 Case</h2>
            <canvas id="r2-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
