"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NeuroOSPage() {
    return (
        <article className="max-w-3xl mx-auto space-y-16 pt-12 md:pt-24">
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
                        <Terminal className="w-8 h-8 text-neutral-600" />
                        <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
                            NeuroOS Kernel
                        </h1>
                    </div>
                    <p className="text-xl text-neutral-400 font-light">
                        A bespoke 64-bit operating system kernel from scratch.
                    </p>
                </div>

                <div className="flex gap-4 border-b border-neutral-800 pb-8">
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Architecture</span>
                        x86_64
                    </div>
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Language</span>
                        C / Assembly (GAS)
                    </div>
                    <div className="text-xs font-mono text-neutral-500">
                        <span className="block text-neutral-700 uppercase tracking-wider mb-1">Features</span>
                        Paging, Interrupts, GDT
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
                    NeuroOS reimagines the operating system kernel as a biological substrate. Inspired by the human brain's requirement for active neural firing to retain information, often summarized as *use it or lose it*, NeuroOS implements a <strong className="text-white">biomimetic memory persistence model</strong>.
                </p>
                <p className="text-neutral-400">
                    Unlike traditional OSs where memory is static until overwritten, pages in NeuroOS obey a decay function. The kernel's scheduler acts as a <em>synaptic reinforcement agent</em>, actively refreshing (firing) memory regions based on usage frequency, effectively creating <strong>long-term potentiation</strong> for frequently accessed code paths.
                </p>

                <h3>Biomimetic Architecture</h3>
                <ul className="list-disc pl-4 space-y-2 text-neutral-400">
                    <li><strong>Hebbian Allocation:</strong> <code>h_malloc()</code> creates memory blocks with synaptic strength (1.0).</li>
                    <li><strong>Synaptic Pruning:</strong> A background kernel task decays the signal strength of all memory blocks. Usage resets strength.</li>
                    <li><strong>Forgetting:</strong> Unused memory fades away. If strength hits 0, the kernel automatically frees (prunes) the block.</li>
                </ul>
            </motion.section>

            {/* Code Snippet (Visual) */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#050505] border border-neutral-800 rounded-lg p-6 font-mono text-sm overflow-x-auto"
            >
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <pre className="text-neutral-400">
                    {`void k_synaptic_pruning() {
    // Mimic sleep cycle / pruning
    for (int i = 0; i < MAX_SYNAPSES; i++) {
        if (memory_cortex[i].active) {
            // Natural decay
            memory_cortex[i].strength -= DECAY_RATE;
            
            // Forget weak memories
            if (memory_cortex[i].strength <= 0.0f) {
                memory_cortex[i].active = 0; // Lost
                k_print("[PRUNE] Synapse faded.\\n", VGA_RED);
            }
        }
    }`}
                </pre>
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
                        [1] Hebb, D. O. (1949). <em>The Organization of Behavior: A Neuropsychological Theory</em>. Wiley.
                    </p>
                    <p>
                        [2] Tanenbaum, A. S., & Bos, H. (2014). <em>Modern Operating Systems</em> (4th ed.). Pearson.
                    </p>
                    <p>
                        [3] Love, R. (2010). <em>Linux Kernel Development</em> (3rd ed.). Addison-Wesley.
                    </p>
                    <p>
                        [4] Bi, G., & Poo, M. (1998). "Synaptic modifications in cultured hippocampal neurons: dependence on spike timing, synaptic strength, and postsynaptic cell type." <em>Journal of Neuroscience</em>, 18(24), 10464-10472.
                    </p>
                    <p>
                        [5] OSDev Wiki. (2024). "Getting Started." <a href="https://wiki.osdev.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 transition-colors">wiki.osdev.org</a>
                    </p>
                </div>
            </motion.section>
        </article>
    );
}
