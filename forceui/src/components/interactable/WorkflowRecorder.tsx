/**
 * @file components/interactable/WorkflowRecorder.tsx
 * @description Mock Workflow Recorder component for demo - shows workflow recording concept
 */

"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import {
    Circle,
    Square,
    Play,
    Clock,
    MousePointer2,
    MessageSquare,
    Zap,
    RotateCcw,
    Sparkles
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

// Zod schema for WorkflowRecorder props
export const workflowRecorderSchema = z.object({
    title: z.string().optional().describe("Recorder title"),
});

type WorkflowRecorderProps = z.infer<typeof workflowRecorderSchema>;

// Fake recorded actions for demo
const DEMO_ACTIONS = [
    { id: 1, type: "intent", action: 'Said: "Show me project tasks"', time: "0:05", icon: MessageSquare },
    { id: 2, type: "ui", action: "KanbanBoard rendered", time: "0:06", icon: Zap },
    { id: 3, type: "click", action: 'Clicked "Add task" button', time: "0:12", icon: MousePointer2 },
    { id: 4, type: "intent", action: 'Said: "Switch to developer mode"', time: "0:18", icon: MessageSquare },
    { id: 5, type: "ui", action: "UI adapted for developer persona", time: "0:19", icon: Zap },
    { id: 6, type: "intent", action: 'Said: "Show code metrics"', time: "0:25", icon: MessageSquare },
    { id: 7, type: "ui", action: "ChartView + StatsCard rendered", time: "0:26", icon: Zap },
];

export function WorkflowRecorder({ title = "Workflow Recorder" }: WorkflowRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [actions, setActions] = useState<typeof DEMO_ACTIONS>([]);
    const [playbackIndex, setPlaybackIndex] = useState(-1);
    const toast = useToast();

    // Recording timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime(prev => prev + 1);
                // Simulate adding actions during recording
                if (recordingTime > 0 && recordingTime % 5 === 0 && actions.length < DEMO_ACTIONS.length) {
                    setActions(prev => [...prev, DEMO_ACTIONS[prev.length]]);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRecording, recordingTime, actions.length]);

    // Playback animation
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && playbackIndex < actions.length - 1) {
            interval = setInterval(() => {
                setPlaybackIndex(prev => prev + 1);
            }, 800);
        } else if (playbackIndex >= actions.length - 1) {
            setIsPlaying(false);
            setTimeout(() => setPlaybackIndex(-1), 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, playbackIndex, actions.length]);

    const handleStartRecording = () => {
        setIsRecording(true);
        setRecordingTime(0);
        setActions([]);
        setPlaybackIndex(-1);
        toast.launch("Recording Started", "Capturing your workflow actions...");
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        // Fill with demo actions
        setActions(DEMO_ACTIONS);
        toast.success("Recording Saved", `Captured ${DEMO_ACTIONS.length} workflow actions`);
    };

    const handlePlayback = () => {
        if (actions.length === 0) return;
        setIsPlaying(true);
        setPlaybackIndex(0);
        toast.action("Replaying Workflow", "Executing recorded actions...");
    };

    const handleReset = () => {
        setIsRecording(false);
        setIsPlaying(false);
        setRecordingTime(0);
        setActions([]);
        setPlaybackIndex(-1);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-lg transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-br from-amber-500 to-orange-600'}`}>
                            {isRecording ? (
                                <Circle className="h-5 w-5 text-white fill-white animate-pulse" />
                            ) : (
                                <Sparkles className="h-5 w-5 text-white" />
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-600">
                            {isRecording ? (
                                <span className="flex items-center gap-1 text-red-600">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                                    </span>
                                    Recording... {formatTime(recordingTime)}
                                </span>
                            ) : (
                                "Capture and replay your workflows"
                            )}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-mono text-gray-600">{formatTime(recordingTime)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="mb-6 flex items-center gap-3">
                {!isRecording ? (
                    <button
                        onClick={handleStartRecording}
                        className="flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-500/25 transition-all hover:bg-red-600 hover:shadow-red-500/40 hover:-translate-y-0.5"
                    >
                        <Circle className="h-4 w-4 fill-current" />
                        Start Recording
                    </button>
                ) : (
                    <button
                        onClick={handleStopRecording}
                        className="flex items-center gap-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-gray-900 hover:-translate-y-0.5"
                    >
                        <Square className="h-4 w-4 fill-current" />
                        Stop Recording
                    </button>
                )}

                <button
                    onClick={handlePlayback}
                    disabled={actions.length === 0 || isRecording || isPlaying}
                    className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
                >
                    <Play className="h-4 w-4 fill-current" />
                    {isPlaying ? 'Playing...' : 'Replay'}
                </button>

                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-300"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </button>
            </div>

            {/* Recorded Actions */}
            <div className="rounded-lg border border-amber-200 bg-white/80 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">
                    Recorded Actions ({actions.length})
                </h4>

                {actions.length === 0 ? (
                    <div className="py-8 text-center">
                        <MousePointer2 className="mx-auto mb-3 h-8 w-8 text-amber-400 opacity-50" />
                        <p className="text-sm text-gray-500">
                            {isRecording ? "Actions will appear here as you work..." : "Start recording to capture your workflow"}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {actions.map((action, index) => {
                            const Icon = action.icon;
                            const isActive = playbackIndex === index;
                            return (
                                <div
                                    key={action.id}
                                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-300 ${isActive
                                        ? 'border-emerald-400 bg-emerald-50 scale-[1.02] shadow-md'
                                        : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${action.type === 'intent' ? 'bg-blue-100 text-blue-600' :
                                        action.type === 'ui' ? 'bg-purple-100 text-purple-600' :
                                            'bg-amber-100 text-amber-600'
                                        }`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{action.action}</p>
                                    </div>
                                    <span className="text-xs font-mono text-gray-500">{action.time}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Suggestion */}
            {actions.length > 0 && !isRecording && !isPlaying && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-800">
                    <Sparkles className="h-4 w-4 flex-shrink-0" />
                    <span>
                        <strong>AI Suggestion:</strong> You often create tasks after viewing the dashboard.
                        Want me to automate this?
                    </span>
                </div>
            )}
        </div>
    );
}
