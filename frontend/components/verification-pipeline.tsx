"use client"

import { useState } from "react"
import MultiSteps from "./multi-steps";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";

export default function VerificationPipeline() {
    const [status, setStatus] = useState("active");

    return (
        <div className="mt-8 mx-4">
            <MultiSteps parentStep={4} parentStatus={status} />
            <Button onClick={() => setStatus("complete")}>
                Process End
            </Button>
            <Link
                className={cn(buttonVariants(), "mb-4 mx-4")}
                href={"/dashboard"}
            >
                Confirm
            </Link>
        </div>
    )
}