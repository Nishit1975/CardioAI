import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <motion.div className="flex flex-col items-center justify-center gap-6 py-8"
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>

      <div className="relative flex items-center justify-center">
        <motion.div className="absolute rounded-full border border-cyan-500/20" style={{ width: 80, height: 80 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.div className="absolute rounded-full border border-cyan-500/15" style={{ width: 100, height: 100 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />

        <div className="relative w-14 h-14">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="2" />
            <motion.circle cx="28" cy="28" r="24" fill="none" stroke="url(#spinnerGrad)" strokeWidth="2"
              strokeLinecap="round" strokeDasharray="150"
              animate={{ strokeDashoffset: [150, 0, 150] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
            <defs>
              <linearGradient id="spinnerGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(34,211,238,0.9)"
              animate={{ scale: [1, 1.2, 1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </motion.svg>
          </div>
        </div>
      </div>

      <div className="text-center space-y-1">
        <motion.p className="font-syne text-sm font-semibold text-cyan-400"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          Analyzing cardiac data...
        </motion.p>
        <p className="font-dm-mono text-[10px] text-slate-500 tracking-widest uppercase">ML model processing</p>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map(i => (
          <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
        ))}
      </div>
    </motion.div>
  );
}