import { BottomSection } from "@/components/bottom-section";
import { NavItem, NavSection, NavSectionItems } from "@/components/nav-section";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const pipelines: NavSectionItems = {
    label: "Pipelines",
    icon: "layers",
    items: [
        {
            label: "Text Recognition",
            href: "/text-recognition",
            icon: "textSelect",
        },
        {
            label: "Data Extraction",
            href: "/data-extraction",
            icon: "braces",
        },
        {
            label: "Verfication",
            href: "/verification",
            icon: "checkCircle",
        },
    ],
}

const organizeData: NavSectionItems = {
    label: "Organized Data",
    icon: "grid",
    items: [
        {
            label: "Receipts",
            href: "/receipts",
            icon: "receipt",
        },
        {
            label: "Invoices",
            href: "/invoices",
            icon: "invoice",
        },
        {
            label: "Card Statements",
            href: "/card-statements",
            icon: "creditCard",
        },
    ],
}

const bottomItems: NavItem[] = [
    {
        label: "Help",
        href: "/help",
        icon: "help",
    },
    {
        label: "Settings",
        href: "/settings",
        icon: "settings",
    },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen flex">
            {/* SlideBarNav */}
            <div className="flex flex-col fixed z-50 inset-y-0 w-72">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r-2 border-slate-200 bg-white pl-8 pr-6 pb-4">
                    {/* Logo */}
                    <Link href="/dashboard">
                        <Image className="flex mt-8 shrink-0" priority src="/logo.png" width={102} height={38} alt="Organise Simple Logo" />
                    </Link>
                    {/* Navigation */}
                    <nav className="flex flex-1 flex-col">
                        <NavSection className="mt-20" section={pipelines} />
                        <NavSection className="mt-10" section={organizeData} />
                        <div className="flex flex-1 flex-col gap-y-7">
                            <BottomSection className="mt-auto" username="Soham" items={bottomItems} />
                        </div>
                    </nav>
                </div>
            </div>
            {/* Main */}
            <main className="pl-72 w-full">{children}</main>
        </div>
    );
}