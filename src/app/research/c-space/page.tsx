'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Zap, Activity, Grid, Atom } from 'lucide-react';
import { MathInline } from '@/components/math';

export default function CSpacePage() {
    return (
        <article className="max-w-4xl mx-auto px-6 pt-24 pb-24 space-y-16 selection:bg-purple-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px]" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="mb-20">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-neutral-400 hover:text-purple-400 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Index
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <Atom className="w-12 h-12 text-purple-400" />
                            <h1 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-white via-purple-100 to-white/60 bg-clip-text text-transparent">
                                ℂ-Space Engine
                            </h1>
                        </div>

                        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl mb-8">
                            A 2D physics simulation exploring mathematically consistent extensions of classical mechanics into the complex plane. This project investigates what happens when mass, position, and friction become complex numbers, without asserting physical realism.
                        </p>

                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">
                                Physics Simulation
                            </span>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                                C++20 / Python
                            </span>
                        </div>
                    </motion.div>
                </header>

                {/* Theory Section */}
                <section className="mb-24">
                    <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                        <Activity className="w-6 h-6 text-purple-400" />
                        Modified Physics Laws
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-neutral-900/50  backdrop-blur-sm">
                            <h3 className="text-lg font-medium text-white mb-4">I. Complex Inertia</h3>
                            <p className="text-neutral-400 mb-4 text-sm leading-relaxed">
                                Standard physics assumes mass is a Real scalar. In C-Space, mass <MathInline tex="\mu = m_r + i m_i" /> allows for imaginary components.
                            </p>
                            <div className="bg-neutral-950/50 p-4 rounded-lg font-mono text-sm text-purple-200 mb-4">
                                <MathInline tex="\mathbf{F} = \mu \mathbf{a}" />
                            </div>
                            <p className="text-neutral-400 text-sm">
                                <strong className="text-purple-300">Result:</strong> Forces and accelerations can become perpendicular due to the imaginary mass component.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-neutral-900/50  backdrop-blur-sm">
                            <h3 className="text-lg font-medium text-white mb-4">II. Chiral Friction</h3>
                            <p className="text-neutral-400 mb-4 text-sm leading-relaxed">
                                Friction coefficients <MathInline tex="\kappa = k_r + i k_i" /> introduce a rotational drag component.
                            </p>
                            <div className="bg-neutral-950/50 p-4 rounded-lg font-mono text-sm text-purple-200 mb-4">
                                <MathInline tex="\mathbf{F}_{drag} = - (k_r + i k_i) \mathbf{v}" />
                            </div>
                            <p className="text-neutral-400 text-sm">
                                <strong className="text-purple-300">Result:</strong> Particles spiral indefinitely rather than coming to rest.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-neutral-900/50  backdrop-blur-sm col-span-1 md:col-span-2">
                            <h3 className="text-lg font-medium text-white mb-4">III. Conjugate Gravity</h3>
                            <p className="text-neutral-400 mb-4 text-sm leading-relaxed">
                                The inverse-square law extended to the complex plane.
                            </p>
                            <div className="bg-neutral-950/50 p-4 rounded-lg font-mono text-sm text-purple-200 mb-4 text-center">
                                <MathInline tex="F(z) = G \frac{\mu_1 \mu_2}{(z_2 - z_1)^2}" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Visualizations Section */}
                <section className="mb-24">
                    <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                        <Zap className="w-6 h-6 text-yellow-400" />
                        Simulation Results
                    </h2>

                    {/* Visual 1: Diametric Drive */}
                    <div className="mb-12">
                        <div className=" rounded-2xl overflow-hidden bg-neutral-900/30">
                            <div className="aspect-[16/9] relative bg-neutral-950">
                                <Image
                                    src="/research/c-space/diametric-drive.png"
                                    alt="Diametric Drive Simulation Plot"
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                            <div className="p-6 border-t border-neutral-800">
                                <h3 className="text-xl font-medium text-white mb-2">Negative Mass Runaway</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Testing the interaction between positive mass (<MathInline tex="+m" />) and negative mass (<MathInline tex="-m" />). Since <MathInline tex="-m" /> repels <MathInline tex="+m" /> while <MathInline tex="+m" /> attracts <MathInline tex="-m" />, both particles accelerate in the same direction. This concept is theoretically possible in General Relativity but realized here in the C-Space engine.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Visual 2: Death Spiral */}
                    <div className="mb-12">
                        <div className=" rounded-2xl overflow-hidden bg-neutral-900/30">
                            <div className="aspect-square relative bg-white rounded-lg mx-auto mt-6 w-full max-w-md overflow-hidden">
                                <Image
                                    src="/research/c-space/death-spiral.gif"
                                    alt="Chiral Death Spiral Animation"
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 border-t border-neutral-800 mt-6">
                                <h3 className="text-xl font-medium text-white mb-2">Chiral Friction Decay</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Demonstrating the Chiral Friction Law. A particle with initial real velocity experiences complex drag (<MathInline tex="0.05 + 0.3i" />). The imaginary friction component applies rotational force, causing the particle to spiral rather than stopping.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Visual 3: First Light */}
                    <div className="mb-12">
                        <div className=" rounded-2xl overflow-hidden bg-neutral-900/30">
                            <div className="aspect-square relative bg-black rounded-lg mx-auto mt-6 w-full max-w-md overflow-hidden">
                                <Image
                                    src="/research/c-space/first-light.gif"
                                    alt="First Light Simulation"
                                    fill
                                    unoptimized
                                    className="object-contain"
                                />
                            </div>
                            <div className="p-6 border-t border-neutral-800 mt-6">
                                <h3 className="text-xl font-medium text-white mb-2">Complex Orbital Motion</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Testing gravitational orbits with complex gravity (<MathInline tex="F \propto (z_2-z_1)^{-2}" />) and imaginary inertia. The planet traces a precessing trajectory that never forms a closed ellipse, eventually decaying due to Chiral Friction.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Simulation Axioms */}
                <section className="mb-24">
                    <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                        <Activity className="w-6 h-6 text-purple-400" />
                        Simulation Axioms
                    </h2>
                    <div className="p-6 rounded-2xl bg-neutral-900/50  backdrop-blur-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-400">
                            <div>
                                <h4 className="text-purple-300 font-medium mb-3 border-b border-purple-500/20 pb-2">Fundamental Constants</h4>
                                <ul className="space-y-3 font-mono text-xs">
                                    <li className="flex justify-between">
                                        <span>Space</span>
                                        <span className="text-white"><MathInline tex="\mathbb{C}" /> (Complex Plane)</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Time</span>
                                        <span className="text-white"><MathInline tex="t \in \mathbb{R}" /> (Real Stream)</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Gravity (G)</span>
                                        <span className="text-white"><MathInline tex="1.0 + 0i" /></span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-purple-300 font-medium mb-3 border-b border-purple-500/20 pb-2">First Light Config</h4>
                                <ul className="space-y-3 font-mono text-xs">
                                    <li className="flex justify-between">
                                        <span>Sun Mass</span>
                                        <span className="text-white"><MathInline tex="1000 + 0i" /> (Fixed)</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Planet Mass</span>
                                        <span className="text-white"><MathInline tex="10 + 2i" /> (Inertial)</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Friction (k)</span>
                                        <span className="text-white"><MathInline tex="0.05 + 0.01i" /> (Chiral)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section>
                    <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                        <Grid className="w-6 h-6 text-blue-400" />
                        Engine Architecture
                    </h2>
                    <div className="p-6 rounded-2xl bg-neutral-900/50 ">
                        <ul className="space-y-4 text-neutral-400">
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                                <div>
                                    <strong className="text-white">Custom C++20 Kernel</strong>: Manual implementation of complex vector arithmetic and RK4 integration.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                                <div>
                                    <strong className="text-white">4D Phase Space</strong>: Native support for <MathInline tex="\mathbb{C}^2" /> collision detection (overlapping in Real dimensions doesn't guarantee collision if Imaginary depth differs).
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                                <div>
                                    <strong className="text-white">Analysis Pipeline</strong>: CSV export to Python/Matplotlib for phase portrait generation.
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

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
                            [1] Forward, R. L. (1990). "Negative matter propulsion." <em>Journal of Propulsion and Power</em>, 6(1), 28-37.
                        </p>
                        <p>
                            [2] Bondi, H. (1957). "Negative mass in general relativity." <em>Reviews of Modern Physics</em>, 29(3), 423-428.
                        </p>
                        <p>
                            [3] Ablowitz, M. J., & Fokas, A. S. (2003). <em>Complex Variables: Introduction and Applications</em>. Cambridge University Press.
                        </p>
                        <p>
                            [4] Needham, T. (1997). <em>Visual Complex Analysis</em>. Oxford University Press.
                        </p>
                        <p>
                            [5] Hairer, E., Lubich, C., & Wanner, G. (2006). <em>Geometric Numerical Integration: Structure-Preserving Algorithms for Ordinary Differential Equations</em>. Springer.
                        </p>
                    </div>
                </motion.section>
            </div>
        </article>
    );
}
