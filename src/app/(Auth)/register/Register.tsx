'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterFormSchema } from '@/validations/form'
import { zodResolver } from '@hookform/resolvers/zod'
import {  useForm } from 'react-hook-form'
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import Link from 'next/link'


export function RegisterPage() {
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
                    <RegisterContent />
                </CardContent>
                <CardFooter className="w-full flex justify-center">
                    <span className="text-gray-600 font-semibold">{`Already have an Account ? `} <Link className="hover:underline underline-offset-2 text-blue-500 font-bold" href={'/login'}>Login</Link></span>
                </CardFooter>
            </Card>
        </div>
    )
}

function RegisterContent() {
    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
        firstname:'',
        lastname:'',
        email:'',
        confirmpassword:'',
        password:'',
        username:''
        },
    })
    function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
        console.log(values)
    }
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. lewis" {...field} />
                        </FormControl>
                       
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
                       
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Lewis" {...field} />
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
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Hamilton" {...field} />
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
            <Button className="w-full" type="submit">Login</Button>
        </form>

    </Form>
}