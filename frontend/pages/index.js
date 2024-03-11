import { InputValues } from '@/components/InputValues'
import PlotGraph from '@/components/Plotting'
import { Select, SelectComponent } from '@/components/SelectComponent'
import { Context } from '@/context/Context'
import React, { useContext } from 'react'

export default function index() {
    const {x,y} = useContext(Context)
  return (
    <div>
        <div>
            <SelectComponent />
            <InputValues />
            <PlotGraph xValues={x} data={y} />
        </div>
    </div>
  )
}
