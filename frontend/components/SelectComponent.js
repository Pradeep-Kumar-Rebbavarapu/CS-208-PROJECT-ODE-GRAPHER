import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useContext } from "react"
import { Context } from "@/context/Context"

export function SelectComponent() {
  const {type,settype} = useContext(Context)
  return (
    <div className="flex justify-center items-center my-10">
      <Select onValueChange={(e)=>{
        settype(e)
      }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Graph" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="sin_vs_time">Sin(θ) vs Time</SelectItem>
            <SelectItem value="r_vs_time">R vs Time</SelectItem>
            <SelectItem value="sin_vs_cos">Sin(θ) vs Cos(θ)</SelectItem>
            <SelectItem value="k_vs_r">K vs R</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
