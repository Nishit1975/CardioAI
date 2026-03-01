import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';

import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import StatsGrid from './components/StatsGrid';
import AssessmentForm from './components/AssessmentForm';
import LoadingState from './components/LoadingState';
import ResultDisplay from './components/ResultDisplay';
import { predictRisk } from './api';

/* ─── Phase machine: 'form' | 'loading' | 'result' ─────────── */
export default function App() {
  const [phase, setPhase] = useState('form');
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleSubmit = useCallback(async (values) => {
    setApiError(null);
    setPhase('loading');
    try {
      const data = await predictRisk(values);
      if (data.success) {
        setResult(data.prediction);
        setConfidence(data.confidence ?? null);
        setPhase('result');
      } else {
        setApiError('Unexpected response from server.');
        setPhase('form');
      }
    } catch (err) {
      setApiError(
        err.userMessage ||
        'Failed to connect. Make sure Flask API is running on port 5000.'
      );
      setPhase('form');
    }
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setConfidence(null);
    setApiError(null);
    setPhase('form');
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020817]">

      {/* ── Animated background layer ── */}
      <ParticleBackground />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Hero */}
        <HeroSection />

        {/* Stats */}
        <StatsGrid />

        {/* Main content area */}
        <main className="flex-1 w-full max-w-lg mx-auto px-4 pb-16">
          <AnimatePresence mode="wait">
            {phase === 'form' && (
              <AssessmentForm
                key="form"
                onSubmit={handleSubmit}
                error={apiError}
                onDismissError={() => setApiError(null)}
              />
            )}

            {phase === 'loading' && (
              <motion.div key="loading" className="card py-4">
                <LoadingState />
              </motion.div>
            )}

            {phase === 'result' && (
              <ResultDisplay
                key="result"
                result={result}
                confidence={confidence}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <motion.footer
          className="relative z-10 flex flex-col items-center gap-3 pb-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div
            className="w-32 h-px"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(6,182,212,0.20),transparent)' }}
          />
          <div className="flex items-center gap-2">
            <span className="text-[0.58rem] uppercase tracking-widest text-slate-600">Built with</span>
            <Heart size={10} className="text-cyan-500/50" fill="rgba(6,182,212,0.50)" />
            <span className="text-[0.58rem] uppercase tracking-widest text-slate-600">for educational research</span>
          </div>
          <p className="text-[0.55rem] text-slate-700 tracking-wide text-center">
            CardioAI — A University ML Portfolio Project<br />
            React · Flask · Scikit-Learn · Tailwind CSS
          </p>
        </motion.footer>
      </div>
    </div>
  );
}