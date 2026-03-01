import { motion } from 'framer-motion';
import { Activity, Cpu } from 'lucide-react';

export default function Header() {
  return (
    <motion.header className="relative z-10 flex flex-col items-center text-center pt-12 pb-8 px-4"
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

      <motion.div className="relative flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
        style={{ background: 'linear-gradient(135deg, rgba(8,145,178,0.2), rgba(14,116,144,0.1))', border: '1px solid rgba(34,211,238,0.2)', boxShadow: '0 0 30px rgba(34,211,238,0.12)' }}
        animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        {[1, 2].map(i => (
          <motion.div key={i} className="absolute inset-0 rounded-2xl border border-cyan-500/20"
            animate={{ scale: [1, 1.4 + i * 0.2], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
          />
        ))}
        <motion.svg width="30" height="30" viewBox="0 0 24 24" fill="rgba(34,211,238,0.9)"
          animate={{ scale: [1, 1.12, 1, 1.08, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
        </motion.svg>
      </motion.div>

      <motion.div className="flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
        style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)' }}
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
        <Cpu size={10} className="text-cyan-400" />
        <span className="font-dm-mono text-[10px] text-cyan-400/80 tracking-[0.2em] uppercase">Machine Learning · Cardiovascular</span>
      </motion.div>

      <motion.h1 className="font-syne text-4xl md:text-5xl font-bold mb-3"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <span className="shimmer-text">Cardio</span>
      </motion.h1>

      <motion.p className="font-dm-sans text-sm md:text-base text-slate-400 font-light max-w-sm leading-relaxed"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
        Cardiovascular risk prediction powered by{' '}
        <span className="text-cyan-400/80 font-normal">advanced machine learning</span>
      </motion.p>

      <motion.div className="flex items-center gap-3 mt-6 w-full max-w-xs"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/20" />
        <Activity size={12} className="text-cyan-500/40" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/20" />
      </motion.div>
    </motion.header>
  );
}