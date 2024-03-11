import { InputValues } from '@/components/InputValues'
import GeneralPlotGraph from '@/components/GeneralPlotGraph'
import { Select, SelectComponent } from '@/components/SelectComponent'
import { Context } from '@/context/Context'
import React, { useContext } from 'react'
import PlotGraph from '@/components/Plotting'
import PolarGraph from '@/components/PolarGraph'
import ForwardGraph from '@/components/ForwardPlotGraph'
export default function Main() {
  const { x, y, type,sinactivity,
    setactivity,
    ActivityTranspose,
    setActivityTranspose,
    SinOfActivityTranspose,
    setSinOfActivityTranspose,
    PhaseCoherenceValues,
    setPhaseCoherenceValues,
    xlim,
    
    setxlim } = useContext(Context)

    
  console.log(type)
  return (
    <div>
      <div>
        <SelectComponent />
        <InputValues />
        {type == "General" && (
          <div className='grid grid-cols-2 gap-10'>
            <div>
              <GeneralPlotGraph id={"1"} x={xlim} data={PhaseCoherenceValues} xlabel={"R"} ylabel={"Time"} graphLabel={"R vs Time"} />
            </div>

            <div>
              <GeneralPlotGraph id={"2"} x={xlim} data={PhaseCoherenceValues} xlabel={"R"} ylabel={"Time"} graphLabel={"R vs Time"} />
            </div>
            
          </div>
        )}
        {type == "Polar" && (
          <div>
            <PolarGraph />
          </div>
        )}

        {type == "Forward" && (
          <div>
            <ForwardGraph />
          </div>
        )}

        {type == "Backward" && (
          <h1>Backward Graphs</h1>
        )}


      </div>
    </div>
  )
}
