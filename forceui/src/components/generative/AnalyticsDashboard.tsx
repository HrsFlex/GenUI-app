/**
 * @file components/generative/AnalyticsDashboard.tsx
 * @description Analytics dashboard showing MCP impact and system metrics
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Activity,
    TrendingUp,
    TrendingDown,
    Users,
    Zap,
    Clock,
    Database,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    GitBranch,
    MessageSquare,
    Brain,
    X
} from "lucide-react";

interface AnalyticsDashboardProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock data for analytics
const MOCK_METRICS = {
    totalInteractions: 15847,
    avgResponseTime: 42,
    mcpCalls: 8923,
    componentsRendered: 4521,
    userSatisfaction: 94.2,
    costSavings: 67,
};

const MOCK_CHART_DATA = [
    { name: "Mon", value: 1200, mcp: 800 },
    { name: "Tue", value: 1800, mcp: 1200 },
    { name: "Wed", value: 2100, mcp: 1400 },
    { name: "Thu", value: 1900, mcp: 1300 },
    { name: "Fri", value: 2400, mcp: 1800 },
    { name: "Sat", value: 1600, mcp: 1100 },
    { name: "Sun", value: 2000, mcp: 1500 },
];

const MOCK_ACTIVITIES = [
    { id: 1, action: "GitHub PR #247 merged", time: "2 min ago", type: "github" },
    { id: 2, action: "Calendar sync completed", time: "5 min ago", type: "calendar" },
    { id: 3, action: "Analytics report generated", time: "12 min ago", type: "analytics" },
    { id: 4, action: "User switched to Developer mode", time: "18 min ago", type: "persona" },
    { id: 5, action: "KanbanBoard component rendered", time: "23 min ago", type: "ui" },
];

export function AnalyticsDashboard({ isOpen, onClose }: AnalyticsDashboardProps) {
    const [animatedMetrics, setAnimatedMetrics] = useState({
        totalInteractions: 0,
        avgResponseTime: 0,
        mcpCalls: 0,
        componentsRendered: 0,
    });

    // Animate metrics on open
    useEffect(() => {
        if (isOpen) {
            const duration = 1500;
            const steps = 30;
            const interval = duration / steps;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                const progress = step / steps;
                setAnimatedMetrics({
                    totalInteractions: Math.floor(MOCK_METRICS.totalInteractions * progress),
                    avgResponseTime: Math.floor(MOCK_METRICS.avgResponseTime * progress),
                    mcpCalls: Math.floor(MOCK_METRICS.mcpCalls * progress),
                    componentsRendered: Math.floor(MOCK_METRICS.componentsRendered * progress),
                });
                if (step >= steps) clearInterval(timer);
            }, interval);

            return () => clearInterval(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const maxValue = Math.max(...MOCK_CHART_DATA.map(d => d.value));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                            <Activity className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">MCP Analytics Dashboard</h2>
                            <p className="text-sm text-white/80">Real-time impact metrics and system health</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white transition-all hover:bg-white/30"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Key Metrics */}
                    <div className="grid gap-4 md:grid-cols-4 mb-6">
                        <MetricCard
                            icon={MessageSquare}
                            label="Total Interactions"
                            value={animatedMetrics.totalInteractions.toLocaleString()}
                            change="+23.5%"
                            positive={true}
                            color="bg-blue-500"
                        />
                        <MetricCard
                            icon={Clock}
                            label="Avg Response Time"
                            value={`${animatedMetrics.avgResponseTime}ms`}
                            change="-15.2%"
                            positive={true}
                            color="bg-emerald-500"
                        />
                        <MetricCard
                            icon={Zap}
                            label="MCP API Calls"
                            value={animatedMetrics.mcpCalls.toLocaleString()}
                            change="+42.8%"
                            positive={true}
                            color="bg-purple-500"
                        />
                        <MetricCard
                            icon={Sparkles}
                            label="Components Rendered"
                            value={animatedMetrics.componentsRendered.toLocaleString()}
                            change="+31.2%"
                            positive={true}
                            color="bg-amber-500"
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid gap-6 md:grid-cols-2 mb-6">
                        {/* Weekly Activity Chart */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5">
                            <h3 className="mb-4 font-semibold text-gray-900">Weekly Activity</h3>
                            <div className="flex items-end gap-2 h-40">
                                {MOCK_CHART_DATA.map((day, i) => (
                                    <div key={day.name} className="flex-1 flex flex-col items-center gap-1">
                                        <div className="w-full flex flex-col gap-0.5">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(day.value / maxValue) * 100}%` }}
                                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                                className="w-full rounded-t bg-indigo-200"
                                                style={{ minHeight: 4 }}
                                            />
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(day.mcp / maxValue) * 100}%` }}
                                                transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                                                className="w-full rounded-b bg-indigo-600"
                                                style={{ minHeight: 4 }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500">{day.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-indigo-200" />
                                    <span className="text-gray-600">Total Requests</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-indigo-600" />
                                    <span className="text-gray-600">MCP Requests</span>
                                </div>
                            </div>
                        </div>

                        {/* MCP Impact */}
                        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
                            <h3 className="mb-4 font-semibold text-gray-900">MCP Impact Analysis</h3>
                            <div className="space-y-4">
                                <ImpactRow
                                    label="User Satisfaction"
                                    value={MOCK_METRICS.userSatisfaction}
                                    suffix="%"
                                    color="bg-emerald-500"
                                />
                                <ImpactRow
                                    label="Cost Reduction"
                                    value={MOCK_METRICS.costSavings}
                                    suffix="%"
                                    color="bg-blue-500"
                                />
                                <ImpactRow
                                    label="Automation Rate"
                                    value={78}
                                    suffix="%"
                                    color="bg-purple-500"
                                />
                                <ImpactRow
                                    label="Error Rate"
                                    value={2.1}
                                    suffix="%"
                                    color="bg-red-400"
                                    inverted
                                />
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h3 className="mb-4 font-semibold text-gray-900">Recent MCP Activity</h3>
                        <div className="space-y-3">
                            {MOCK_ACTIVITIES.map((activity, i) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                                >
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${activity.type === "github" ? "bg-gray-900 text-white" :
                                            activity.type === "calendar" ? "bg-blue-600 text-white" :
                                                activity.type === "analytics" ? "bg-emerald-600 text-white" :
                                                    activity.type === "persona" ? "bg-purple-600 text-white" :
                                                        "bg-indigo-600 text-white"
                                        }`}>
                                        {activity.type === "github" && <GitBranch className="h-4 w-4" />}
                                        {activity.type === "calendar" && <Clock className="h-4 w-4" />}
                                        {activity.type === "analytics" && <BarChart3 className="h-4 w-4" />}
                                        {activity.type === "persona" && <Users className="h-4 w-4" />}
                                        {activity.type === "ui" && <Sparkles className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function MetricCard({ icon: Icon, label, value, change, positive, color }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    change: string;
    positive: boolean;
    color: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-gray-200 bg-white p-4"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color} text-white`}>
                    <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm text-gray-600">{label}</span>
            </div>
            <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <div className={`flex items-center gap-1 text-sm ${positive ? "text-emerald-600" : "text-red-600"}`}>
                    {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    <span>{change}</span>
                </div>
            </div>
        </motion.div>
    );
}

function ImpactRow({ label, value, suffix, color, inverted = false }: {
    label: string;
    value: number;
    suffix: string;
    color: string;
    inverted?: boolean;
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-700">{label}</span>
                <span className={`text-sm font-semibold ${inverted ? "text-red-600" : "text-gray-900"}`}>
                    {value}{suffix}
                </span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(value, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
        </div>
    );
}
