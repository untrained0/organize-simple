"use client"

import { useEffect, useState } from "react";
import { Step, StepType } from "./ui/step"


export default function MultiSteps({ parentStep, parentStatus = "active", }: { parentStep: number; parentStatus?: string; }) {
    const steps: StepType[] = [
        { number: 1, title: "Upload" },
        { number: 2, title: "Text Recognition" },
        { number: 3, title: "Data Extraction" },
        { number: 4, title: "Verification" },
    ];

    const [currentStep, setCurrentStep] = useState(parentStep);
    const [status, setStatus] = useState(parentStatus);

    useEffect(() => {
        setCurrentStep(parentStep);
        setStatus(parentStatus);
    }, [parentStep,, parentStatus]);

    return (
        <div className="flex justify-center gap-10 py-6">
            <div
                className="bg-slate-200 h-1 absolute mt-5 -z-10"
                style={{ width: "355px" }}
            ></div>
            {steps.map((step) => (
                <Step key={step.number} step={step} current={currentStep} status={status} />
            ))}
        </div>
    );
}