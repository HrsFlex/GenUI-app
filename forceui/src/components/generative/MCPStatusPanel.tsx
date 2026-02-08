/**
 * @file components/generative/MCPStatusPanel.tsx
 * @description Mock MCP Status Panel showing simulated integrations for demo
 */

"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import {
    Github,
    Calendar,
    BarChart3,
    CheckCircle2,
    RefreshCw,
    GitCommit,
    GitPullRequest,
    AlertCircle,
    Zap,
    Wifi
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

// Zod schema for MCPStatusPanel props
export const mcpStatusPanelSchema = z.object({
    showDetails: z.boolean().optional().describe("Show detailed status"),
});

type MCPStatusPanelProps = z.infer<typeof mcpStatusPanelSchema>;

// Fake GitHub data
const MOCK_GITHUB_DATA = {
    commits: 47,
    pullRequests: 5,
    issues: 12,
    lastSync: "2 min ago",
    repoName: "forceui/main",
};

// Fake Calendar events
const MOCK_CALENDAR_DATA = [
    { id: 1, title: "Team Standup", time: "10:00 AM", type: "meeting" },
    { id: 2, title: "Sprint Review", time: "2:00 PM", type: "meeting" },
    { id: 3, title: "Deploy to Prod", time: "5:00 PM", type: "task" },
];

// Fake Analytics status
const MOCK_ANALYTICS = {
    activeUsers: "1.2K",
    pageViews: "15.8K",
    conversionRate: "3.4%",
    status: "streaming",
};

export function MCPStatusPanel({ showDetails = true }: MCPStatusPanelProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const toast = useToast();

    const handleRefresh = () => {
        setIsRefreshing(true);
        toast.info("MCP Sync Started", "Fetching latest data from connected services...");

        setTimeout(() => {
            setIsRefreshing(false);
            setLastUpdate(new Date());
            toast.success("MCP Sync Complete", "All services synced successfully");
        }, 1500);
    };

    // Simulate live updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdate(new Date());
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-6 shadow-lg">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <span className="absolute -right-1 -top-1 flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                        </span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">MCP Integrations</h3>
                        <p className="text-sm text-gray-600">
                            <Wifi className="mr-1 inline h-3 w-3 text-green-500" />
                            All services connected
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow disabled:opacity-50"
                >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Syncing...' : 'Sync'}
                </button>
            </div>

            {/* Integration Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                {/* GitHub Integration */}
                <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white">
                                <Github className="h-5 w-5" />
                            </div>
                            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                <CheckCircle2 className="h-3 w-3" />
                                Connected
                            </span>
                        </div>
                        <h4 className="mb-1 font-semibold text-gray-900">GitHub</h4>
                        <p className="mb-4 text-sm text-gray-500 truncate">{MOCK_GITHUB_DATA.repoName}</p>

                        {showDetails && (
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="rounded-lg bg-gray-50 p-2">
                                    <GitCommit className="mx-auto mb-1 h-4 w-4 text-blue-600" />
                                    <p className="text-lg font-bold text-gray-900">{MOCK_GITHUB_DATA.commits}</p>
                                    <p className="text-xs text-gray-500">Commits</p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-2">
                                    <GitPullRequest className="mx-auto mb-1 h-4 w-4 text-purple-600" />
                                    <p className="text-lg font-bold text-gray-900">{MOCK_GITHUB_DATA.pullRequests}</p>
                                    <p className="text-xs text-gray-500">PRs</p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-2">
                                    <AlertCircle className="mx-auto mb-1 h-4 w-4 text-amber-600" />
                                    <p className="text-lg font-bold text-gray-900">{MOCK_GITHUB_DATA.issues}</p>
                                    <p className="text-xs text-gray-500">Issues</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Calendar Integration */}
                <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                <CheckCircle2 className="h-3 w-3" />
                                Connected
                            </span>
                        </div>
                        <h4 className="mb-1 font-semibold text-gray-900">Calendar</h4>
                        <p className="mb-4 text-sm text-gray-500">3 events today</p>

                        {showDetails && (
                            <div className="space-y-2">
                                {MOCK_CALENDAR_DATA.map((event) => (
                                    <div key={event.id} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                                        <span className="text-xs font-medium text-blue-600">{event.time}</span>
                                        <span className="text-sm text-gray-700 truncate">{event.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Analytics API */}
                <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
                                <BarChart3 className="h-5 w-5" />
                            </div>
                            <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                                </span>
                                Streaming
                            </span>
                        </div>
                        <h4 className="mb-1 font-semibold text-gray-900">Analytics API</h4>
                        <p className="mb-4 text-sm text-gray-500">Real-time data</p>

                        {showDetails && (
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="rounded-lg bg-gray-50 p-2">
                                    <p className="text-lg font-bold text-emerald-600">{MOCK_ANALYTICS.activeUsers}</p>
                                    <p className="text-xs text-gray-500">Users</p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-2">
                                    <p className="text-lg font-bold text-blue-600">{MOCK_ANALYTICS.pageViews}</p>
                                    <p className="text-xs text-gray-500">Views</p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-2">
                                    <p className="text-lg font-bold text-purple-600">{MOCK_ANALYTICS.conversionRate}</p>
                                    <p className="text-xs text-gray-500">Conv.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Last synced: {lastUpdate.toLocaleTimeString()}</span>
                <span className="flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    All systems operational
                </span>
            </div>
        </div>
    );
}
