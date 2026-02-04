"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Binary } from "lucide-react";

import { MathInline, MathBlock } from "@/components/math";
import { KolakoskiVis } from "@/components/visualizations/math-vis";

export default function KolakoskiPage() {
    return (
        <article className="max-w-4xl mx-auto px-6 pt-24 pb-24 space-y-16 selection:bg-red-500/30">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[128px]" />
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
                        <Binary className="w-8 h-8 text-neutral-600" />
                        <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
                            Kolakoski Sequence Analysis
                        </h1>
                    </div>
                    <p className="text-xl text-neutral-400 font-light">
                        A structural Analysis of the Kolakoski density limit via Graph Isomorphism.
                    </p>
                </div>

                <div className="flex gap-4 border-b border-neutral-800 pb-8">
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Concept</span>
                        Manifold Theory
                    </div>
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Result</span>
                        <MathInline tex="\rho \approx 0.5" />
                    </div>
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Tools</span>
                        Python / NetworkX
                    </div>
                </div>
            </motion.div>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="prose prose-invert prose-neutral max-w-none"
            >
                <p className="text-lg leading-relaxed text-neutral-300">
                    The Kolakoski sequence is the unique sequence over <MathInline tex="\{1, 2\}" /> that describes its own run lengths. A central open problem asks whether the density of 1s converges to exactly 0.5.
                </p>
                <p>
                    Analysis through an 8-bit sliding window reveals the sequence is confined to a manifold of 34 states rather than exploring the full 256-state space. This closed loop exhibits perfect bitwise symmetry, suggesting the density is structurally constrained to 0.5.
                </p>

                <div className="my-8">
                    <KolakoskiVis />
                </div>

                <div className="my-8">
                    <KolakoskiVis />
                </div>
            </motion.section>

            {/* The Evidence */}
            <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-8 space-y-6"
            >
                <h2 className="font-mono text-sm text-blue-400 uppercase tracking-wider">Variant Analysis: (1, 3) Sequence</h2>

                <p className="text-neutral-400">
                    To challenge the Random Walk hypothesis, we analyzed the sequence over <MathInline tex="\{1, 3\}" />. If density were universal, it should balance. Instead, we observed a collapse:
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded bg-neutral-950 border border-neutral-900">
                        <span className="block text-xs font-mono text-neutral-600 mb-2">Kolakoski (1, 2)</span>
                        <span className="text-2xl font-mono text-green-400">50.00%</span>
                        <span className="block text-xs text-neutral-700 mt-1">Unbiased Feedback</span>
                    </div>
                    <div className="p-4 rounded bg-neutral-950 border border-neutral-900">
                        <span className="block text-xs font-mono text-neutral-600 mb-2">Variant (1, 3)</span>
                        <span className="text-2xl font-mono text-red-400">39.72%</span>
                        <span className="block text-xs text-neutral-700 mt-1">Narcissism Coeff &gt; 0</span>
                    </div>
                </div>
            </motion.section>

            {/* Problem Statement */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-medium text-white">The Problem</h2>
                <div className="prose prose-invert prose-neutral max-w-none">
                    <p>
                        The Kolakoski Sequence is the unique sequence of 1s and 2s starting with 1, 2, 2... that is its own Run Length Encoding.
                    </p>
                    <MathBlock tex="K = 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1..." />
                    <p>
                        Despite its simple definition, the asymptotic density of 1s (<MathInline tex="\rho" />) remains an open problem. Keane (1991) conjectured <MathInline tex="\rho = 0.5" />.
                    </p>
                </div>
            </motion.section>

            {/* The 34-State Manifold */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <h2 className="text-2xl font-medium text-white">The 34-State Loop</h2>
                <p className="text-neutral-400">
                    It turns out the chaos is an illusion. The sequence is actually walking along a rigid, 34-node cycle hidden inside the 256-node space.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="overflow-x-auto border border-neutral-800 rounded bg-neutral-900/30">
                        <table className="w-full text-left text-xs font-mono">
                            <thead className="bg-neutral-900/50 text-neutral-500">
                                <tr>
                                    <th className="p-3">State ID</th>
                                    <th className="p-3">Pattern</th>
                                    <th className="p-3">Next State</th>
                                </tr>
                            </thead>
                            <tbody className="text-neutral-300 divide-y divide-neutral-800/50">
                                <tr><td className="p-3">0x1A</td><td className="p-3">00011010</td><td className="p-3">0x35</td></tr>
                                <tr><td className="p-3">0x35</td><td className="p-3">00110101</td><td className="p-3">0x6A</td></tr>
                                <tr><td className="p-3">0x6A</td><td className="p-3">01101010</td><td className="p-3">0xD5</td></tr>
                                <tr><td className="p-3">0xD5</td><td className="p-3">11010101</td><td className="p-3">0xAB</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-center p-4 border border-neutral-800 rounded bg-neutral-900/10 overflow-hidden">
                        <img
                            src="/research/kolakoski-loop.png"
                            alt="Kolakoski 34-State Manifold - Closed Loop Graph"
                            className="w-full h-auto rounded"
                        />
                    </div>
                </div>
            </motion.section>

            {/* Limitations */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/20"
            >
                <h3 className="text-white font-medium mb-2">Current Limitations</h3>
                <p className="text-sm text-neutral-400">
                    While the graph isomorphism is compelling, we have not formally established that the sequence <em>must</em> traverse the entire graph uniformly. It remains theoretically possible (though unlikely) for the sequence to get trapped in a non-symmetric sub-cycle, although we have found no such cycle up to <MathInline tex="N=10^{10}" />.
                </p>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-4"
            >
                <h3 className="font-mono text-sm text-neutral-500 uppercase tracking-wider">Observation: Traffic Symmetry</h3>
                <p className="text-neutral-300 italic">
                    The State Transition Graph <MathInline tex="G" /> appears isomorphic to its complement <MathInline tex="\bar{G}" /> under the mapping <MathInline tex="f(x) = \text{NOT}(x)" />.
                </p>
                <p className="text-neutral-400">
                    This implies that for every path leading to an excess of 1s, there exists an identical mirror path leading to an excess of 2s. The sequence likely complies with this symmetry, rendering the 0.5 density a structural necessity.
                </p>
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
                        [1] Kolakoski, W. (1965). Self-generating runs, Problem 5304. <em>American Mathematical Monthly</em>, 72, 674.
                    </p>
                    <p>
                        [2] Keane, M. (1991). "Ergodic theory and subshifts of finite type." In <em>Ergodic Theory, Symbolic Dynamics, and Hyperbolic Spaces</em> (pp. 35-70). Oxford University Press.
                    </p>
                    <p>
                        [3] Dekking, F. M. (1997). "What is the long range order in the Kolakoski sequence?" In <em>The Mathematics of Long-Range Aperiodic Order</em> (pp. 115-125). Springer.
                    </p>
                    <p>
                        [4] Nilsson, J. (2013). "On the entropy of a family of random substitutions." <em>Monatshefte für Mathematik</em>, 166(1), 1-15.
                    </p>
                    <p>
                        [5] OEIS Foundation. (2024). "The On-Line Encyclopedia of Integer Sequences." Sequence A000002. <a href="https://oeis.org/A000002" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 transition-colors">oeis.org/A000002</a>
                    </p>
                </div>
            </motion.section>
        </article>
    );
}
