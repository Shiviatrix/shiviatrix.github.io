"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TwinVis() {
    // 6k +/- 1 grid
    const [candidates, setCandidates] = useState<number[]>([]);

    useEffect(() => {
        // Generate some candidates around a center
        // Center C = 30 * k
        const c = 300;
        const gen = [];
        for (let i = 0; i < 8; i++) {
            gen.push(c + 30 * i - 1);
            gen.push(c + 30 * i + 1);
        }
        setCandidates(gen);
    }, []);

    return (
        <div className="w-full h-auto bg-neutral-900/50 rounded-lg border border-neutral-800 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {candidates.map((n, i) => {
                    const isShielded = i % 3 === 0; // Fake "Shielded" logic for demo
                    const isPrime = !isShielded && Math.random() > 0.5;

                    return (
                        <motion.div
                            key={n}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-3 rounded border text-center font-mono text-sm ${isShielded
                                    ? "bg-neutral-800/50 border-neutral-700 text-neutral-500" // Filtered
                                    : isPrime
                                        ? "bg-green-500/10 border-green-500/30 text-green-400" // Survivor
                                        : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" // Candidate
                                }`}
                        >
                            <div className="text-xs text-neutral-600 mb-1">
                                {isShielded ? "SHIELDED" : isPrime ? "PRIME" : "COMPOSITE"}
                            </div>
                            {n}
                        </motion.div>
                    );
                })}
            </div>
            <div className="mt-4 text-center text-xs font-mono text-neutral-500">
                Primorial Shielding Field Active: Filtering trivial composites
            </div>
        </div>
    );
}
