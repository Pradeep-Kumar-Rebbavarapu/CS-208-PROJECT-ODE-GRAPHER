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

const LoadingOverlay = ({ isLoading }) => {
    return isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-50 inset-0 fixed" />
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
        </div>
    ) : null;
};

export function InputValues() {
    const form = useForm()
    const { setforward_r1, setforward_r2, setbackward_r1, setbackward_r2, setforward_lambda1, setbackward_lambda1, type, settype,settheta,settime } = useContext(Context)
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        const formData = form.getValues();
        const convertedData = {};
        for (const key in formData) {
            convertedData[key] = parseFloat(formData[key]);
        }

        if (type === "Polar" && (activity.length !== 0)) {
            localStorage.setItem('time', parseInt(formData.time))
            setTime(parseInt(formData.time));
        } else {
            setIsLoading(true); // Set loading state to true

            console.log(convertedData);
            try {
                let url;
                if(type == "Forward"){
                    url = "http://127.0.0.1:8000/api/v1/__get__k__vs__r__values__/"
                }
                if(type == "ThetavsT"){
                    url = "http://127.0.0.1:8000/api/v1/__get__theta__vs__t__values__/"
                }
                axios.post(url, convertedData)
                    .then((response) => {
                        const data = response.data;
                        console.log(data)

                        if (type == "Forward") {
                            setforward_r1(data.forward_r1)
                            setforward_r2(data.forward_r2)
                            setforward_lambda1(data.forward_lambda1)
                            setbackward_r1(data.backward_r1)
                            setbackward_r2(data.backward_r2)
                            setbackward_lambda1(data.backward_lambda1)
                        }

                        if (type == "ThetavsT") {
                            settheta(data.theta)
                            settime(data.time)
                        }
                    })
                    .catch((error) => {
                        console.error('Error running Fortran code:', error);
                    })
                    .finally(() => {
                        setIsLoading(false); // Set loading state to false after API call completes
                    });
            } catch (error) {
                console.error('Error running Fortran code:', error);
                setIsLoading(false); // Set loading state to false in case of an error
            }
        }
    };

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2">
                        {(type == "Forward" || type=="ThetavsT") && (
                            <div className="mx-10">
                                <FormField
                                    control={form.control}
                                    name="ndim"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Number of Oscillators</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Number of Oscillators" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Number of Oscillators
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {type == "Forward" && (
                            <div className="mx-10">
                                <FormField
                                    control={form.control}
                                    name="lambda1_start"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Coupling Start Value</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Coupling Start Value" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Coupling Start Value
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {type == "Forward" && (
                            <div className="mx-10">
                                <FormField
                                    control={form.control}
                                    name="lambda1_end"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Coupling End Value</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Coupling End Value" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Coupling End Value
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        {type=="ThetavsT" && (
                            <div className="mx-10">
                                <FormField
                                    control={form.control}
                                    name="lambda1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Coupling Strength 1</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Coupling Strength 1" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Coupling Strength 1
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        {(type == "Forward" || type=="ThetavsT") && (
                            <div className="mx-10">
                                <FormField
                                    control={form.control}
                                    name="lambda2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Coupling Strength 2</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Coupling Strength 2" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Coupling Strength 2
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        {(type == "Forward" || type=="ThetavsT") && (
                            <div className="mx-10">
                                <FormField
                                    control={form.control}
                                    name="lambda3"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Coupling Strength 3</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Coupling Strength 3" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Coupling Strength 3
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}