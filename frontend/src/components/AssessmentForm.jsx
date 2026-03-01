import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Ruler, Weight, Heart, Activity, FlaskConical, ArrowRight, AlertCircle, X } from 'lucide-react';

/* ── Field definitions ──────────────────────────────────────── */
const GROUPS = [
    {
        id: 'identity',
        label: 'Patient Identity',
        icon: User,
        fields: [
            {
                name: 'age', label: 'Age', unit: 'years', type: 'number',
                placeholder: '45', icon: User, min: 1, max: 120,
                hint: '1 – 120',
            },
            {
                name: 'gender', label: 'Biological Sex', type: 'select',
                placeholder: 'Select…', icon: User,
                options: [
                    { value: '1', label: '♀  Female' },
                    { value: '2', label: '♂  Male' },
                ],
            },
        ],
    },
    {
        id: 'body',
        label: 'Body Metrics',
        icon: Ruler,
        fields: [
            { name: 'height', label: 'Height', unit: 'cm', type: 'number', placeholder: '170', icon: Ruler, min: 50, max: 250 },
            { name: 'weight', label: 'Weight', unit: 'kg', type: 'number', placeholder: '70', icon: Weight, min: 10, max: 300 },
        ],
    },
    {
        id: 'bp',
        label: 'Blood Pressure',
        icon: Activity,
        fields: [
            { name: 'ap_hi', label: 'Systolic BP', unit: 'mmHg', type: 'number', placeholder: '120', icon: Heart, min: 60, max: 250 },
            { name: 'ap_lo', label: 'Diastolic BP', unit: 'mmHg', type: 'number', placeholder: '80', icon: Activity, min: 40, max: 200 },
        ],
    },
];

/* ── Validation ─────────────────────────────────────────────── */
function validate(name, value) {
    if (value === '' || value === undefined) return 'Required';
    const n = Number(value);
    const rules = {
        age: [1, 120, 'Must be 1–120'],
        gender: null,
        height: [50, 250, 'Must be 50–250 cm'],
        weight: [10, 300, 'Must be 10–300 kg'],
        ap_hi: [60, 250, 'Must be 60–250 mmHg'],
        ap_lo: [40, 200, 'Must be 40–200 mmHg'],
    };
    const rule = rules[name];
    if (!rule) return null;
    if (isNaN(n) || n < rule[0] || n > rule[1]) return rule[2];
    return null;
}

/* ── Sub-components ─────────────────────────────────────────── */
function FieldInput({ field, value, error, touched, onChange, onBlur }) {
    const hasError = touched && error;
    const isOk = touched && !error && value !== '';

    return (
        <motion.div
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Label row */}
            <div className="field-label">
                <span className="field-label-text">{field.label}</span>
                {field.unit && <span className="field-unit">{field.unit}</span>}
            </div>

            {/* Input wrapper */}
            <div className="relative group">
                {/* Icon */}
                <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 ${hasError ? 'text-red-400/70' : isOk ? 'text-cyan-400/80' : 'text-cyan-500/30 group-hover:text-cyan-500/50'
                        }`}
                >
                    <field.icon size={14} strokeWidth={1.5} />
                </div>

                {/* Select or input */}
                {field.type === 'select' ? (
                    <select
                        id={field.name} name={field.name} value={value}
                        onChange={onChange} onBlur={onBlur}
                        className={`field-input appearance-none cursor-pointer ${hasError ? 'border-red-500/50' : isOk ? 'border-cyan-500/35' : ''}`}
                    >
                        <option value="" disabled>{field.placeholder}</option>
                        {field.options.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={field.name} name={field.name} type={field.type}
                        value={value} onChange={onChange} onBlur={onBlur}
                        placeholder={field.placeholder} min={field.min} max={field.max}
                        className={`field-input ${hasError ? 'border-red-500/50' : isOk ? 'border-cyan-500/35' : ''}`}
                    />
                )}

                {/* Status icon */}
                <AnimatePresence>
                    {isOk && (
                        <motion.div
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                        >
                            <div className="w-3.5 h-3.5 rounded-full bg-cyan-500/15 border border-cyan-500/50 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Error message */}
            <AnimatePresence>
                {hasError && (
                    <motion.p
                        className="text-[0.62rem] text-red-400/80 tracking-wide"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    >
                        ⚠ {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ── Main form ──────────────────────────────────────────────── */
export default function AssessmentForm({ onSubmit, error, onDismissError }) {
    const [values, setValues] = useState({ age: '', gender: '', height: '', weight: '', ap_hi: '', ap_lo: '' });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = useCallback(e => {
        const { name, value } = e.target;
        setValues(v => ({ ...v, [name]: value }));
        if (touched[name]) setErrors(err => ({ ...err, [name]: validate(name, value) }));
    }, [touched]);

    const handleBlur = useCallback(e => {
        const { name, value } = e.target;
        setTouched(t => ({ ...t, [name]: true }));
        setErrors(err => ({ ...err, [name]: validate(name, value) }));
    }, []);

    const handleSubmit = useCallback(() => {
        const allTouched = Object.fromEntries(Object.keys(values).map(k => [k, true]));
        const allErrors = Object.fromEntries(Object.keys(values).map(k => [k, validate(k, values[k])]));
        setTouched(allTouched);
        setErrors(allErrors);
        if (Object.values(allErrors).some(Boolean)) return;
        onSubmit(values);
    }, [values, onSubmit]);

    const filled = Object.values(values).filter(v => v !== '').length;
    const progress = (filled / 6) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Card */}
            <div
                className="card overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(6,182,212,0.10)' }}
            >
                {/* Card header */}
                <div
                    className="px-6 pt-6 pb-5 border-b border-cyan-500/10"
                    style={{ background: 'linear-gradient(180deg,rgba(6,182,212,0.06) 0%,transparent 100%)' }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex items-center justify-center w-9 h-9 rounded-xl"
                                style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.22)' }}
                            >
                                <FlaskConical size={16} className="text-cyan-400" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="font-orbitron text-sm font-bold text-slate-100 leading-none mb-0.5">Patient Assessment</p>
                                <p className="text-[0.6rem] uppercase tracking-widest text-cyan-500/45">6 biomarkers required</p>
                            </div>
                        </div>

                        {/* Progress counter */}
                        <div className="flex flex-col items-end gap-1.5">
                            <span className="font-orbitron text-[0.62rem] text-cyan-400/60">{filled}/6</span>
                            <div className="w-24 h-1 bg-navy-800/80 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: 'linear-gradient(90deg,#06b6d4,#3b82f6)', boxShadow: '0 0 6px rgba(6,182,212,0.5)' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form body */}
                <div className="px-6 py-6 space-y-7">
                    {/* Error alert */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                className="error-strip"
                                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                            >
                                <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                <p className="flex-1 text-[0.78rem] leading-relaxed">{error}</p>
                                {onDismissError && (
                                    <motion.button onClick={onDismissError} className="text-red-400/50 hover:text-red-400 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <X size={13} />
                                    </motion.button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Field groups */}
                    {GROUPS.map((group, gi) => (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + gi * 0.08, duration: 0.5 }}
                        >
                            {/* Section label */}
                            <div className="flex items-center gap-2 mb-4">
                                <group.icon size={11} className="text-cyan-500/40" strokeWidth={1.5} />
                                <span className="field-label-text text-cyan-500/55">{group.label}</span>
                                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/12 to-transparent" />
                            </div>

                            {/* 2-col grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {group.fields.map(f => (
                                    <FieldInput
                                        key={f.name}
                                        field={f}
                                        value={values[f.name]}
                                        error={errors[f.name]}
                                        touched={touched[f.name]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {/* Divider */}
                    <div className="neon-hr" />

                    {/* Submit */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                        className="space-y-3"
                    >
                        <motion.button
                            onClick={handleSubmit}
                            className="btn-cta flex items-center justify-center gap-3"
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.982 }}
                        >
                            {/* Beating heart */}
                            <motion.svg
                                width="18" height="18" viewBox="0 0 24 24" fill="white"
                                animate={{ scale: [1, 1.18, 1, 1.10, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                            >
                                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                            </motion.svg>
                            Analyze Cardiovascular Risk
                            <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                <ArrowRight size={15} strokeWidth={2} />
                            </motion.span>
                        </motion.button>

                        <p className="text-center text-[0.62rem] text-slate-600 tracking-widest uppercase">
                            🔒 Data processed locally · Not stored
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
