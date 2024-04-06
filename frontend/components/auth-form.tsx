"use client"

import { authSchema } from "@/lib/validations/auth"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "./icons"


interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type formData = z.infer<typeof authSchema>

export function AuthForm({ className, ...props }: AuthFormProps) {

    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>({
        resolver: zodResolver(authSchema),
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data: FormData) => {

    }

    return <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
                <div className="grid gap-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" placeholder="Username" autoCapitalize="none" autoComplete="text" autoCorrect="off" disabled={isLoading} {...register("username")} />
                    {errors?.username && (<p className="text-red-500 text-xs px-1">{errors.username.message}</p>)}
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="text" autoCapitalize="none" autoCorrect="off" disabled={isLoading} {...register("password")} />
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