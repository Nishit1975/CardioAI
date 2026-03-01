import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer className="relative z-10 flex flex-col items-center gap-3 pb-10 px-4 mt-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
      <div className="w-32 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.15), transparent)' }} />
      <div className="flex items-center gap-2">
        <span className="font-dm-mono text-[10px] text-slate-600 tracking-widest uppercase">Built with</span>
        <Heart size={10} className="text-cyan-500/50" fill="rgba(34,211,238,0.5)" />
        <span className="font-dm-mono text-[10px] text-slate-600 tracking-widest uppercase">for educational research</span>
      </div>
      <p className="font-dm-mono text-[9px] text-slate-700 tracking-wider text-center">
        CardioAI — A University ML Portfolio Project<br/>
        React · Flask · Scikit-Learn · Tailwind CSS
      </p>
    </motion.footer>
  );
}