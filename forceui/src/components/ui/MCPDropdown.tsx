/**
 * @file components/ui/MCPDropdown.tsx
 * @description Interactive MCP status dropdown for navbar with live backend simulation
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Calendar,
    BarChart3,
    CheckCircle2,
    RefreshCw,
    Wifi,
    WifiOff,
    Zap,
    Clock,
    Activity,
    Database,
    ChevronDown,
    ExternalLink,
    Settings,
    MessageSquare
} from "lucide-react";
import { useToast } from "./Toast";

interface MCPService {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    status: "connected" | "syncing" | "error";
    lastSync: string;
    requests: number;
    color: string;
}

const MOCK_SERVICES: MCPService[] = [
    {
        id: "github",
        name: "GitHub MCP",
        icon: Github,
        status: "connected",
        lastSync: "Just now",
        requests: 1247,
        color: "bg-gray-900"
    },
    {
        id: "calendar",
        name: "Calendar MCP",
        icon: Calendar,
        status: "connected",
        lastSync: "2 min ago",
        requests: 892,
        color: "bg-blue-600"
    },
    {
        id: "analytics",
        name: "Analytics MCP",
        icon: BarChart3,
        status: "syncing",
        lastSync: "Syncing...",
        requests: 3421,
        color: "bg-emerald-600"
    }
];

interface MCPDropdownProps {
    onOpenAnalytics?: () => void;
    onOpenChat?: () => void;
}

export function MCPDropdown({ onOpenAnalytics, onOpenChat }: MCPDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [services, setServices] = useState(MOCK_SERVICES);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toast = useToast();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRefreshAll = async () => {
        setIsRefreshing(true);
        toast.info("MCP Sync", "Refreshing all connected services...");

        // Simulate refresh with staged toasts
        await new Promise(r => setTimeout(r, 800));
        toast.info("GitHub MCP", "Fetching latest commits and PRs...");

        await new Promise(r => setTimeout(r, 600));
        toast.info("Calendar MCP", "Syncing calendar events...");

        await new Promise(r => setTimeout(r, 700));
        toast.info("Analytics MCP", "Pulling real-time metrics...");

        await new Promise(r => setTimeout(r, 500));
        setServices(prev => prev.map(s => ({ ...s, lastSync: "Just now", status: "connected" as const })));
        setIsRefreshing(false);
        toast.success("Sync Complete", "All MCP services refreshed successfully");
    };

    const totalRequests = services.reduce((acc, s) => acc + s.requests, 0);
    const connectedCount = services.filter(s => s.status === "connected").length;

    return (
        <div ref={dropdownRef} className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 px-3 py-1.5 shadow-sm transition-all hover:shadow-md hover:from-emerald-200 hover:to-teal-200"
            >
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-emerald-700">MCP Connected</span>
                <ChevronDown className={`h-3 w-3 text-emerald-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-xl z-50"
                    >
                        {/* Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                                    <Zap className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">MCP Status</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{connectedCount}/{services.length} services online</p>
                                </div>
                            </div>
                            <button
                                onClick={handleRefreshAll}
                                disabled={isRefreshing}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
                            >
                                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            </button>
                        </div>

                        {/* Services List */}
                        <div className="space-y-2 mb-4">
                            {services.map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3 rounded-lg bg-gray-50 dark:bg-gray-800 p-3 transition-all hover:bg-gray-100 dark:hover:bg-gray-750"
                                    >
                                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${service.color} text-white`}>
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{service.name}</p>
                                                {service.status === "connected" && (
                                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                                )}
                                                {service.status === "syncing" && (
                                                    <RefreshCw className="h-3 w-3 text-blue-500 animate-spin" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="h-3 w-3" />
                                                <span>{service.lastSync}</span>
                                                <span className="text-gray-300">•</span>
                                                <span>{service.requests.toLocaleString()} requests</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50">
                            <div className="text-center">
                                <p className="text-lg font-bold text-indigo-600">{totalRequests.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Total Requests</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-emerald-600">99.9%</p>
                                <p className="text-xs text-gray-500">Uptime</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-purple-600">42ms</p>
                                <p className="text-xs text-gray-500">Avg Latency</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    onOpenAnalytics?.();
                                    setIsOpen(false);
                                }}
                                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700"
                            >
                                <Activity className="h-4 w-4" />
                                Analytics
                            </button>
                            <button
                                onClick={() => {
                                    onOpenChat?.();
                                    setIsOpen(false);
                                }}
                                className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200"
                            >
                                <MessageSquare className="h-4 w-4" />
                                /chat
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
