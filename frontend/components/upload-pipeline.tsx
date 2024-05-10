"use client"

import { useState } from "react"
import MultiSteps from "./multi-steps";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Switch } from "./ui/switch";
import { HelpTooltip } from "./ui/help-tooltip";
import { Label } from "./ui/label";
import Balancer from "react-wrap-balancer";
import { Dropzone } from "./dropzone";

export default function UploadPipeline() {
    const [status, setStatus] = useState("active");


    return (
        <div className="flex flex-col mx-4 h-2/5">
            <MultiSteps parentStep={1} parentStatus={status} />
            <div className="flex flex-col mx-4 h-2/5">
                <Dropzone className="mt-4 mb-8"/>
            </div>
            {/* <Button onClick={() => setStatus("complete")}>
                Process End
            </Button>
            <Link
                className={cn(buttonVariants(), "mb-4 mx-4")}
                href={"/text-recognition/1"}
            >
                Continue
            </Link> */}
        </div>
    )
}