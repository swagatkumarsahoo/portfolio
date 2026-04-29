import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const DURATION = 1500;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.round(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onDone, 500);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: 'hsl(var(--bg))' }}
        >
          {/* BACKGROUND GLOW */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, hsl(var(--neon)/0.25), transparent)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative flex flex-col items-center">
            {/* LOGO / CORE ELEMENT */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-10"
            >
              {/* Outer pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: 'hsl(var(--neon)/0.4)' }}
                animate={{
                  scale: [1, 1.4],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />

              {/* Core circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg,hsl(var(--neon)),hsl(var(--violet)))',
                  boxShadow: '0 0 25px hsl(var(--neon)/0.5)',
                }}
              >
                <span className="text-white font-bold text-lg">SKS</span>
              </div>
            </motion.div>

            {/* NAME */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-2xl font-bold mb-6"
              style={{ color: 'hsl(var(--ink-1))' }}
            >
              Swagat Kumar Sahoo
            </motion.h1>

            {/* PROGRESS BAR */}
            <div
              className="relative w-64 h-[3px] rounded-full overflow-hidden"
              style={{ background: 'hsl(var(--ink-4)/0.25)' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${pct}%`,
                  background:
                    'linear-gradient(90deg, hsl(var(--neon)), hsl(var(--violet)))',
                  boxShadow: '0 0 12px hsl(var(--neon)/0.6)',
                }}
              />
            </div>

            {/* PERCENT */}
            <motion.p
              key={pct}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs font-mono-j"
              style={{ color: 'hsl(var(--ink-4))' }}
            >
              {pct}%
            </motion.p>

            {/* LOADING TEXT */}
            <motion.p
              className="mt-6 text-sm"
              style={{ color: 'hsl(var(--ink-3))' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
