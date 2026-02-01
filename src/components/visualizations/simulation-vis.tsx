"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";

export function KimberlingVis() {
    // Numbers 1 to 15
    const [nums, setNums] = useState<number[]>(Array.from({ length: 15 }, (_, i) => i + 1));
    const [stage, setStage] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setNums(prev => {
                // Stage k: remove k-th element (1-based index)
                // In 0-based array, remove index k-1
                // Current stage is 'stage' state, but need to sync.
                // Reset if empty or stage > length
                return prev;
            });

            // Logic handled in separate effect to access state cleanly?
            // Let's do a simple recursive logic
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Better logic: dedicated step function
    useEffect(() => {
        const step = () => {
            setNums(current => {
                if (current.length < 2 || stage > current.length) {
                    setStage(1);
                    return Array.from({ length: 15 }, (_, i) => i + 1);
                }

                // Remove item at index (stage - 1)
                const next = [...current];
                // Kimberling 1: remove 1st
                // Kimberling 2: remove 2nd
                // ...
                // But logic is: (1 + i) - so remove (1+i)-th term? 
                // "In stage k, delete the term in position k"

                // Index to remove: stage - 1
                if (stage - 1 < next.length) {
                    next.splice(stage - 1, 1);
                }

                return next;
            });
            setStage(s => {
                if (nums.length < 2) return 1;
                return s + 1;
            });
        };

        const interval = setInterval(step, 1500);
        return () => clearInterval(interval);
    }, [stage, nums.length]);

    return (
        <div className="w-full h-48 bg-neutral-900/50 rounded-lg border border-neutral-800 p-6 flex flex-col justify-center items-center gap-6">
            <div className="flex gap-2">
                <AnimatePresence mode="popLayout">
                    {nums.map((n, i) => (
                        <motion.div
                            key={n}
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, backgroundColor: i === stage - 1 ? "#ef444433" : "#262626" }}
                            exit={{ scale: 0, opacity: 0, y: 20 }}
                            className={`w-8 h-8 rounded flex items-center justify-center text-sm font-mono border ${i === stage - 1
                                    ? "border-red-500/50 text-red-300" // Target
                                    : "border-neutral-700 text-neutral-300"
                                }`}
                        >
                            {n}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <div className="text-xs font-mono text-neutral-500">
                Stage {stage}: Expelling position {stage}
            </div>
        </div>
    );
}

export function HeavyVis() {
    const [data, setData] = useState<{ val: number }[]>([{ val: 0 }]);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const last = prev[prev.length - 1].val;
                // Heavy tail jump logic: occasionally massive
                const r = Math.random();
                let jump = (Math.random() - 0.5) * 2; // Normal-ish

                if (r < 0.05) { // 5% chance of black swan
                    jump *= 15; // Huge jump
                }

                const next = [...prev, { val: last + jump }];
                if (next.length > 50) return [{ val: 0 }]; // Reset
                return next;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-64 bg-neutral-900/50 rounded-lg border border-neutral-800 p-4 relative">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <YAxis hide domain={['auto', 'auto']} />
                    <Area
                        type="monotone"
                        dataKey="val"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorVal)"
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className="absolute top-4 right-4 text-xs font-mono text-emerald-400">
                Lévy Flight (alpha=1)
            </div>
        </div>
    );
}
