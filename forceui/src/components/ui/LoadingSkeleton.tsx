/**
 * @file components/ui/LoadingSkeleton.tsx
 * @description Loading skeleton component for smooth loading states
 */

"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular" | "card";
    width?: string | number;
    height?: string | number;
    count?: number;
}

export function Skeleton({
    className,
    variant = "rectangular",
    width,
    height,
    count = 1,
}: SkeletonProps) {
    const baseClasses = "animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]";

    const variantClasses = {
        text: "h-4 rounded",
        circular: "rounded-full",
        rectangular: "rounded-lg",
        card: "rounded-xl",
    };

    const style: React.CSSProperties = {
        width: width || "100%",
        height: height || (variant === "text" ? "1rem" : "auto"),
    };

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={cn(baseClasses, variantClasses[variant], className)}
                    style={style}
                />
            ))}
        </>
    );
}

// Loading skeleton for component cards
export function ComponentSkeleton() {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Skeleton variant="text" className="mb-4 w-1/3" height={24} />
            <Skeleton variant="text" className="mb-2" />
            <Skeleton variant="text" className="mb-2 w-4/5" />
            <Skeleton variant="text" className="w-2/3" />
            <div className="mt-6 flex gap-4">
                <Skeleton variant="rectangular" width={100} height={36} />
                <Skeleton variant="rectangular" width={100} height={36} />
            </div>
        </div>
    );
}

// Loading skeleton for stats
export function StatsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-white p-6">
                    <Skeleton variant="text" className="mb-2 w-1/2" />
                    <Skeleton variant="text" height={32} className="mb-1 w-2/3" />
                    <Skeleton variant="text" className="w-1/3" />
                </div>
            ))}
        </div>
    );
}

// Full page loading skeleton
export function PageSkeleton() {
    return (
        <div className="space-y-8 p-6">
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Skeleton variant="circular" width={48} height={48} />
                    <div>
                        <Skeleton variant="text" width={150} height={24} />
                        <Skeleton variant="text" width={200} height={16} className="mt-1" />
                    </div>
                </div>
                <Skeleton variant="rectangular" width={120} height={40} />
            </div>

            {/* Intent chat skeleton */}
            <Skeleton variant="rectangular" height={64} className="rounded-full" />

            {/* Components skeleton */}
            <div className="grid gap-6 md:grid-cols-2">
                <ComponentSkeleton />
                <ComponentSkeleton />
            </div>
        </div>
    );
}
