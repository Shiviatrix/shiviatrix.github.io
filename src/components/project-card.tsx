"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    href: string;
    year?: string;
    highlight?: boolean;
    progress?: number; // 0-100
}

export function ProjectCard({ title, description, tags, href, year, highlight, progress }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={clsx(
                "group relative flex flex-col gap-4 p-6 rounded-lg border border-transparent transition-colors duration-300",
                "hover:bg-neutral-900/50 hover:border-neutral-800",
                highlight && "bg-neutral-900/20 border-neutral-800/50"
            )}
        >
            <Link href={href} className="absolute inset-0 z-10">
                <span className="sr-only">View {title}</span>
            </Link>

            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h3 className="text-xl font-medium tracking-tight text-neutral-100 group-hover:text-white transition-colors">
                        {title}
                    </h3>
                    {year && <span className="text-xs font-mono text-neutral-500">{year}</span>}
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>

            <p className="text-neutral-400 leading-relaxed max-w-md">
                {description}
            </p>

            {progress !== undefined && (
                <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-neutral-600">Progress</span>
                        <span className="text-neutral-500">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                        <motion.div
                            className={clsx(
                                "h-full rounded-full",
                                progress >= 90 ? "bg-gradient-to-r from-green-500 to-emerald-500" :
                                    progress >= 70 ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
                                        progress >= 50 ? "bg-gradient-to-r from-yellow-500 to-orange-500" :
                                            "bg-gradient-to-r from-red-500 to-pink-500"
                            )}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono text-neutral-500 bg-neutral-900/50 border border-neutral-800 rounded transition-colors group-hover:text-neutral-300 group-hover:border-neutral-700"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
