import { motion } from 'framer-motion';
import { Database, Zap, Award } from 'lucide-react';

const stats = [
  { icon: Database, label: 'Training Samples', value: '70,000+' },
  { icon: Zap, label: 'Model Accuracy', value: '~73%' },
  { icon: Award, label: 'Algorithm', value: 'ML Ensemble' },
];

export default function StatsBar() {
  return (
    <motion.div className="flex justify-center mt-2 mb-6 px-1"
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center px-4 md:px-6 py-2">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={11} className="text-cyan-500/50" strokeWidth={1.5} />
                <span className="font-syne text-sm font-bold text-slate-300">{stat.value}</span>
              </div>
              <span className="font-dm-mono text-[9px] text-slate-600 uppercase tracking-widest whitespace-nowrap">{stat.label}</span>
            </div>
            {i < stats.length - 1 && (
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent" />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}