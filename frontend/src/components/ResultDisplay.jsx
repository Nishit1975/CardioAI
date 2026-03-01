import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, RotateCcw } from 'lucide-react';

/* ── Circular Gauge ─────────────────────────────────────────── */
function CircularGauge({ percentage, isHigh }) {
    const R = 52;
    const CIRCUM = 2 * Math.PI * R;
    const remaining = CIRCUM * (1 - percentage / 100);
    const color = isHigh ? '#ef4444' : '#22c55e';
    const glowColor = isHigh ? 'rgba(239,68,68,0.55)' : 'rgba(34,197,94,0.55)';

    return (
        <div className="relative flex items-center justify-center w-36 h-36 mx-auto">
            {/* Subtle pulse ring */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${color}`, opacity: 0.3 }}
                animate={{ scale: [1, 1.14, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.8, repeat: Infinity }}
            />

            <svg className="-rotate-90" width="144" height="144" viewBox="0 0 144 144">
                <defs>
                    <filter id={`gaugeGlow-${isHigh}`}>
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <linearGradient id={`gaugeGrad-${isHigh}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={color} stopOpacity="0.7" />
                        <stop offset="100%" stopColor={color} stopOpacity="1" />
                    </linearGradient>
                </defs>

                {/* Track */}
                <circle cx="72" cy="72" r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />

                {/* Glow arc */}
                <motion.circle
                    cx="72" cy="72" r={R} fill="none"
                    stroke={color} strokeWidth="14"
                    strokeLinecap="round" strokeOpacity="0.18"
                    strokeDasharray={CIRCUM}
                    initial={{ strokeDashoffset: CIRCUM }}
                    animate={{ strokeDashoffset: remaining }}
                    transition={{ duration: 1.6, delay: 0.3, ease: [0.34, 1, 0.64, 1] }}
                    filter={`url(#gaugeGlow-${isHigh})`}
                />

                {/* Main arc */}
                <motion.circle
                    cx="72" cy="72" r={R} fill="none"
                    stroke={`url(#gaugeGrad-${isHigh})`}
                    strokeWidth="9" strokeLinecap="round"
                    strokeDasharray={CIRCUM}
                    initial={{ strokeDashoffset: CIRCUM }}
                    animate={{ strokeDashoffset: remaining }}
                    transition={{ duration: 1.6, delay: 0.3, ease: [0.34, 1, 0.64, 1] }}
                />
            </svg>

            {/* Centre label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="font-orbitron text-2xl font-bold leading-none"
                    style={{ color }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 280 }}
                >
                    {percentage}%
                </motion.span>
                <span className="text-[0.55rem] tracking-widest uppercase text-slate-500 mt-0.5">risk score</span>
            </div>
        </div>
    );
}

/* ── Recommendation rows ────────────────────────────────────── */
function RecRow({ text, isHigh, delay }) {
    const dot = isHigh ? '#ef4444' : '#22c55e';
    return (
        <motion.div
            className="flex items-center gap-3 py-2 px-3 rounded-xl"
            style={{ background: isHigh ? 'rgba(239,68,68,0.05)' : 'rgba(34,197,94,0.04)' }}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.45 }}
        >
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
            <span className="text-sm text-slate-300 font-light">{text}</span>
        </motion.div>
    );
}

/* ── Main result card ───────────────────────────────────────── */
export default function ResultDisplay({ result, confidence, onReset }) {
    const isHigh = result === 'High Risk';
    const color = isHigh ? '#ef4444' : '#22c55e';
    const percentage = confidence != null
        ? Math.round(confidence)
        : isHigh ? 82 : 18;

    const Icon = isHigh ? ShieldAlert : ShieldCheck;

    const recs = isHigh
        ? ['Consult a cardiologist immediately', 'Monitor blood pressure daily', 'Adopt a low-sodium diet', 'Begin supervised exercise program']
        : ['Maintain current healthy habits', 'Annual cardiovascular check-up', 'Stay physically active', 'Continue balanced nutrition'];

    return (
        <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.90, y: -20 }}
            transition={{ duration: 0.65, ease: [0.34, 1.06, 0.64, 1] }}
            className="card overflow-hidden"
            style={{
                background: isHigh ? 'rgba(24,4,4,0.72)' : 'rgba(3,18,10,0.70)',
                border: `1px solid ${isHigh ? 'rgba(239,68,68,0.28)' : 'rgba(34,197,94,0.26)'}`,
                boxShadow: isHigh
                    ? '0 0 55px rgba(239,68,68,0.14), 0 16px 48px rgba(0,0,0,0.6)'
                    : '0 0 55px rgba(34,197,94,0.13), 0 16px 48px rgba(0,0,0,0.6)',
            }}
        >
            {/* Ambient top glow */}
            <motion.div
                className="absolute inset-x-0 top-0 h-32 pointer-events-none"
                style={{
                    background: isHigh
                        ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(239,68,68,0.16), transparent)'
                        : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.14), transparent)',
                }}
                animate={{ opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative p-6 space-y-5">
                {/* Header row */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        {/* Icon box */}
                        <motion.div
                            className="relative flex items-center justify-center w-14 h-14 rounded-2xl"
                            style={{
                                background: isHigh ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.10)',
                                border: `1px solid ${isHigh ? 'rgba(239,68,68,0.30)' : 'rgba(34,197,94,0.26)'}`,
                            }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            <Icon size={26} color={color} strokeWidth={1.5} />
                            <motion.div
                                className="absolute inset-0 rounded-2xl"
                                style={{ border: `1px solid ${color}` }}
                                animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>

                        <div>
                            <p className="field-label-text text-slate-500 mb-1">Prediction Result</p>
                            <motion.h2
                                className="font-orbitron text-xl font-bold"
                                style={{ color }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {result}
                            </motion.h2>
                        </div>
                    </div>

                    {/* Status badge */}
                    <motion.div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.62rem] font-bold tracking-wider uppercase"
                        style={{
                            background: isHigh ? 'rgba(239,68,68,0.10)' : 'rgba(34,197,94,0.08)',
                            border: `1px solid ${isHigh ? 'rgba(239,68,68,0.32)' : 'rgba(34,197,94,0.28)'}`,
                            color,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.3 }}
                    >
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: color }}
                            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {result}
                    </motion.div>
                </div>

                {/* Circular gauge */}
                <CircularGauge percentage={percentage} isHigh={isHigh} />

                {/* Divider */}
                <div
                    className="h-px w-full"
                    style={{
                        background: `linear-gradient(90deg,transparent,${isHigh ? 'rgba(239,68,68,0.28)' : 'rgba(34,197,94,0.24)'},transparent)`,
                    }}
                />

                {/* Recommendations */}
                <div>
                    <p className="field-label-text text-slate-500 mb-3">Clinical Recommendations</p>
                    <div className="space-y-1.5">
                        {recs.map((rec, i) => (
                            <RecRow key={i} text={rec} isHigh={isHigh} delay={0.45 + i * 0.09} />
                        ))}
                    </div>
                </div>

                {/* Disclaimer */}
                <motion.div
                    className="px-3 py-2.5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                >
                    <p className="text-[0.58rem] text-slate-500 leading-relaxed tracking-wide">
                        ⚠ This prediction is for educational purposes only. Always consult a certified medical professional.
                    </p>
                </motion.div>

                {/* Reset button */}
                <motion.button
                    onClick={onReset}
                    className="btn-ghost w-full flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                    whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                >
                    <RotateCcw size={14} strokeWidth={2} />
                    Run New Analysis
                </motion.button>
            </div>
        </motion.div>
    );
}
