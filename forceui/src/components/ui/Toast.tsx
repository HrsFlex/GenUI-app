/**
 * @file components/ui/Toast.tsx
 * @description Beautiful toast notification system with animations
 */

"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X, Sparkles, Zap, Rocket } from "lucide-react";

// Toast types with their icons and colors
const TOAST_TYPES = {
    success: {
        icon: CheckCircle,
        bgColor: "bg-gradient-to-r from-emerald-50 to-teal-50",
        borderColor: "border-emerald-200",
        iconColor: "text-emerald-500",
        titleColor: "text-emerald-900",
        textColor: "text-emerald-700",
    },
    error: {
        icon: XCircle,
        bgColor: "bg-gradient-to-r from-red-50 to-rose-50",
        borderColor: "border-red-200",
        iconColor: "text-red-500",
        titleColor: "text-red-900",
        textColor: "text-red-700",
    },
    info: {
        icon: Info,
        bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
        borderColor: "border-blue-200",
        iconColor: "text-blue-500",
        titleColor: "text-blue-900",
        textColor: "text-blue-700",
    },
    warning: {
        icon: AlertTriangle,
        bgColor: "bg-gradient-to-r from-amber-50 to-yellow-50",
        borderColor: "border-amber-200",
        iconColor: "text-amber-500",
        titleColor: "text-amber-900",
        textColor: "text-amber-700",
    },
    magic: {
        icon: Sparkles,
        bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
        borderColor: "border-purple-200",
        iconColor: "text-purple-500",
        titleColor: "text-purple-900",
        textColor: "text-purple-700",
    },
    action: {
        icon: Zap,
        bgColor: "bg-gradient-to-r from-indigo-50 to-violet-50",
        borderColor: "border-indigo-200",
        iconColor: "text-indigo-500",
        titleColor: "text-indigo-900",
        textColor: "text-indigo-700",
    },
    launch: {
        icon: Rocket,
        bgColor: "bg-gradient-to-r from-cyan-50 to-blue-50",
        borderColor: "border-cyan-200",
        iconColor: "text-cyan-500",
        titleColor: "text-cyan-900",
        textColor: "text-cyan-700",
    },
};

type ToastType = keyof typeof TOAST_TYPES;

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    magic: (title: string, message?: string) => void;
    action: (title: string, message?: string) => void;
    launch: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, "id">) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newToast = { ...toast, id };

        setToasts((prev) => [...prev, newToast]);

        // Auto-remove after duration (default 4 seconds)
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, toast.duration || 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // Helper functions for common toast types
    const success = useCallback((title: string, message?: string) => {
        addToast({ type: "success", title, message });
    }, [addToast]);

    const error = useCallback((title: string, message?: string) => {
        addToast({ type: "error", title, message });
    }, [addToast]);

    const info = useCallback((title: string, message?: string) => {
        addToast({ type: "info", title, message });
    }, [addToast]);

    const warning = useCallback((title: string, message?: string) => {
        addToast({ type: "warning", title, message });
    }, [addToast]);

    const magic = useCallback((title: string, message?: string) => {
        addToast({ type: "magic", title, message });
    }, [addToast]);

    const action = useCallback((title: string, message?: string) => {
        addToast({ type: "action", title, message });
    }, [addToast]);

    const launch = useCallback((title: string, message?: string) => {
        addToast({ type: "launch", title, message });
    }, [addToast]);

    return (
        <ToastContext.Provider
            value={{ toasts, addToast, removeToast, success, error, info, warning, magic, action, launch }}
        >
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
                ))}
            </AnimatePresence>
        </div>
    );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
    const config = TOAST_TYPES[toast.type];
    const Icon = config.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`
                relative overflow-hidden rounded-xl border shadow-lg backdrop-blur-sm
                ${config.bgColor} ${config.borderColor}
                p-4 min-w-[320px] max-w-md
            `}
        >
            {/* Animated gradient border effect */}
            <motion.div
                className="absolute inset-0 opacity-30"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                    backgroundSize: "200% 100%",
                }}
            />

            <div className="relative flex items-start gap-3">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
                    className={`flex-shrink-0 ${config.iconColor}`}
                >
                    <Icon className="h-5 w-5" />
                </motion.div>

                <div className="flex-1 min-w-0">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`font-semibold text-sm ${config.titleColor}`}
                    >
                        {toast.title}
                    </motion.p>
                    {toast.message && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`mt-1 text-sm ${config.textColor}`}
                        >
                            {toast.message}
                        </motion.p>
                    )}
                </div>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => onRemove(toast.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="h-4 w-4" />
                </motion.button>
            </div>

            {/* Progress bar */}
            <motion.div
                className={`absolute bottom-0 left-0 h-1 ${config.iconColor.replace("text-", "bg-")} opacity-40`}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: (toast.duration || 4000) / 1000, ease: "linear" }}
            />
        </motion.div>
    );
}
