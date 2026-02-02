"use client";

import { motion, Variants } from "framer-motion";
import { ProjectCard } from "@/components/project-card";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.8
    }
  },
};

export default function Home() {
  return (
    <main className="space-y-32">
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-8 pt-12 md:pt-24"
      >
        <motion.div variants={item} className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white max-w-3xl leading-[1.1]">
            Computational mathematics and<br />
            <span className="text-neutral-500">algorithmic systems.</span>
          </h1>
        </motion.div>

        <motion.p variants={item} className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
          High-precision number theory • Dynamics • Algorithms at scale
        </motion.p>

        <motion.div variants={item} className="flex gap-4 pt-4">
          <a href="#work" className="text-sm font-mono text-white border-b border-neutral-700 hover:border-white transition-colors pb-1">
            View Research
          </a>
          <a href="mailto:as658@snu.edu.in" className="text-sm font-mono text-neutral-500 border-b border-transparent hover:text-white transition-colors pb-1">
            Contact
          </a>
        </motion.div>
      </motion.section>

      {/* Featured Work Section */}
      <motion.section id="work" variants={container} className="space-y-12">
        <motion.div
          variants={item}
          className="flex items-end justify-between border-b border-neutral-800 pb-6"
        >
          <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-wider">Featured Work</h2>
          <span className="text-xs font-mono text-neutral-700">Highest Impact</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard
            title="Discrete Descent Hybrid Algorithm"
            description="Numerical zero verification for the Riemann zeta function up to T = 10¹⁶ using hybrid descent methods and topological interlacing."
            tags={["Number Theory", "C++", "HPC"]}
            href="/research/zeta-zeros"
            year="2025"
            highlight
            progress={95}
            status="Verified"
            coreIdea="O(log n) descent via Gram points instead of O(n) search."
            implication="Proves RH holds at heights where classical methods fail computationally."
          />
          <ProjectCard
            title="Non-Ergodic Random Walks"
            description="Studying ergodicity breaking in Lévy flights with α=1. Exploring the failure of time-average convergence in heavy-tailed systems."
            tags={["Probability Theory", "Stochastic Processes"]}
            href="/research/heavy-tails"
            year="2026"
            highlight
            progress={90}
            status="Negative Theorem"
            coreIdea="Extreme events dominate the history, preventing statistical stabilization."
            implication="Standard financial risk models (using Gaussian assumptions) fundamentally fail here."
          />
          <ProjectCard
            title="NeuroOS Kernel"
            description="Experimental biomimetic kernel exploring memory persistence models inspired by neural reinforcement mechanics."
            tags={["Systems", "Bio-inspired", "C"]}
            href="/engineering/neuro-os"
            year="2025"
            highlight
            progress={60}
            status="Experimental"
            coreIdea="Memory pages decay over time and must be 'reinforced' by usage."
            implication="An operating system that 'forgets' unused data naturally like a brain."
          />
          <ProjectCard
            title="ℂ-Space Engine"
            description="A generalized 2D physics engine simulating a universe where physical constants are Complex Numbers."
            tags={["Physics Sim", "C++20", "Complex Analysis"]}
            href="/research/c-space"
            year="2025"
            highlight
            progress={75}
            status="Simulation"
            coreIdea="Extending Newton's laws to the Complex plane (Imaginary mass & friction)."
            implication="Predicts 'Death Spirals' and 'Negative Mass Runaways' in exotic physics."
          />
        </div>
      </motion.section>

      {/* Other Projects Section */}
      <motion.section variants={container} className="space-y-12">
        <motion.div
          variants={item}
          className="flex items-end justify-between border-b border-neutral-800 pb-6"
        >
          <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-wider">Other Projects</h2>
          <span className="text-xs font-mono text-neutral-700">2025 - 2026</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard
            title="Kolakoski Sequence Analysis"
            description="Investigating structural properties of the Kolakoski sequence density using graph-theoretic approaches on a 34-state manifold."
            tags={["Combinatorics", "Graph Theory", "Python"]}
            href="/research/kolakoski"
            year="2026"
            progress={90}
          />
          <ProjectCard
            title="Kimberling Expulsion Conjecture"
            description="Analyzing the Kimberling expulsion process using an O(1) state recurrence. Found record survivor (67B steps)."
            tags={["Dynamics", "Probability", "C++"]}
            href="/research/kimberling"
            year="2025"
            progress={85}
          />
          <ProjectCard
            title="Twin Prime Cluster"
            description="Distributed computing architecture for validating twin prime candidates at scale. Validating 400+ candidates simultaneously."
            tags={["Distributed Systems", "Cloud", "Python"]}
            href="/research/twin-primes"
            year="2025"
            progress={80}
          />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="pt-32 pb-8 border-t border-neutral-900 flex justify-between items-end">
        <div className="space-y-2">
          <p className="text-sm text-neutral-500">Akshit Sivaraman</p>
          <p className="text-xs text-neutral-700 font-mono">Shiv Nadar Institute of Eminence</p>
        </div>
        <div className="flex gap-6">
          <a href="https://github.com/shiviatrix" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-neutral-600 hover:text-white transition-colors">GitHub</a>
          <a href="mailto:as658@snu.edu.in" className="text-xs font-mono text-neutral-600 hover:text-white transition-colors">Email</a>
        </div>
      </footer>
    </main>
  );
}
