"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Context } from "@/context/Context"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function InputValues() {
    
    const form = useForm()
    const {x,setx,y,sety,type,settype} = useContext(Context)


    const  onSubmit = (e) => {
        alert('clicked')
        const convertedData = {};
        for (const key in e) {
            convertedData[key] = parseFloat(e[key]);
        }
        console.log(convertedData)
        try {
            axios.post('http://127.0.0.1:8000/api/v1/__get__angle__values__/', convertedData).then((response)=>{
                const data = response.data;
                console.log(data)
                sety(data.phase_coherence_values)
                setx(data.xlim)
                
            });
            
          } catch (error) {
            console.error('Error running Fortran code:', error);
          }
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2">
                    <div className="mx-10">
                        <FormField
                            control={form.control}
                            name="nodes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nodes</FormLabel>
                                    <FormControl>
                                        <Input  placeholder="Number of Nodes" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Number of Nodes
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mx-10">
                        <FormField
                            control={form.control}
                            name="total_duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Total Duration</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Total Duration"  {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Total Duration
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mx-10">
                        <FormField
                            control={form.control}
                            name="coupling"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Coupling Value</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Coupling Value"  {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Coupling Value
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mx-10">
                        <FormField
                            control={form.control}
                            name="step_size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Step Size</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Step Size"  {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Step Size
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    
                </div>
                <div className="flex justify-center">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}
