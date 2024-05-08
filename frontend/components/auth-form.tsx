"use client"

import { authSchema } from "@/lib/validations/auth"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../@/components/ui/label"
import { Button } from "../@/components/ui/button"
import { buttonVariants } from "../@/components/ui/button"
import { Icons } from "./icons"
import { Input } from "../@/components/ui/input"
import { signIn } from "next-auth/react"
import { toast } from "../@/components/ui/use-toast"
import { useRouter } from "next/navigation"


interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type formData = z.infer<typeof authSchema>

export function AuthForm({ className, ...props }: AuthFormProps) {

    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>({
        resolver: zodResolver(authSchema),
    });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = (data: FormData) => {
        setIsLoading(true);

        const signInResult = await signIn("credentials", {
            username: data.username.toLowerCase(),
            password: data.password,
            redirect: false,
        });

        if(!signInResult?.ok){
            return toast({
                title: "Something went wrong",
                description: "Your sign in request failed. Please try again!",
                variant: "destructive",
            });
        }

        router.refresh();
        router.push("/dashboard");
    }

    return <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
                <div className="grid gap-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Username"
                        autoCapitalize="none"
                        autoComplete="text"
                        autoCorrect="off"
                        disabled={isLoading}
                        style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}
                        {...register("username")}
                    />
                    {errors?.username && (<p className="text-red-500 text-xs px-1">{errors.username.message}</p>)}
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}
                        {...register("password")}
                    />
                    {errors?.password && (<p className="text-red-500 text-xs px-1">{errors.password.message}</p>)}
                </div>
                <Button className={cn("mt-2", buttonVariants({
                    vaiant: "default",
                    size: "default",
                }))}
                    disabled={isLoading}>
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin"></Icons.spinner>}
                    Sign in
                </Button>
            </div>
        </form>
    </div>;
}