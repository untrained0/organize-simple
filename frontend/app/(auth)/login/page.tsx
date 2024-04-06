import { AuthForm } from "@/components/auth-form";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Next.js Prisma Postgres Auth Starter",
  //   description: "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.",
  // },
  // metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  // themeColor: "#FFF",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen items-center justify-center flex-col">
      <div className="mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col text-center">
          {/* <Link href="/"> */}
            <Image
              src="/logo.png"
              priority
              alt="Organise-Simple Logo"
              className="mx-auto"
              width={250}
              height={50}
            />
            <h1 className="text-2xl mt-8 font-semibold tracking-light">
              Welcome Back
            </h1>
          {/* </Link> */}
        </div>
        <AuthForm /> 
      </div>
    </div>
  );
}
