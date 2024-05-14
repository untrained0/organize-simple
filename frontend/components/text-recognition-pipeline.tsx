"use client"

import MultiSteps from "./multi-steps";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { FileInfos } from "@/app/(dashboard)/(pipelines)/text-recognition/[uuid]/page";

export default function TextRecognitionPipeline({
    infos,
}: {
    infos: FileInfos;
}) {
    return (
        <div className="h-2/5 flex flex-col mx-4">
            <MultiSteps parentStep={2} />
            <div className="2-xl font-bold mb-4">Text Recognition</div>
            <div className="text-lg mb-4">
                <div className="mb-4">
                    <span className="font-bold">File name:</span> {infos.filename}
                </div>
                <div className="mb-4">
                    <span className="font-bold">File URL:</span> {infos.filename}
                    <a href={infos.url} target="_blank" rel="noreferrer">
                        {infos.url}
                    </a>
                </div>
            </div>
            <Link
                className={cn(buttonVariants(), "mb-4 mx-4")}
                href={`/data-extraction/1/${infos.uuid}`}
            >
                Continue
            </Link>
        </div>
    )
}