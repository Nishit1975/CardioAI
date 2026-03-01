import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Ruler, Weight, Activity, Heart, ArrowRight, FlaskConical } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { predictRisk } from '../api';
import FormInput from '../components/FormInput';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultCard from '../components/ResultCard';
import ErrorAlert from '../components/ErrorAlert';

const fieldGroups = [
  {
    title: 'Patient Identity', icon: User,
    fields: [
      { name: 'age', label: 'Age', placeholder: 'e.g. 45', icon: User, unit: 'years', min: 1, max: 120 },
      { name: 'gender', label: 'Biological Sex', placeholder: 'Select sex...', icon: User, options: [{ value: '0', label: '♀ Female' }, { value: '1', label: '♂ Male' }] },
    ],
  },
  {
    title: 'Body Metrics', icon: Ruler,
    fields: [
      { name: 'height', label: 'Height', placeholder: 'e.g. 170', icon: Ruler, unit: 'cm', min: 50, max: 250 },
      { name: 'weight', label: 'Weight', placeholder: 'e.g. 70', icon: Weight, unit: 'kg', min: 10, max: 300 },
    ],
  },
  {
    title: 'Blood Pressure', icon: Activity,
    fields: [
      { name: 'ap_hi', label: 'Systolic BP', placeholder: 'e.g. 120', icon: Heart, unit: 'mmHg', min: 60, max: 250 },
      { name: 'ap_lo', label: 'Diastolic BP', placeholder: 'e.g. 80', icon: Activity, unit: 'mmHg', min: 40, max: 200 },
    ],
  },
];

export default function PredictPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);
  const { values, errors, touched, handleChange, handleBlur, validateAll, reset } = useForm();

  const handleSubmit = useCallback(async () => {
    setApiError(null);
    if (!validateAll()) return;
    setIsLoading(true);
    try {
      const data = await predictRisk(values);
      if (data.success) setResult(data.prediction);
      else setApiError('Unexpected response from server.');
    } catch (err) {
      setApiError(err.userMessage || 'Failed to connect. Make sure Flask API is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  }, [values, validateAll]);

  const handleReset = useCallback(() => { setResult(null); setApiError(null); reset(); }, [reset]);
  const handleKeyDown = useCallback((e) => { if (e.key === 'Enter') handleSubmit(); }, [handleSubmit]);

  const filledCount = Object.values(values).filter(v => v !== '').length;
  const progress = (filledCount / 6) * 100;

  return (
    <motion.div className="relative z-10 w-full max-w-lg mx-auto px-4 pb-16"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      <AnimatePresence mode="wait">
        {result ? (
          <ResultCard key="result" result={result} onReset={handleReset} />
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <div className="glass-panel rounded-3xl overflow-hidden" style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.08)' }}>

              {/* Card header */}
              <div className="px-6 pt-6 pb-5" style={{ background: 'linear-gradient(180deg, rgba(34,211,238,0.05) 0%, transparent 100%)', borderBottom: '1px solid rgba(34,211,238,0.08)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>
                      <FlaskConical size={15} className="text-cyan-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="font-syne text-sm font-bold text-slate-200">Patient Assessment</h2>
                      <p className="font-dm-mono text-[10px] text-slate-500 tracking-wider">6 biomarkers required</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="font-dm-mono text-[10px] text-cyan-400/60">{filledCount}/6</span>
                    <div className="w-20 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #0891b2, #22d3ee)', boxShadow: '0 0 6px rgba(34,211,238,0.4)' }}
                        animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: 'easeOut' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <div className="px-6 py-5 space-y-6">
                <AnimatePresence>
                  {apiError && <ErrorAlert message={apiError} onDismiss={() => setApiError(null)} />}
                </AnimatePresence>

                {fieldGroups.map((group, groupIdx) => {
                  const GroupIcon = group.icon;
                  return (
                    <motion.div key={group.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + groupIdx * 0.1 }}>
                      <div className="flex items-center gap-2 mb-3">
                        <GroupIcon size={11} className="text-cyan-500/40" strokeWidth={1.5} />
                        <span className="label-tag">{group.title}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/10 to-transparent" />
                      </div>
                      <div className="grid grid-cols-2 gap-3" onKeyDown={handleKeyDown}>
                        {group.fields.map(field => (
                          <FormInput key={field.name} {...field}
                            value={values[field.name]} error={errors[field.name]}
                            touched={touched[field.name]} onChange={handleChange} onBlur={handleBlur} />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}

                <AnimatePresence>{isLoading && <LoadingSpinner />}</AnimatePresence>

                {!isLoading && (
                  <motion.div className="pt-2 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <motion.button onClick={handleSubmit} disabled={isLoading}
                      className="btn-primary w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-syne text-sm font-bold tracking-wide text-white"
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                      <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="white"
                        animate={{ scale: [1, 1.15, 1, 1.1, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
                        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                      </motion.svg>
                      Analyze Cardiovascular Risk
                      <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowRight size={14} strokeWidth={2} />
                      </motion.div>
                    </motion.button>
                    <p className="text-center font-dm-mono text-[9px] text-slate-600 tracking-wider uppercase">
                      🔒 Data is processed locally · Not stored
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}