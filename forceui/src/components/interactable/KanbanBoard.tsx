/**
 * @file components/interactable/KanbanBoard.tsx
 * @description Kanban board for task management with drag-and-drop
 */

"use client";

import { useState } from "react";
import { z } from "zod";
import { GripVertical, Plus, X } from "lucide-react";

// Zod schema for KanbanBoard props
export const kanbanBoardSchema = z.object({
    title: z.string().optional().describe("Board title"),
    columns: z.array(z.string()).describe("Column names"),
    initialTasks: z
        .array(
            z.object({
                id: z.string(),
                title: z.string(),
                column: z.string(),
                description: z.string().optional(),
            })
        )
        .optional()
        .describe("Initial tasks"),
});

type KanbanBoardProps = z.infer<typeof kanbanBoardSchema>;

interface Task {
    id: string;
    title: string;
    column: string;
    description?: string;
}

export function KanbanBoard({
    title = "Task Board",
    columns,
    initialTasks = [],
}: KanbanBoardProps) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [newTaskColumn, setNewTaskColumn] = useState<string | null>(null);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const getTasksForColumn = (column: string) =>
        tasks.filter((task) => task.column === column);

    const handleAddTask = (column: string) => {
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: `task-${Date.now()}`,
            title: newTaskTitle,
            column,
        };

        setTasks([...tasks, newTask]);
        setNewTaskTitle("");
        setNewTaskColumn(null);
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
    };

    const handleMoveTask = (taskId: string, newColumn: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, column: newColumn } : task
            )
        );
    };

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold text-gray-900">{title}</h3>

            <div className="flex gap-4 overflow-x-auto pb-2">
                {columns.map((column) => (
                    <div key={column} className="flex flex-col min-w-[280px] flex-1">
                        {/* Column Header */}
                        <div className="mb-3 flex items-center justify-between rounded-t-lg bg-gray-100 px-4 py-3">
                            <h4 className="font-medium text-gray-700">{column}</h4>
                            <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600">
                                {getTasksForColumn(column).length}
                            </span>
                        </div>

                        {/* Tasks */}
                        <div className="min-h-[200px] space-y-2 rounded-b-lg bg-gray-50 p-3">
                            {getTasksForColumn(column).map((task) => (
                                <div
                                    key={task.id}
                                    className="group relative rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="flex items-start gap-2">
                                        <GripVertical className="h-4 w-4 flex-shrink-0 text-gray-400" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                {task.title}
                                            </p>
                                            {task.description && (
                                                <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                                                    {task.description}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                                        </button>
                                    </div>

                                    {/* Quick move buttons */}
                                    <div className="mt-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                        {columns
                                            .filter((col) => col !== column)
                                            .map((targetColumn) => (
                                                <button
                                                    key={targetColumn}
                                                    onClick={() => handleMoveTask(task.id, targetColumn)}
                                                    className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200"
                                                >
                                                    → {targetColumn}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            ))}

                            {/* Add Task Button/Form */}
                            {newTaskColumn === column ? (
                                <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-3">
                                    <input
                                        type="text"
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleAddTask(column);
                                            if (e.key === "Escape") setNewTaskColumn(null);
                                        }}
                                        placeholder="Task title..."
                                        autoFocus
                                        className="w-full rounded border-0 bg-white px-2 py-1 text-sm outline-none ring-2 ring-blue-300"
                                    />
                                    <div className="mt-2 flex gap-2">
                                        <button
                                            onClick={() => handleAddTask(column)}
                                            className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                                        >
                                            Add
                                        </button>
                                        <button
                                            onClick={() => setNewTaskColumn(null)}
                                            className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setNewTaskColumn(column)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white py-2 text-sm text-gray-600 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add task
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
