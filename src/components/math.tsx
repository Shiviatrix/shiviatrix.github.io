"use client";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

export function MathInline({ tex }: { tex: string }) {
    return <span className="font-mono text-sm"><InlineMath math={tex} /></span>;
}

export function MathBlock({ tex }: { tex: string }) {
    return (
        <div className="overflow-x-auto py-2">
            <BlockMath math={tex} />
        </div>
    );
}
