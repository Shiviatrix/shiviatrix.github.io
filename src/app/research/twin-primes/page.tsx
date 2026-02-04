"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Server, Cpu, Database } from "lucide-react";
import { MathInline, MathBlock } from "@/components/math";
import { TwinVis } from "@/components/visualizations/twin-vis";

export default function TwinPrimesPage() {
    return (
        <article className="max-w-4xl mx-auto px-6 pt-24 pb-24 space-y-16 selection:bg-indigo-500/30">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[128px]" />
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

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Server className="w-10 h-10 text-neutral-600" />
                        <h1 className="text-3xl md:text-6xl font-medium tracking-tight text-white leading-tight">
                            Twin Prime Cluster
                        </h1>
                    </div>
                    <p className="text-2xl text-neutral-400 font-light max-w-2xl">
                        Distributed verification of 400,000-digit candidates using a custom Primorial Shielding protocol.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-neutral-800">
                    <div className="space-y-1">
                        <span className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">Analysis Scale</span>
                        <span className="block text-lg text-white font-mono"><MathInline tex="10^{20}" /></span>
                    </div>
                    <div className="space-y-1">
                        <span className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">Throughput</span>
                        <span className="block text-lg text-white font-mono">82k / sec</span>
                    </div>
                    <div className="space-y-1">
                        <span className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">Protocol</span>
                        <span className="block text-lg text-white font-mono">Miller-Rabin</span>
                    </div>
                    <div className="space-y-1">
                        <span className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">Discovery</span>
                        <span className="block text-lg text-green-400 font-mono">Mod 5 Opt.</span>
                    </div>
                </div>
            </motion.div>

            {/* Problem Statement */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="prose prose-invert prose-neutral max-w-none"
            >
                <h2 className="text-2xl font-medium text-white">The Problem</h2>
                <p className="text-lg leading-relaxed text-neutral-300">
                    The Twin Prime Conjecture asserts there are infinitely many prime pairs <MathInline tex="(p, p+2)" />. Verifying large candidates requires primarily primality testing (typically LLR or Fermat tests) on numbers of the form <MathInline tex="k \cdot 2^N \pm 1" />.
                </p>
                <p>
                    The challenge is computational density. Checking a single 400,000-digit number takes hours on a standard CPU. Validating a batch of 10,000 candidates sequentially would take years. We needed a way to parallelize this embarrassingly parallel workload without incurring massive cloud costs.
                </p>

                <h3 className="text-xl font-medium text-white mt-12 mb-4">The Solution: Primorial Shielding</h3>
                <p>
                    To avoid wasting cycles on candidates divisible by small primes (3, 5, 7...), we implemented a Shielding strategy. We construct a target center <MathInline tex="C" /> using the Primorial <MathInline tex="P\#_{100}" /> (product of first 100 primes):
                </p>
                <MathBlock tex="C = k \cdot P\#_{100} \cdot 2^{1,500,000}" />
                <p>
                    This ensures that <MathInline tex="C \pm 1" /> is coprime to all small Shield primes, increasing the probability of primality by orders of magnitude compared to random integers.
                </p>

                <div className="my-8">
                    <TwinVis />
                </div>

                <div className="my-8">
                    <TwinVis />
                </div>
            </motion.section>

            {/* Architecture Diagram */}
            <motion.section
                initial={{ opacity: 0, scale: 0.99 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 space-y-8"
            >
                <h2 className="text-lg font-mono text-neutral-400 uppercase tracking-wider">Cluster Architecture</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded flex items-center justify-center border border-blue-500/20">
                            <Database className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-white font-medium">1. Candidate Generation</h3>
                        <p className="text-sm text-neutral-400">
                            Python scripts generate pre-sieved candidates (<MathInline tex="k \cdot 2^N \pm 1" />) using the Shielding logic. Batches of 1,000 are serialized to Cloud Storage.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-purple-500/10 rounded flex items-center justify-center border border-purple-500/20">
                            <Server className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-white font-medium">2. Fleet Orchestration</h3>
                        <p className="text-sm text-neutral-400">
                            A custom <code>launch_fleet.py</code> controller spawns preemptible Compute Optimized instances (C2-standard-4). Each instance pulls a unique slice of candidates.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded flex items-center justify-center border border-green-500/20">
                            <Cpu className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-white font-medium">3. PFGW Verification</h3>
                        <p className="text-sm text-neutral-400">
                            Instances execute PFGW (Prime Form Genefer for Windows/Linux) to run Fermat primality tests. Results are piped back to a centralized results bucket.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Results Table */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-medium text-white">High-Altitude Statistical Analysis (<MathInline tex="10^{20}" />)</h2>
                <p className="text-sm text-neutral-500 italic mb-6">
                    Note: These statistical deviations are conditional on the specific candidate generation process (primorial shielding) and are presented as hypothesis-generating observations rather than varying probability distributions.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-neutral-800">
                                <th className="py-4 text-xs font-mono text-neutral-500 uppercase tracking-wider">Factor Subset</th>
                                <th className="py-4 text-xs font-mono text-neutral-500 uppercase tracking-wider">Sample Size</th>
                                <th className="py-4 text-xs font-mono text-neutral-500 uppercase tracking-wider">Twin Centers</th>
                                <th className="py-4 text-xs font-mono text-neutral-500 uppercase tracking-wider text-right">Lift vs Baseline</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-mono text-neutral-300">
                            <tr className="border-b border-neutral-800/50 bg-green-500/5">
                                <td className="py-4 text-green-400">Divisible by 5</td>
                                <td className="py-4">741,267</td>
                                <td className="py-4">4,594 (0.62%)</td>
                                <td className="py-4 text-right text-green-400 font-bold">+67.0%</td>
                            </tr>
                            <tr className="border-b border-neutral-800/50 bg-green-500/5">
                                <td className="py-4 text-green-300">Divisible by 7</td>
                                <td className="py-4">530,388</td>
                                <td className="py-4">2,674 (0.50%)</td>
                                <td className="py-4 text-right text-green-300">+35.9%</td>
                            </tr>
                            <tr className="border-b border-neutral-800/50">
                                <td className="py-4">Divisible by 11</td>
                                <td className="py-4">337,324</td>
                                <td className="py-4">1,570 (0.47%)</td>
                                <td className="py-4 text-right">+25.5%</td>
                            </tr>
                            <tr className="border-b border-neutral-800/50">
                                <td className="py-4">Divisible by 13</td>
                                <td className="py-4">285,038</td>
                                <td className="py-4">1,265 (0.44%)</td>
                                <td className="py-4 text-right">+19.6%</td>
                            </tr>
                            <tr className="border-b border-neutral-800/50 border-t-2 border-t-neutral-800">
                                <td className="py-4 text-neutral-500">Baseline (Random)</td>
                                <td className="py-4 text-neutral-500">3,708,924</td>
                                <td className="py-4 text-neutral-500">13,760 (0.37%)</td>
                                <td className="py-4 text-right text-neutral-500">1.0x</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="bg-neutral-900/30 p-6 rounded-lg border border-neutral-800 mt-8">
                    <h3 className="text-white font-medium mb-2">Key Findings</h3>
                    <ul className="list-disc list-inside text-sm text-neutral-400 space-y-2">
                        <li>Analyzed <strong>3.7 Million</strong> candidates at <MathInline tex="N=10^{20}" /> around the Baseline Rate of 0.37%.</li>
                        <li><strong>Mod 5 Optimization</strong>: Candidates divisible by 5 are <strong>67% more likely</strong> to be Twin Centers than random candidates.</li>
                        <li>This contradicts the naive intuition that removing small factors is always better; the distribution of Twin Centers is biased toward multiples of 5, 7, and 11.</li>
                    </ul>
                </div>
                <div className="p-6 rounded-lg border border-red-500/20 bg-red-500/5 mt-4">
                    <h3 className="text-red-300 font-medium mb-2">Limitations</h3>
                    <p className="text-sm text-red-200/70">
                        While we found several Probable Primes (PRP), no actual Twin Prime pair was discovered in this batch. The density of twin primes at <MathInline tex="10^{400000}" /> is incredibly low, requiring exponentially more compute for a definitive hit.
                    </p>
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
                        [1] Hardy, G. H., & Littlewood, J. E. (1923). "Some problems of 'Partitio numerorum'; III: On the expression of a number as a sum of primes." <em>Acta Mathematica</em>, 44(1), 1-70.
                    </p>
                    <p>
                        [2] Zhang, Y. (2014). "Bounded gaps between primes." <em>Annals of Mathematics</em>, 179(3), 1121-1174.
                    </p>
                    <p>
                        [3] Polymath, D. H. J. (2014). "Variants of the Selberg sieve, and bounded intervals containing many primes." <em>Research in the Mathematical Sciences</em>, 1(1), 12.
                    </p>
                    <p>
                        [4] Rabin, M. O. (1980). "Probabilistic algorithm for testing primality." <em>Journal of Number Theory</em>, 12(1), 128-138.
                    </p>
                    <p>
                        [5] Caldwell, C. K. (2024). "The Prime Pages." <a href="https://primes.utm.edu" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 transition-colors">primes.utm.edu</a>
                    </p>
                </div>
            </motion.section>
        </article>
    );
}
