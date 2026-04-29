import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionWrapper({ id, eyebrow, title, children, tinted = false }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} ref={ref} className="section-outer"
      style={tinted ? { background: 'hsl(var(--p)/.015)' } : {}}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .65, ease: [0.22,1,0.36,1] }}>
          {eyebrow && (
            <div className="section-tag"><span className="eyebrow">{eyebrow}</span></div>
          )}
          {title && <h2 className="section-heading">{title}</h2>}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .75, delay: .1, ease: [0.22,1,0.36,1] }}>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
