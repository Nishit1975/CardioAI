import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep base gradient */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 85% 65% at 50% -5%, #1a0533 0%, #080415 55%, #04020d 100%)' }} />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-70" />

      {/* Scan line */}
      <div className="absolute inset-0 scan-line opacity-25" />

      {/* Top neon accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.55) 30%, rgba(232,121,249,0.7) 50%, rgba(168,85,247,0.55) 70%, transparent)' }} />

      {/* Purple orb — top left */}
      <motion.div className="orb"
        style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(109,40,217,0.08) 50%, transparent 70%)', top: '-180px', left: '-140px' }}
        animate={{ x: [0, 50, 0], y: [0, 35, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Indigo/blue orb — bottom right */}
      <motion.div className="orb"
        style={{ width: 550, height: 550, background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(79,70,229,0.06) 50%, transparent 70%)', bottom: '-120px', right: '-100px' }}
        animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Magenta accent orb — bottom left */}
      <motion.div className="orb"
        style={{ width: 350, height: 350, background: 'radial-gradient(circle, rgba(232,121,249,0.12) 0%, rgba(192,38,211,0.05) 60%, transparent 70%)', bottom: '10%', left: '5%' }}
        animate={{ x: [0, 25, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: ['rgba(168,85,247,', 'rgba(232,121,249,', 'rgba(139,92,246,', 'rgba(99,102,241,'][i % 4] + `${Math.random() * 0.5 + 0.15})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -(Math.random() * 70 + 25), 0], opacity: [0, 0.9, 0], scale: [0, 1, 0] }}
          transition={{ duration: Math.random() * 7 + 5, repeat: Infinity, delay: Math.random() * 10, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}