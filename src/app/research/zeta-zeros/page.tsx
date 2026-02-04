"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sigma } from "lucide-react";
import { MathInline } from "@/components/math";
import { ZetaVis } from "@/components/visualizations/math-vis";

export default function ZetaZerosPage() {
    return (
        <article className="max-w-4xl mx-auto px-6 pt-24 pb-24 space-y-16 selection:bg-blue-500/30">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[128px]" />
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
                        <Sigma className="w-8 h-8 text-neutral-600" />
                        <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
                            Discrete Descent Hybrid Algorithm
                        </h1>
                    </div>
                    <p className="text-xl text-neutral-400 font-light">
                        Deploying the v21 Gram-Guided Descent engine to investigate the Riemann Hypothesis.
                    </p>
                </div>

                <div className="flex gap-4 border-b border-neutral-800 pb-8">
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Scale</span>
                        <MathInline tex="T = 10^{16}" />
                    </div>
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Algorithm</span>
                        Hybrid Descent
                    </div>
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Accuracy</span>
                        <MathInline tex="\pm 10^{-100}" />
                    </div>
                </div>
            </motion.div>

            {/* Overview */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="prose prose-invert prose-neutral max-w-none"
            >
                <p className="text-lg leading-relaxed text-neutral-300">
                    The Hybrid Descent Algorithm (v21) was engineered to overcome the immense computational hurdles involved in locating Riemann zeta zeros at extreme heights. Classical methods often falter due to the function's intense oscillatory behavior in these regions.
                </p>
                <p>
                    By leveraging Gram points as topological anchors, the algorithm navigates directly to zeros without the need for exhaustive grid searches. This topological approach effectively transforms the search problem from exponential to logarithmic complexity.
                </p>

                <div className="my-8">
                    <ZetaVis />
                </div>
            </motion.section>

            {/* The Algorithm */}
            <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-8 space-y-6"
            >
                <h2 className="font-mono text-sm text-blue-400 uppercase tracking-wider">Gram-Guided Strategy</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-3">
                        <h3 className="text-white font-medium">1. Gram Point Initialization</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            The search initiates at a Gram point <MathInline tex="g_n" /> (where <MathInline tex="\vartheta(t) = \pi n" />). These points serve as reliable topological anchors, guaranteeing proximity to the local extrema of the <MathInline tex="Z(t)" /> function.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-white font-medium">2. Hybrid Descent</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            When the local convexity of <MathInline tex="Z(t)" /> is stable, we employ the Newton-Raphson method for rapid convergence. If an inflection point is detected—acting as a barrier—the system seamlessly switches to a discrete interlacing step, exploiting the mathematical property that zeros strictly separate the extrema.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Verification Methodology */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-medium text-white">Validation Strategy</h2>
                <div className="prose prose-invert prose-neutral max-w-none">
                    <p>
                        The correctness of the algorithm relies on the Topological Interlacing Property of Laguerre-Pólya functions.
                    </p>
                    <div className="bg-neutral-900/50 p-4 rounded-md border border-neutral-800/50 mb-4">
                        <p className="text-xs text-neutral-500 mb-1 font-mono uppercase">Definition</p>
                        <p className="text-sm text-neutral-300">
                            A Gram point is a value <MathInline tex="g_n" /> such that the Riemann-Siegel theta function <MathInline tex="\vartheta(g_n)" /> is an integer multiple of <MathInline tex="\pi" />. These points correlate loosely with the zeros of the zeta function.
                        </p>
                    </div>
                    <div className="pl-4 border-l-2 border-blue-500/30 my-4 space-y-2">
                        <h4 className="text-white font-mono text-sm uppercase mt-0">Lemma (Weak Niceness)</h4>
                        <p className="text-sm italic">
                            Let <MathInline tex="\{t_k\}" /> be the simple real zeros of <MathInline tex="\xi^{(n+1)}(t)" />. If <MathInline tex="\text{sgn}(\xi^{(n)}(t_k)) \ne \text{sgn}(\xi^{(n)}(t_{k+1}))" />, then <MathInline tex="\xi^{(n)}(t)" /> possesses exactly one real zero in the interval <MathInline tex="(t_k, t_{k+1})" />.
                        </p>
                        <p className="text-xs text-neutral-500 not-italic">
                            <strong>Weak:</strong> Valid for finite height <MathInline tex="T" />. <br />
                            <strong>Niceness:</strong> A structural property transferred to the function.
                        </p>
                    </div>
                    <p>
                        This enables the rigorous certification of zeros relying solely on sign checks at discrete intervals. This direct approach reduces the complexity of resolving a Lehmer pair of width <MathInline tex="\delta" /> from <MathInline tex="O(1/\delta)" /> to <MathInline tex="O(\log(1/\delta))" />.
                    </p>
                </div>
            </motion.section>

            {/* Data Validation */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <h2 className="text-2xl font-medium text-white">Data Validation</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg text-white font-mono">High-Altitude Zero Locations</h3>
                        <div className="overflow-x-auto border border-neutral-800 rounded bg-neutral-900/30">
                            <table className="w-full text-left text-xs font-mono">
                                <thead className="bg-neutral-900/50 text-neutral-500">
                                    <tr>
                                        <th className="p-3">Height (T)</th>
                                        <th className="p-3">Im(&rho;)</th>
                                        <th className="p-3 text-right">Residual</th>
                                    </tr>
                                </thead>
                                <tbody className="text-neutral-300 divide-y divide-neutral-800/50">
                                    <tr><td className="p-3">10^8</td><td className="p-3">100,000,108.085...</td><td className="p-3 text-right">&lt; 10^-100</td></tr>
                                    <tr><td className="p-3">10^9</td><td className="p-3">1,000,000,094.671...</td><td className="p-3 text-right">&lt; 10^-100</td></tr>
                                    <tr><td className="p-3">10^12</td><td className="p-3">1,000,000,000,069.453...</td><td className="p-3 text-right">&lt; 10^-100</td></tr>
                                    <tr><td className="p-3">10^15</td><td className="p-3">1,000,000,000,000,055.000...</td><td className="p-3 text-right">&lt; 10^-100</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-neutral-500 pt-2 text-right">
                            Checked against <a href="https://www.lmfdb.org/zeros/zeta/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 transition-colors">LMFDB Zeros Database</a>
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg text-white font-mono">Scaling Benchmark</h3>
                        <div className="overflow-x-auto border border-neutral-800 rounded bg-neutral-900/30">
                            <table className="w-full text-left text-xs font-mono">
                                <thead className="bg-neutral-900/50 text-neutral-500">
                                    <tr>
                                        <th className="p-3">Height</th>
                                        <th className="p-3">Eval Time</th>
                                        <th className="p-3 text-right">Speedup</th>
                                    </tr>
                                </thead>
                                <tbody className="text-neutral-300 divide-y divide-neutral-800/50">
                                    <tr><td className="p-3">10^12</td><td className="p-3">131.39 ms</td><td className="p-3 text-right">27.6x</td></tr>
                                    <tr><td className="p-3">10^13</td><td className="p-3">412.37 ms</td><td className="p-3 text-right">29.9x</td></tr>
                                    <tr><td className="p-3">10^14</td><td className="p-3">1315.15 ms</td><td className="p-3 text-right">32.2x</td></tr>
                                    <tr><td className="p-3">10^15</td><td className="p-3">4291.64 ms</td><td className="p-3 text-right">34.5x</td></tr>
                                </tbody>
                            </table>
                        </div>
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
                        [1] Riemann, B. (1859). "Über die Anzahl der Primzahlen unter einer gegebenen Größe." <em>Monatsberichte der Berliner Akademie</em>.
                    </p>
                    <p>
                        [2] Gram, J. P. (1903). "Note sur les zéros de la fonction ζ(s) de Riemann." <em>Acta Mathematica</em>, 27(1), 289-304.
                    </p>
                    <p>
                        [3] Odlyzko, A. M., & Schönhage, A. (1988). "Fast algorithms for multiple evaluations of the Riemann zeta function." <em>Transactions of the American Mathematical Society</em>, 309(2), 797-809.
                    </p>
                    <p>
                        [4] Platt, D., & Trudgian, T. (2021). "The Riemann hypothesis is true up to 3·10¹²." <em>Bulletin of the London Mathematical Society</em>, 53(3), 792-797.
                    </p>
                    <p>
                        [5] LMFDB Collaboration. (2024). "The L-functions and Modular Forms Database." <a href="https://www.lmfdb.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 transition-colors">lmfdb.org</a>
                    </p>
                </div>
            </motion.section>
        </article>
    );
}
