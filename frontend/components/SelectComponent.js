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
    <div className="flex justify-center items-center my-10  z-[10]">
      <Select onValueChange={(e)=>{
        settype(e)
      }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue className="!text-black" placeholder ="Select a Graph" />
        </SelectTrigger>
        <SelectContent style={{ backgroundColor: "white",color:"black", borderRadius: "0.5rem", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
          <SelectGroup>
          <SelectItem  value="General">General Graphs</SelectItem>
            <SelectItem  value="Polar">Polar Graph</SelectItem>
            <SelectItem  value="Forward">Forward Graph</SelectItem>
            <SelectItem  value="Backward">Backward Graph</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
