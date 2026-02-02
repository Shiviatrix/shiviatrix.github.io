"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// Import the static data
import zetaPathRaw from "@/data/zeta-path.json";

// Typed for TS
const zetaPath = zetaPathRaw as number[][];

export function ZetaVis() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = document.getElementById('zeta-canvas') as HTMLCanvasElement;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set high DPI
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        let animationId: number;

        // Params
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const scale = 50;
        const speed = 2; // Points per frame

        let currentIndex = 0;
        const history: { x: number, y: number }[] = [];

        const animate = () => {
            // Clear
            ctx.clearRect(0, 0, rect.width, rect.height);

            // Grid
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, cy); ctx.lineTo(rect.width, cy);
            ctx.moveTo(cx, 0); ctx.lineTo(cx, rect.height);
            ctx.stroke();

            // Progress Path
            // We adding 'speed' points per frame
            for (let k = 0; k < speed; k++) {
                if (currentIndex < zetaPath.length) {
                    const pt = zetaPath[currentIndex];
                    // Map math coords (x, y) to screen coords
                    // Math x is real part (horizontal), math y is imaginary (vertical)
                    // Canvas y is inverted
                    const sx = cx + pt[0] * scale;
                    const sy = cy - pt[1] * scale;

                    history.push({ x: sx, y: sy });
                    currentIndex++;
                } else {
                    // Loop
                    if (currentIndex >= zetaPath.length + 100) { // small pause
                        currentIndex = 0;
                        history.length = 0;
                    } else {
                        currentIndex++;
                    }
                }
            }

            // Draw Origin
            ctx.beginPath();
            ctx.arc(cx, cy, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#ef4444';
            ctx.fill();

            // Draw Path
            ctx.beginPath();
            if (history.length > 0) {
                ctx.moveTo(history[0].x, history[0].y);
                for (let i = 1; i < history.length; i++) {
                    ctx.lineTo(history[i].x, history[i].y);
                }
            }

            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#3b82f6';
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Head (only if we have points)
            if (history.length > 0) {
                const head = history[history.length - 1];
                ctx.beginPath();
                ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
            }

            // Time Indicator (Approximate based on index)
            // tMax = 60, points = 6000 -> t ~ index / 100
            const tVal = (currentIndex % zetaPath.length) / 100;
            ctx.fillStyle = '#9ca3af';
            ctx.font = '10px monospace';
            ctx.fillText(`t = ${tVal.toFixed(2)}`, 10, 20);

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [mounted]);

    return (
        <div className="w-full h-80 bg-neutral-950 rounded-lg border border-neutral-800 relative overflow-hidden flex items-center justify-center">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <canvas
                id="zeta-canvas"
                className="w-full h-full relative z-10"
            />

            <div className="absolute bottom-4 left-4 text-xs font-mono text-blue-400/80 z-20">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                Critical Line (Pre-Computed)
            </div>
            <div className="absolute top-4 right-4 text-xs font-mono text-neutral-600 z-20">
                Ref: &zeta;(1/2 + it)
            </div>
        </div>
    );
}

export function KolakoskiVis() {
    // Correct Seed: 1, 2, 2. Pointer starts at index 2.
    // Index 0 (1) -> len 1. Val 1.
    // Index 1 (2) -> len 2. Val 2, 2.
    // Index 2 (2) -> len 2. Val 1, 1. (Pointer starts here)
    const [sequence, setSequence] = useState<number[]>([1, 2, 2]);
    const [pointer, setPointer] = useState(2);

    useEffect(() => {
        const interval = setInterval(() => {
            setSequence(prev => {
                // Determine next value (alternating 1 and 2)
                const lastVal = prev[prev.length - 1];
                const nextVal = lastVal === 1 ? 2 : 1;

                // Read run length from the pointer
                // Using closure-safe access via the state setter isn't enough for 'pointer'
                // We need the *current* pointer relative to this render cycle.
                // Since this effect depends on [pointer], 'pointer' is fresh here.

                // Safety check: if our pointer is stale or OOB relative to 'prev' (which might be newer than our render's seq)
                // Actually 'prev' is always the latest state.

                // If the component re-rendered with pointer=N, then this closure has pointer=N.
                // We check prev[N].
                if (pointer >= prev.length) return prev;

                const runLength = prev[pointer];
                const newBlock = Array(runLength).fill(nextVal);
                const nextSeq = [...prev, ...newBlock];

                // Hard limit to keep visual clean
                if (nextSeq.length > 25) return [1, 2, 2];

                return nextSeq;
            });

            setPointer(prev => {
                if (sequence.length > 25) return 2; // Reset pointer to match seed
                return prev + 1;
            });

        }, 1200); // Slower pace for readability

        return () => clearInterval(interval);
    }, [pointer, sequence.length]);

    return (
        <div className="w-full h-48 bg-neutral-900/50 rounded-lg border border-neutral-800 p-6 flex flex-col justify-center items-center gap-4">
            <div className="flex gap-1 flex-wrap justify-center max-w-2xl">
                {sequence.map((val, i) => (
                    <motion.div
                        key={i}
                        layout
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold font-mono ${val === 1
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            } ${i === pointer ? 'ring-2 ring-white/50 scale-110' : ''}`}
                    >
                        {val}
                    </motion.div>
                ))}
            </div>
            <div className="text-xs font-mono text-neutral-500">
                Reading index {pointer} ({sequence[pointer] || '?'}) → Appending {sequence[pointer]} x {sequence[sequence.length - 1] === 1 ? '2' : '1'}s
            </div>
        </div>
    );
}
