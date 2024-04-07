import { InputValues } from '@/components/InputValues'
import GeneralPlotGraph from '@/components/GeneralPlotGraph'
import { Select, SelectComponent } from '@/components/SelectComponent'
import { Context } from '@/context/Context'
import React, { useContext } from 'react'
import PlotGraph from '@/components/Plotting'
import PolarGraph from '@/components/PolarGraph'
import ForwardGraph from '@/components/ForwardPlotGraph'
import Graph from '@/components/Graph'
import ThetavsT from '@/components/ThetavsT'

export default function Main() {
  const { forward_r1, forward_r2, forward_lambda1, backward_r1, backward_r2, backward_lambda1, type, theta, time } = useContext(Context)

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">Kuramoto Oscillator</h1>
          <div className="bg-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Equation</h2>
            <div className="equation flex justify-center items-center mb-4">
              <p className="text-xl font-bold">
                <span className="fraction">
                  <span className="frac-num">dθ<sub>i</sub></span>
                  <span className="frac-line"></span>
                  <span className="frac-den">dt</span>
                </span>
                &nbsp;=&nbsp;ω<sub>i</sub>&nbsp;+&nbsp;
                <span className="fraction">
                  <span className="frac-num">K<sub>1</sub></span>
                  <span className="frac-line"></span>
                  <span className="frac-den">N</span>
                </span>
                &sum;<sub>j=1</sub> sin(θ<sub>j</sub> - θ<sub>i</sub>)&nbsp;+&nbsp;
                <span className="fraction">
                  <span className="frac-num">K<sub>2</sub></span>
                  <span className="frac-line"></span>
                  <span className="frac-den">N<sup>2</sup></span>
                </span>
                &sum;<sub>j=1</sub> sin(2θ<sub>j</sub> - 2θ<sub>i</sub>)
              </p>
            </div>
            <div className="parameter-descriptions">
              <h3 className="text-lg font-semibold mb-2">Parameter Descriptions</h3>
              <ul className="list-disc pl-4">
                <li>θ<sub>i</sub>: Phase of the i<sup>th</sup> oscillator</li>
                <li>ω<sub>i</sub>: Natural frequency of the i<sup>th</sup> oscillator</li>
                <li>K<sub>1</sub>: Coupling strength for pairwise interactions</li>
                <li>K<sub>2</sub>: Coupling strength for higher-order interactions</li>
                <li>N: Number of oscillators</li>
              </ul>
            </div>
          </div>
        </div>
        <SelectComponent />
        <InputValues />
        {type === "Forward" && (
          <div>
            <div>
              <ForwardGraph
                forward_r1={forward_r1}
                forward_r2={forward_r2}
                forward_lambda1={forward_lambda1}
                backward_r1={backward_r1}
                backward_r2={backward_r2}
                backward_lambda1={backward_lambda1}
              />
            </div>
            
          </div>
        )}
        {type === "ThetavsT" && <ThetavsT xValues={time} yValues={theta} />}
      </div>
    </div>
  )
}