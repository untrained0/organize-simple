"use client"

import { useState } from "react"
import MultiSteps from "./multi-steps";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export default function TextRecognitionPipeline() {
    return (
        <div className="mt-8 mx-4">
            <MultiSteps parentStep={1} />
            <Link
                className={cn(buttonVariants(), "mb-4 mx-4")}
                href={"/data-extraction/1"}
            >
                Continue
            </Link>
        </div>
    )
}