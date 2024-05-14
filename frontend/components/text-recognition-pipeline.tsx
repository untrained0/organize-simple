
import MultiSteps from "./multi-steps";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { headers } from "next/headers";

async function getS3ObjectUrl(uuid: string) {
    const res = await fetch(`http://localhost:3001/api/signed-url?uuid=${uuid}`, {
        method: "GET",
        headers: {
            Cookie: headers().get("cookie") || "",
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getText(url: string) {
    const res = await fetch("http://localhost:3001/api/text-recognition", {
        method: "POST",
        headers: {
            Cookie: headers().get("cookie") || "",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch text");
    }

    return res.json();
}

export default async function TextRecognitionPipeline({
    uuid,
}: {
    uuid: string;
}) {
    const {url, filename} = await getS3ObjectUrl(uuid);
    const {text} = await getText(url);
    return (
        <div className="h-2/5 flex flex-col mx-4">
            <MultiSteps parentStep={2} />
            <div className="2-xl font-bold mb-4">Text Recognition</div>
            <div className="text-lg mb-4">
                <div className="mb-4">
                    <span className="font-bold">File name:</span> {filename}
                </div>
                <div className="mb-4">
                    <span className="font-bold">File URL:</span>
                    <a href={url} target="_blank" rel="noreferrer">
                        {url}
                    </a>
                </div>
                <div className="mb-4">
                    <span className="font-bold">Text:</span>
                     {text}
                </div>
            </div>
            <Link
                className={cn(buttonVariants(), "mb-4 mx-4")}
                href={`/data-extraction/1/${uuid}`}
            >
                Continue
            </Link>
        </div>
    )
}