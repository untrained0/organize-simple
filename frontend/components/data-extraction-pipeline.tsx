"use client"

import MultiSteps from "./multi-steps";
import { Button, buttonVariants } from "../@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DataExtractionPipeline() {
    return (
        <div className="mt-8 mx-4">
            <MultiSteps parentStep={3}/>
            <Link
                className={cn(buttonVariants(), "mb-4 mx-4")}
                href={"/verification/1"}
            >
                Continue
            </Link>
        </div>
    )
}