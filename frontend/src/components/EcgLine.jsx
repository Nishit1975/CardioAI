import { motion } from 'framer-motion';

/* Renders a single animated ECG heartbeat line as an SVG */
export default function EcgLine({ className = '', color = 'rgba(6,182,212,0.55)', width = 800, height = 56 }) {
    // Repeating ECG path segment — doubled so we can scroll it seamlessly
    const segment = `M0,28 L30,28 L38,28 L44,8 L50,48 L56,28 L62,28 L72,28 L78,20 L82,28 L90,28 L120,28 L128,28 L134,6 L140,50 L146,28 L152,28 L162,28 L168,22 L172,28 L180,28 L210,28`;
    const fullPath = `${segment} L${width / 2},28 ${segment.slice(1).replace(/L(\d+)/g, (m, n) => `L${parseInt(n) + width / 2}`)} L${width},28`;

    return (
        <div className={`overflow-hidden ${className}`} style={{ height }}>
            <svg
                width={width * 2}
                height={height}
                viewBox={`0 0 ${width * 2} ${height}`}
                style={{ animation: 'ecgScroll 6s linear infinite' }}
            >
                <defs>
                    <linearGradient id="ecgGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={color} stopOpacity="0" />
                        <stop offset="20%" stopColor={color} stopOpacity="1" />
                        <stop offset="80%" stopColor={color} stopOpacity="1" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                    <filter id="ecgGlow">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
                {/* Glow layer */}
                <path d={fullPath} fill="none" stroke={color} strokeWidth="4" strokeOpacity="0.25" filter="url(#ecgGlow)" />
                {/* Sharp line */}
                <path d={fullPath} fill="none" stroke="url(#ecgGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Duplicate for seamless loop */}
                <path d={fullPath} fill="none" stroke="url(#ecgGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform={`translate(${width}, 0)`} />
            </svg>
        </div>
    );
}
