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
  const { forward_r1, forward_r2, forward_lambda1, backward_r1, backward_r2, backward_lambda1 ,type,theta,time} = useContext(Context)
  return (
    <div>
      <SelectComponent />
      <InputValues />
      {type=="Forward" && (
        <ForwardGraph forward_r1={forward_r1} forward_r2={forward_r2} forward_lambda1={forward_lambda1} backward_r1={backward_r1} backward_r2={backward_r2} backward_lambda1={backward_lambda1} />
      )}
      {type=="ThetavsT" && (
        <ThetavsT xValues={time} yValues={theta} />
      )}
    </div>
  )
}
