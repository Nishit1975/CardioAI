import { motion } from 'framer-motion';
import { Activity, Cpu } from 'lucide-react';
import EcgLine from './EcgLine';

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
    return (
        <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col items-center text-center pt-14 pb-4 px-4"
        >
            {/* Animated heart icon */}
            <motion.div
                variants={item}
                className="relative flex items-center justify-center w-20 h-20 mb-6 rounded-2xl"
                style={{
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.18) 0%, rgba(59,130,246,0.12) 100%)',
                    border: '1px solid rgba(6,182,212,0.22)',
                    boxShadow: '0 0 28px rgba(6,182,212,0.18)',
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                {/* Pulse rings */}
                {[1, 2].map(i => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-2xl border border-cyan-500/20"
                        animate={{ scale: [1, 1.5 + i * 0.2], opacity: [0.45, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
                    />
                ))}
                {/* Heart SVG */}
                <motion.svg
                    width="34" height="34" viewBox="0 0 24 24"
                    fill="rgba(6,182,212,0.90)"
                    animate={{ scale: [1, 1.18, 1, 1.10, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                >
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                </motion.svg>
            </motion.div>

            {/* Badge */}
            <motion.div variants={item} className="badge-neon mb-5">
                <Cpu size={10} />
                <span>Machine Learning · Cardiovascular AI</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1 variants={item} className="heading-orbitron text-5xl md:text-6xl font-bold mb-4 leading-tight">
                CardioAI
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
                variants={item}
                className="text-sm md:text-base text-slate-400 font-light max-w-md leading-relaxed mb-2"
            >
                Advanced cardiovascular risk prediction powered by{' '}
                <span className="text-cyan-400/80 font-medium">machine learning</span>
            </motion.p>

            {/* ECG line */}
            <motion.div variants={item} className="w-full max-w-xs mt-5">
                <EcgLine />
            </motion.div>

            {/* Divider */}
            <motion.div variants={item} className="flex items-center gap-3 mt-4 w-full max-w-xs">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/20" />
                <Activity size={12} className="text-cyan-500/40" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/20" />
            </motion.div>
        </motion.section>
    );
}
