import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ── Floating Orbs ─────────────────────────────────────────── */
const ORBS = [
    { w: 650, h: 650, top: -160, left: -120, color: 'rgba(6,182,212,0.20)', delay: 0, dur: 14 },
    { w: 500, h: 500, bottom: -110, right: -90, color: 'rgba(59,130,246,0.18)', delay: 2, dur: 11 },
    { w: 320, h: 320, bottom: '12%', left: '6%', color: 'rgba(99,102,241,0.14)', delay: 4, dur: 9 },
    { w: 250, h: 250, top: '40%', right: '10%', color: 'rgba(6,182,212,0.10)', delay: 6, dur: 13 },
];

/* ── Tiny floating particles ───────────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 2.5 + 1,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.45 + 0.15,
    dur: Math.random() * 8 + 6,
    rise: Math.random() * 80 + 30,
    delay: Math.random() * 10,
    color: ['rgba(6,182,212,', 'rgba(96,165,250,', 'rgba(167,139,250,', 'rgba(34,211,238,'][i % 4],
}));

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

            {/* Cyber grid */}
            <div className="absolute inset-0 cyber-grid opacity-60" />

            {/* Scan line */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: 'linear-gradient(transparent 0%, rgba(6,182,212,0.04) 50%, transparent 100%)',
                    backgroundSize: '100% 6px',
                    animation: 'scanDown 8s linear infinite',
                }}
            />

            {/* Top neon accent stripe */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(6,182,212,0.55) 30%,rgba(96,165,250,0.70) 50%,rgba(6,182,212,0.55) 70%,transparent)' }}
            />

            {/* Deep background radials */}
            <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 85% 60% at 50% -5%, #0c1f3a 0%, #020817 55%)' }}
            />

            {/* Animated orbs */}
            {ORBS.map((orb, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: orb.w,
                        height: orb.h,
                        top: orb.top ?? 'auto',
                        left: orb.left ?? 'auto',
                        bottom: orb.bottom ?? 'auto',
                        right: orb.right ?? 'auto',
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
                        filter: 'blur(88px)',
                    }}
                    animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: orb.dur, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
                />
            ))}

            {/* Floating particles */}
            {PARTICLES.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.x,
                        top: p.y,
                        background: `${p.color}${p.opacity.toFixed(2)})`,
                    }}
                    animate={{ y: [0, -p.rise, 0], opacity: [0, p.opacity, 0], scale: [0, 1, 0] }}
                    transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
                />
            ))}
        </div>
    );
}
