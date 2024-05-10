"use client"

import { useState } from "react"
import MultiSteps from "./multi-steps";
import { Button, buttonVariants } from "../@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UploadPipeline() {
    const [status, setStatus] = useState("active");

    return (
        <div className="mt-8 mx-4">
            <MultiSteps parentStep={1} parentStatus={status} />
            <Button onClick={() => setStatus("complete")}>
                Process End
            </Button>
            <Link
                className={cn(buttonVariants(), "mb-4 mx-4")}
                href={"/text-recognition/1"}
            >
                Continue
            </Link>
        </div>
    )
}