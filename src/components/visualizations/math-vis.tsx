"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ZetaVis() {
    // Standardized Polyline for stable morphing (100 points)
    // We oscillate between a "relaxed" wave and a "compressed" chirp
    const points = 100;
    const width = 100;
    const height = 50;
    const mid = height / 2;

    const generatePath = (freqMultiplier: number, ampMultiplier: number) => {
        let d = `M 0 ${mid}`;
        for (let i = 1; i <= points; i++) {
            const x = (i / points) * width;
            const t = (i / points) * Math.PI * 4; // 2 cycles base
            // Chirp: frequency increases with t
            // phase shift to make it look like sliding
            const phase = 0;
            const freq = 1 + t * freqMultiplier;
            const y = mid + Math.sin(t * freq + phase) * 20 * ampMultiplier;
            d += ` L ${x} ${y}`;
        }
        return d;
    };

    const pathA = generatePath(0.1, 0.5); // Relaxed
    const pathB = generatePath(0.8, 1.0); // Intense Chirp

    return (
        <div className="w-full h-64 bg-neutral-900/50 rounded-lg border border-neutral-800 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-neutral-900/0 to-transparent" />

            {/* The "Critical Line" */}
            <div className="absolute w-full h-[1px] bg-neutral-700/50" />

            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <motion.path
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="0.5"
                    initial={{ d: pathA }}
                    animate={{ d: pathB }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            </svg>

            <div className="absolute bottom-4 left-4 text-xs font-mono text-blue-400">
                Simulation: Z(t) Harmonic Chirp
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
