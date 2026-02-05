"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";

type PageHeaderProps = {
    title: string;
    description?: string;
    backHref?: string; // optional
    action?: React.ReactNode;
};

export function PageHeader({
    title,
    description,
    backHref,
    action,
}: PageHeaderProps) {
    const router = useRouter();

    const handleBack = () => {
        if (backHref) {
            router.push(backHref);
        } else {
            router.back();
        }
    };

    return (
        <div className="flex items-center justify-between mb-3 mx-2">
            <div className="flex items-center space-x-2">
                <div className="h-5 w-1 rounded-full bg-gradient-to-b from-pink-300 to-red-300" />
                <h1 className="font-bold text-gray-900 text-lg dark:text-white">
                    {title}
                </h1>
            </div>
            <Button
                variant="outline"
                onClick={handleBack}
                className="mt-1"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Button>
            {action && <div className="flex items-center">{action}</div>}
        </div>
    );
}
