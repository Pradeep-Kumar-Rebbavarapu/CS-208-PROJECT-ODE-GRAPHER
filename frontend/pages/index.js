import { InputValues } from '@/components/InputValues'
import { Navbar } from '@/components/Navbar'
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
      <div className='z-[-1]'>
        {/* <SelectComponent /> */}
        {/* <InputValues /> */}
        <Navbar />
        {type == "General" && (
          <div className='grid grid-cols-2 gap-10  m-4'>
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
  //   <div style={{ display: 'flex' }}>
  //   {/* Left Half */}
  //   <div style={{ flex: '1 1 50%', paddingRight: '20px' }}>
  //     <SelectComponent />
  //     <InputValues />
  //   </div>

  //   {/* Right Half */}
  //   <div style={{ flex: '1 1 50%', paddingLeft: '20px' }}>
      

  //     {/* Render different components based on type */}
  //     {type === 'General' && (
  //       <div className='grid grid-cols-2 gap-10'>
  //         <div>
  //           <GeneralPlotGraph id={'1'} x={xlim} data={PhaseCoherenceValues} xlabel={'R'} ylabel={'Time'} graphLabel={'R vs Time'} />
  //         </div>
  //         <div>
  //           <GeneralPlotGraph id={'2'} x={xlim} data={PhaseCoherenceValues} xlabel={'R'} ylabel={'Time'} graphLabel={'R vs Time'} />
  //         </div>
  //       </div>
  //     )}
  //     {type === 'Polar' && <PolarGraph />}
  //     {type === 'Forward' && <ForwardGraph />}
  //     {type === 'Backward' && <h1>Backward Graphs</h1>}
  //   </div>
  // </div>
  )
}
