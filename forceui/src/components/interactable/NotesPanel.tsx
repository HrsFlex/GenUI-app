/**
 * @file components/interactable/NotesPanel.tsx
 * @description Notes panel with rich text editing capabilities
 */

"use client";

import { useState } from "react";
import { z } from "zod";
import { FileText, Palette, Save, Trash2 } from "lucide-react";

// Zod schema for NotesPanel props
export const notesPanelSchema = z.object({
    title: z.string().optional().describe("Panel title"),
    initialNotes: z
        .array(
            z.object({
                id: z.string(),
                content: z.string(),
                color: z.string().optional(),
                timestamp: z.number(),
            })
        )
        .optional()
        .describe("Initial notes"),
});

type NotesPanelProps = z.infer<typeof notesPanelSchema>;

interface Note {
    id: string;
    content: string;
    color?: string;
    timestamp: number;
}

const NOTE_COLORS = [
    { name: "Yellow", bg: "bg-yellow-100", border: "border-yellow-300" },
    { name: "Pink", bg: "bg-pink-100", border: "border-pink-300" },
    { name: "Blue", bg: "bg-blue-100", border: "border-blue-300" },
    { name: "Green", bg: "bg-green-100", border: "border-green-300" },
    { name: "Purple", bg: "bg-purple-100", border: "border-purple-300" },
];

export function NotesPanel({
    title = "Notes",
    initialNotes = [],
}: NotesPanelProps) {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [newNoteContent, setNewNoteContent] = useState("");
    const [newNoteColor, setNewNoteColor] = useState(NOTE_COLORS[0]);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const handleAddNote = () => {
        if (!newNoteContent.trim()) return;

        const newNote: Note = {
            id: `note-${Date.now()}`,
            content: newNoteContent,
            color: newNoteColor.name,
            timestamp: Date.now(),
        };

        setNotes([newNote, ...notes]);
        setNewNoteContent("");
    };

    const handleDeleteNote = (noteId: string) => {
        setNotes(notes.filter((note) => note.id !== noteId));
    };

    const handleUpdateNote = (noteId: string, newContent: string) => {
        setNotes(
            notes.map((note) =>
                note.id === noteId ? { ...note, content: newContent } : note
            )
        );
    };

    const getColorClasses = (colorName?: string) => {
        const color = NOTE_COLORS.find((c) => c.name === colorName) || NOTE_COLORS[0];
        return color;
    };

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <FileText className="h-6 w-6 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>

            {/* New Note Input */}
            <div className="mb-6">
                <div
                    className={`rounded-lg border-2 ${getColorClasses(newNoteColor.name).border} ${getColorClasses(newNoteColor.name).bg} p-4`}
                >
                    <textarea
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.ctrlKey) handleAddNote();
                        }}
                        placeholder="Write a note... (Ctrl+Enter to save)"
                        className="w-full resize-none border-0 bg-transparent text-sm outline-none placeholder:text-gray-500"
                        rows={3}
                    />

                    <div className="mt-3 flex items-center justify-between">
                        {/* Color Picker */}
                        <div className="relative">
                            <button
                                onClick={() => setShowColorPicker(!showColorPicker)}
                                className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
                            >
                                <Palette className="h-4 w-4" />
                                {newNoteColor.name}
                            </button>

                            {showColorPicker && (
                                <div className="absolute left-0 top-full z-10 mt-2 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                                    <div className="flex gap-2">
                                        {NOTE_COLORS.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => {
                                                    setNewNoteColor(color);
                                                    setShowColorPicker(false);
                                                }}
                                                className={`h-8 w-8 rounded-full ${color.bg} border-2 ${color.border} transition-transform hover:scale-110`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleAddNote}
                            disabled={!newNoteContent.trim()}
                            className="flex items-center gap-2 rounded-md bg-purple-600 px-4 py-1.5 text-sm text-white transition-colors hover:bg-purple-700 disabled:bg-gray-300"
                        >
                            <Save className="h-4 w-4" />
                            Save Note
                        </button>
                    </div>
                </div>
            </div>

            {/* Notes Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {notes.map((note) => {
                    const colorClasses = getColorClasses(note.color);
                    return (
                        <div
                            key={note.id}
                            className={`group relative rounded-lg border-2 ${colorClasses.border} ${colorClasses.bg} p-4 shadow-sm transition-shadow hover:shadow-md`}
                        >
                            <textarea
                                defaultValue={note.content}
                                onBlur={(e) => handleUpdateNote(note.id, e.target.value)}
                                className="w-full resize-none border-0 bg-transparent text-sm outline-none"
                                rows={4}
                            />

                            <div className="mt-2 flex items-center justify-between">
                                <time className="text-xs text-gray-500">
                                    {new Date(note.timestamp).toLocaleString()}
                                </time>

                                <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {notes.length === 0 && (
                <div className="py-12 text-center text-gray-400">
                    <FileText className="mx-auto mb-3 h-12 w-12 opacity-50" />
                    <p>No notes yet. Start writing above!</p>
                </div>
            )}
        </div>
    );
}
