"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.8, // Slightly faster for responsiveness
            easing: (t) => 1 - Math.pow(1 - t, 3), // Standard easeOutCubic
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1, // Standard speed
            touchMultiplier: 1.5, // Reduced sensitivity
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
