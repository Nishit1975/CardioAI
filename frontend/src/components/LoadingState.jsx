import { motion } from 'framer-motion';

export default function LoadingState() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-16 gap-8"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4 }}
        >
            {/* Spinner with beating heart */}
            <div className="relative flex items-center justify-center">
                {/* Outer pulse rings */}
                {[80, 100].map((size, i) => (
                    <motion.div
                        key={size}
                        className="absolute rounded-full border border-cyan-500/20"
                        style={{ width: size, height: size }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
                    />
                ))}

                {/* SVG ring */}
                <div className="relative w-16 h-16">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(6,182,212,0.08)" strokeWidth="2.5" />
                        <motion.circle
                            cx="32" cy="32" r="28" fill="none"
                            stroke="url(#spinGrad)" strokeWidth="2.5"
                            strokeLinecap="round" strokeDasharray="176"
                            animate={{ strokeDashoffset: [176, 0, 176] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <defs>
                            <linearGradient id="spinGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Centre heart */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.svg
                            width="22" height="22" viewBox="0 0 24 24"
                            fill="rgba(6,182,212,0.88)"
                            animate={{ scale: [1, 1.22, 1, 1.12, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                        >
                            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                        </motion.svg>
                    </div>
                </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-1">
                <motion.p
                    className="font-orbitron text-sm font-semibold text-cyan-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Analyzing cardiac data…
                </motion.p>
                <p className="text-[0.6rem] uppercase tracking-widest text-slate-500">
                    ML model processing
                </p>
            </div>

            {/* Dot pulse row */}
            <div className="flex gap-2">
                {[0, 1, 2, 3].map(i => (
                    <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-cyan-500"
                        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.22 }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
