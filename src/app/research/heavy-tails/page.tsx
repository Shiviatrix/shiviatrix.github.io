"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";

import { MathInline } from "@/components/math";
import { HeavyVis } from "@/components/visualizations/simulation-vis";

export default function HeavyTailsPage() {
    return (
        <article className="max-w-4xl mx-auto px-6 pt-24 pb-24 space-y-16 selection:bg-yellow-500/30">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-900/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[128px]" />
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
            >
                <Link href="/" className="inline-flex items-center text-sm font-mono text-neutral-500 hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Index
                </Link>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-neutral-600" />
                        <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
                            Non-Ergodic Random Walks
                        </h1>
                    </div>
                    <p className="text-xl text-neutral-400 font-light flex items-center gap-2">
                        Ergodicity breaking in heavy-tailed distributions at <MathInline tex="\alpha=1" />.
                    </p>
                </div>

                <div className="flex gap-4 border-b border-neutral-800 pb-8">
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Status</span>
                        Analysis Framework
                    </div>
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Stack</span>
                        LaTeX / Arb / C
                    </div>
                </div>
            </motion.div>


            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="prose prose-invert prose-neutral max-w-none"
            >
                <h3 className="font-mono text-sm text-neutral-500 uppercase tracking-wider mb-4">Abstract</h3>
                <p className="text-lg leading-relaxed text-neutral-300">
                    For stochastic processes with heavy-tailed jump distributions (Lévy flights with tail index <MathInline tex="\alpha=1" />), we demonstrate the failure of ergodic convergence. Unlike well-behaved processes where time averages converge to ensemble averages, these systems exhibit persistent non-stationarity: extreme events dominate the trajectory indefinitely, preventing any normalization scheme from achieving stable limiting behavior.
                </p>
                <p className="text-neutral-400">
                    This work analyzes the failure of the Law of Large Numbers for heavy-tailed distributions. We show evidence that no renormalization function can satisfy universality, continuity, and record insensitivity simultaneously. The result has implications for financial modeling, turbulence theory, and any domain where heavy-tailed phenomena arise.
                </p>

                <div className="my-8">
                    <HeavyVis />
                </div>

                <div className="my-8">
                    <HeavyVis />
                </div>
            </motion.section>

            {/* The Theorem */}
            <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-8 space-y-6"
            >
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <h2 className="font-mono text-sm text-blue-400 uppercase tracking-wider">Conjecture A: Absence of Intrinsic Ergodicity</h2>
                </div>

                <div className="text-neutral-300 italic font-serif text-lg">
                    It appears no functional <MathInline tex="G_n" /> can satisfy Universality, Continuity, Record Insensitivity, and Linear Stabilization simultaneously.
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-800/50">
                    <p className="text-sm font-mono text-neutral-500 flex items-center gap-2">
                        <span className="text-neutral-400">Argument 1:</span> Infinite Total Reset Record Events
                    </p>
                    <p className="text-sm font-mono text-neutral-500 flex items-center gap-2">
                        <span className="text-neutral-400">Argument 2:</span> Path Surgery & Connectivity Disconnect
                    </p>
                    <p className="text-sm font-mono text-neutral-500 flex items-center gap-2">
                        <span className="text-neutral-400">Observation 3:</span> Inevitable Oscillation (<MathInline tex="\liminf = 0, \limsup = \infty" />)
                    </p>
                </div>
            </motion.section>

            {/* Verification */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <h3 className="font-mono text-sm text-neutral-500 uppercase tracking-wider">Computational Verification</h3>
                <p className="text-neutral-400 leading-relaxed">
                    While the theorem is negative, we computed the theoretical Ensemble Average (the value a multiverse observer would see) versus the Time Average (what a single observer sees).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded bg-neutral-950 border border-neutral-900">
                        <span className="block text-xs font-mono text-neutral-600 mb-2">Ensemble Constant (Arb/C)</span>
                        <span className="text-2xl font-mono text-green-400">0.367879...</span>
                        <span className="block text-xs text-neutral-700 mt-1">1/e (Exact)</span>
                    </div>
                    <div className="p-4 rounded bg-neutral-950 border border-neutral-900">
                        <span className="block text-xs font-mono text-neutral-600 mb-2">Time Average (Simulated)</span>
                        <span className="text-2xl font-mono text-red-400">Divergent</span>
                        <span className="block text-xs text-neutral-700 mt-1">CV {'>'} 1.0 (Random Variable)</span>
                    </div>
                </div>
            </motion.section>

            {/* Bibliography */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="pt-8 border-t border-neutral-800"
            >
                <h2 className="text-2xl font-medium text-white mb-6">References</h2>
                <div className="space-y-3 text-sm text-neutral-400">
                    <p>
                        [1] Lévy, P. (1925). <em>Calcul des probabilités</em>. Gauthier-Villars.
                    </p>
                    <p>
                        [2] Mandelbrot, B. (1963). "The variation of certain speculative prices." <em>Journal of Business</em>, 36(4), 394-419.
                    </p>
                    <p>
                        [3] Bouchaud, J. P., & Georges, A. (1990). "Anomalous diffusion in disordered media: Statistical mechanisms, models and physical applications." <em>Physics Reports</em>, 195(4-5), 127-293.
                    </p>
                    <p>
                        [4] Metzler, R., & Klafter, J. (2000). "The random walk's guide to anomalous diffusion: a fractional dynamics approach." <em>Physics Reports</em>, 339(1), 1-77.
                    </p>
                    <p>
                        [5] Bouchaud, J. P. (2008). "Sticky expectations and the profitability anomaly." <em>The Journal of Finance</em>, 63(4), 639-667.
                    </p>
                </div>
            </motion.section>
        </article>
    );
}
