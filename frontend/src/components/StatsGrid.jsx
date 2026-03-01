import { motion } from 'framer-motion';
import { Database, Zap, Award, ShieldCheck } from 'lucide-react';

const STATS = [
    { icon: Database, value: '70K+', label: 'Training Samples', color: 'rgba(6,182,212,0.7)' },
    { icon: Zap, value: '~73%', label: 'Model Accuracy', color: 'rgba(96,165,250,0.7)' },
    { icon: Award, value: 'LR', label: 'Algorithm', color: 'rgba(167,139,250,0.7)' },
    { icon: ShieldCheck, value: 'Binary', label: 'Classification', color: 'rgba(34,211,238,0.7)' },
];

export default function StatsGrid() {
    return (
        <motion.div
            className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto px-4 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
            {STATS.map(({ icon: Icon, value, label, color }, i) => (
                <motion.div
                    key={label}
                    className="stat-card"
                    whileHover={{ scale: 1.03, y: -3 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                    <div className="flex items-center justify-center mb-2">
                        <Icon size={16} style={{ color }} strokeWidth={1.5} />
                    </div>
                    <p className="font-orbitron text-lg font-bold text-slate-100 leading-none mb-1">{value}</p>
                    <p className="text-[0.6rem] uppercase tracking-widest text-slate-500">{label}</p>
                </motion.div>
            ))}
        </motion.div>
    );
}
