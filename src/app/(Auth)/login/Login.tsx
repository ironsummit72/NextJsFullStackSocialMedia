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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Form, FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { loginWithEmail, loginWithUsername } from "@/validations/form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import {clientapi} from "@/lib/api"
import { headers } from "next/headers"
export function LoginPage() {
    return (
        <div className="container flex items-center justify-center h-screen w-screen">
            <Tabs defaultValue="username" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="username">Username</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>
                <TabsContent value="username">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login with Username</CardTitle>
                            <CardDescription>
                                Enter your username and password to Login.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <LoginWithUsername />
                        </CardContent>
                        <CardFooter className="w-full flex justify-center">
                            <span className="text-gray-600 font-semibold">{`Don't have an Account Yet? `} <Link className="hover:underline underline-offset-2 text-blue-500 font-bold" href={'/register'}>Register</Link></span>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="email">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login with Email</CardTitle>
                            <CardDescription>
                                Enter your email and password to Login.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <LoginWithEmail />
                        </CardContent>
                        <CardFooter className="w-full flex justify-center">
                            <span className="text-gray-600 font-semibold">{`Don't have an Account Yet? `} <Link className="hover:underline underline-offset-2 text-blue-500 font-bold" href={'/register'}>Register</Link></span>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function LoginWithUsername() {
    const form = useForm<z.infer<typeof loginWithUsername>>({
        resolver: zodResolver(loginWithUsername),
        defaultValues: {
            username: "",
            password: ''
        },
    })
    function onSubmit(values: z.infer<typeof loginWithUsername>) {
        clientapi.post('/auth/login', values, { headers: { 'content-type': 'application/x-www-form-urlencoded' } }).then((res) => {
            console.log(res);

        }).then((error) => {
            console.error(error);

        })
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
            <Button className="w-full" type="submit">Login</Button>
        </form>

    </Form>
}
function LoginWithEmail() {
    const form = useForm<z.infer<typeof loginWithEmail>>({
        resolver: zodResolver(loginWithEmail),
        defaultValues: {
            email: "",
            password: ''
        },
    })
    function onSubmit(values: z.infer<typeof loginWithEmail>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="lewis@example.com" {...field} />
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
            <Button className="w-full" type="submit">Login</Button>
        </form>
    </Form>
}