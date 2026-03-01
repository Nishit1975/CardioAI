import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

export default function ErrorAlert({ message, onDismiss }) {
  return (
    <motion.div className="relative flex items-start gap-3 px-4 py-3.5 rounded-xl overflow-hidden"
      style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', boxShadow: '0 0 20px rgba(239,68,68,0.1)' }}
      initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: -10, height: 0 }} transition={{ duration: 0.3 }}>

      <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
      <p className="flex-1 font-dm-mono text-[11px] text-red-300/90 leading-relaxed tracking-wide">{message}</p>

      {onDismiss && (
        <motion.button onClick={onDismiss} className="text-red-400/50 hover:text-red-400 transition-colors"
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <X size={13} />
        </motion.button>
      )}
    </motion.div>
  );
}