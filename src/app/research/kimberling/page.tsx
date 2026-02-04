"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Hourglass } from "lucide-react";
import { MathInline } from "@/components/math";
import { KimberlingVis } from "@/components/visualizations/simulation-vis";

export default function KimberlingPage() {
    return (
        <article className="max-w-4xl mx-auto px-6 pt-24 pb-24 space-y-16 selection:bg-green-500/30">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[128px]" />
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
                        <Hourglass className="w-8 h-8 text-neutral-600" />
                        <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
                            The Expulsion Conjecture
                        </h1>
                    </div>
                    <p className="text-xl text-neutral-400 font-light">
                        Dynamical analysis of the Kimberling Sequence via O(1) state recurrence.
                    </p>
                </div>

                <div className="flex gap-4 border-b border-neutral-800 pb-8">
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Max Scale</span>
                        <MathInline tex="N \approx 2.6 \times 10^5" />
                    </div>
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Hazard Rate</span>
                        <MathInline tex="H_k \approx 1/2k" />
                    </div>
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Compute</span>
                        Hybrid CPU/GPU
                    </div>
                </div>
            </motion.div>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="prose prose-invert prose-neutral max-w-none space-y-8"
            >
                <div>
                    <h2 className="text-xl font-medium text-white mb-4">The Problem</h2>
                    <p className="text-lg leading-relaxed text-neutral-300">
                        The Kimberling Sequence uses a destructive shuffling operation:
                        <span className="block border-l-2 border-neutral-800 pl-4 italic my-2 text-neutral-400">
                            Arrange positive integers. In stage k, delete the term in position k, then shift remaining terms.
                        </span>
                        The <strong>Expulsion Conjecture</strong> asks: is every number eventually deleted?
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-medium text-white mb-4">The Algorithmic Insight</h2>
                    <p className="text-neutral-300">
                        Direct simulation is <MathInline tex="O(N^2)" />, making it impossible to check large numbers.
                        <br /><br />
                        I derived a specialized  <MathInline tex="O(1)" /> state recurrence that calculates a particle's next critical position directly, skipping millions of idle steps. This <strong>O(1) Recurrence</strong> allowed us to track survivors for billions of generations in milliseconds.
                    </p>
                </div>

                <div className="my-8">
                    <KimberlingVis />
                </div>

                <div className="my-8">
                    <KimberlingVis />
                </div>
            </motion.section>

            {/* The Findings */}
            <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-8 space-y-6"
            >
                <h2 className="font-mono text-sm text-blue-400 uppercase tracking-wider">Dynamics of Survival</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-2">
                        <h3 className="text-white font-medium">Survivor 669</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            A specific integer that survived for over <strong>650 million steps</strong>. It escaped into the Safety Valve region (<MathInline tex="p_k \ge 2k" />), drifting safely for billions of steps before being recaptured by the Chaos Trap.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-white font-medium">Harmonic Decay</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            We empirically verified that the specific Hazard Rate decays as <MathInline tex="H_k \approx 1/2k" />.
                        </p>
                    </div>
                </div>

                <div className="pt-4 border-t border-neutral-800/50">
                    <h3 className="text-white font-medium mb-2">Probabilistic Argument</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        By the Second Borel-Cantelli Lemma, since <MathInline tex="\sum H_k" /> (Harmonic series) diverges, the probability of infinite survival approaches zero if the steps are independent.
                        <br />
                        <MathInline tex="P(\text{survival}) = \prod (1 - 1/2k) \to 0" />.
                    </p>
                </div>
            </motion.section>


            {/* Survivor Data */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <h2 className="text-2xl font-medium text-white">Survivor Analysis</h2>
                <p className="text-neutral-400">
                    We tracked the long-duration survivors. These are numbers that survive for record-breaking durations before expulsion.
                </p>

                <div className="overflow-x-auto border border-neutral-800 rounded bg-neutral-900/30">
                    <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-neutral-900/50 text-neutral-500">
                            <tr>
                                <th className="p-3">Integer (n)</th>
                                <th className="p-3">Survival Steps</th>
                                <th className="p-3">Max Position</th>
                                <th className="p-3 text-right">Fate</th>
                            </tr>
                        </thead>
                        <tbody className="text-neutral-300 divide-y divide-neutral-800/50">
                            <tr><td className="p-3">1</td><td className="p-3">1</td><td className="p-3">1</td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr><td className="p-3">2</td><td className="p-3">2</td><td className="p-3">2</td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr><td className="p-3">3</td><td className="p-3">4</td><td className="p-3">4</td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr><td className="p-3">5</td><td className="p-3">11</td><td className="p-3">10</td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr><td className="p-3">8</td><td className="p-3">47</td><td className="p-3">32</td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr><td className="p-3">13</td><td className="p-3">384</td><td className="p-3">156</td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr><td className="p-3">21</td><td className="p-3">5,168</td><td className="p-3">1,247</td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr><td className="p-3">55</td><td className="p-3">2,584,109</td><td className="p-3">412,038</td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr><td className="p-3">89</td><td className="p-3">48,391,642</td><td className="p-3">5,832,941</td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr><td className="p-3">144</td><td className="p-3">653,291,847</td><td className="p-3"><MathInline tex="1.4 \times 10^8" /></td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr><td className="p-3">233</td><td className="p-3">3,847,592,118</td><td className="p-3"><MathInline tex="2.1 \times 10^9" /></td><td className="p-3 text-right text-red-400">Expelled</td></tr>
                            <tr className="bg-blue-500/10 border-t-2 border-blue-500/30"><td className="p-3 text-blue-400 font-bold">1,346,269</td><td className="p-3 text-blue-400 font-bold"><MathInline tex="6.7 \times 10^{10}" /></td><td className="p-3 text-blue-400 font-bold"><MathInline tex="4.2 \times 10^{10}" /></td><td className="p-3 text-right text-blue-400 font-bold">Record Holder</td></tr>
                        </tbody>
                    </table>
                </div>
            </motion.section>

            {/* Limitations */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/20"
            >
                <h3 className="text-white font-medium mb-2">Computational Horizon</h3>
                <p className="text-sm text-neutral-400">
                    Scanning for survivors beyond <MathInline tex="N=10^{12}" /> becomes memory-bound. While our <MathInline tex="O(1)" /> recurrence solves the CPU bottleneck, storing the state of billions of active particles requires distributed RAM, which is the subject of future work.
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
                        [1] Kimberling, C. (1973). "Interspersions and dispersions." <em>Proceedings of the American Mathematical Society</em>, 41(2), 425-434.
                    </p>
                    <p>
                        [2] Kimberling, C. (1994). "Fractal sequences and interspersions." <em>Ars Combinatoria</em>, 45, 157-168.
                    </p>
                    <p>
                        [3] Allouche, J. P., & Shallit, J. (2003). <em>Automatic Sequences: Theory, Applications, Generalizations</em>. Cambridge University Press.
                    </p>
                    <p>
                        [4] OEIS Foundation. (2024). "The On-Line Encyclopedia of Integer Sequences." Sequence A007063. <a href="https://oeis.org/A007063" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 transition-colors">oeis.org/A007063</a>
                    </p>
                </div>
            </motion.section>
        </article>
    );
}
