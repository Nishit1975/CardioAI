import { motion, AnimatePresence } from 'framer-motion';

export default function FormInput({ label, name, type = 'number', value, placeholder, icon: Icon, unit, error, touched, onChange, onBlur, min, max, hint, options }) {
  const hasError = touched && error;
  const isValid = touched && !error && value !== '';

  return (
    <motion.div className="flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

      <div className="flex items-center justify-between">
        <label className="label-tag" htmlFor={name}>{label}</label>
        {unit && <span className="font-dm-mono text-[10px] text-cyan-400/40 uppercase tracking-wider">{unit}</span>}
      </div>

      <div className="relative group">
        {Icon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 ${hasError ? 'text-red-400/70' : isValid ? 'text-cyan-400/80' : 'text-cyan-500/30 group-hover:text-cyan-500/50'}`}>
            <Icon size={15} strokeWidth={1.5} />
          </div>
        )}

        {options ? (
          <select id={name} name={name} value={value} onChange={onChange} onBlur={onBlur}
            className={`w-full glass-input rounded-xl py-3 pr-4 font-dm-sans text-sm text-slate-200 cursor-pointer transition-all duration-300 appearance-none ${Icon ? 'pl-10' : 'pl-4'} ${hasError ? 'border-red-500/50' : ''} ${isValid ? 'border-cyan-500/30' : ''}`}>
            <option value="" disabled className="bg-[#050c14]">{placeholder}</option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-[#050c14]">{opt.label}</option>
            ))}
          </select>
        ) : (
          <input id={name} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur}
            placeholder={placeholder} min={min} max={max}
            className={`w-full glass-input rounded-xl py-3 pr-4 font-dm-sans text-sm text-slate-200 placeholder-slate-600 transition-all duration-300 ${Icon ? 'pl-10' : 'pl-4'} ${hasError ? 'border-red-500/50' : ''} ${isValid ? 'border-cyan-500/30' : ''}`}
          />
        )}

        <AnimatePresence>
          {isValid && (
            <motion.div className="absolute right-3 top-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />
                <path d="M4.5 7L6.2 8.7L9.5 5.5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hasError && (
            <motion.div className="absolute right-3 top-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.5)" strokeWidth="1" />
                <path d="M7 4V7.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="7" cy="9.5" r="0.75" fill="#ef4444" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {hasError ? (
          <motion.p key="error" className="font-dm-mono text-[10px] text-red-400/80 tracking-wide"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            ⚠ {error}
          </motion.p>
        ) : hint && !touched ? (
          <motion.p key="hint" className="font-dm-mono text-[10px] text-slate-600 tracking-wide"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {hint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}