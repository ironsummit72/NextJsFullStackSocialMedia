'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Form, FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import {  RegisterFormSchema } from "@/validations/form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"


import { useToast } from "@/hooks/use-toast"
import { clientapi } from "@/lib/api"
import { redirect } from "next/navigation"

export function RegisterPage() {

    const { toast } = useToast();
    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            username: "",
            password: '',
            email: '',
            confirmpassword: "",
            firstname: '',
            lastname: ''
        },
    })
    function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
        console.log(values,"value");
        clientapi.post('/auth/register', values, { headers: { 'content-type': 'application/x-www-form-urlencoded' } }).then((res) => {
            if (res.data.success) {
                toast({
                    title: 'Register Success',
                    description: 'User Registration successfull',
                    variant: 'default'
                })
                setTimeout(() => {
                    redirect('/')
                }, 2000)
            }
        }).catch((error) => {
            toast({
                title: 'Register Failed',
                description: error.response?.data?.message,
                variant: 'destructive'
            })
        })
    }

    return (
        <div className='w-screen h-[60%] md:flex items-center justify-center'>
            <Card className='m-10 md:w-[30%]'>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Create an Account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="lewis" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. lewis@example.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your email address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Firstname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Lewis" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lastname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Hamilton" {...field} />
                                        </FormControl>
                        
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter Password" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmpassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm Your Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full" type="submit">Register</Button>
                        </form>

                    </Form>
                </CardContent>
                <CardFooter className="w-full flex justify-center">
                    <span className="text-gray-600 font-semibold">{`Already have an Account ? `} <Link className="hover:underline underline-offset-2 text-blue-500 font-bold" href={'/login'}>Login</Link></span>
                </CardFooter>
            </Card>
        </div>
    )
}