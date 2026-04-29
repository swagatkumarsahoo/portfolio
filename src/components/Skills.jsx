import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { Database, Monitor, Server, Wrench } from 'lucide-react';

const CATEGORIES = [
  {
    icon: Server,
    label: 'Backend',
    color: 'hsl(var(--neon))',
    chip: 'chip-neon',
    skills: [
      'Core Java',
      'Advanced Java',
      'Spring Boot',
      'Spring Framework',
      'Microservices',
      'REST API',
      'Hibernate / JPA',
      'Maven',
    ],
  },
  {
    icon: Monitor,
    label: 'Frontend',
    color: 'hsl(var(--violet))',
    chip: 'chip-violet',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    icon: Database,
    label: 'Database',
    color: 'hsl(var(--cyan))',
    chip: 'chip-cyan',
    skills: ['Oracle Database', 'SQL', 'PL/SQL', 'JDBC', 'MySQL'],
  },
  {
    icon: Wrench,
    label: 'DevOps & Tools',
    color: 'hsl(155,80%,52%)',
    chip: 'chip-green',
    skills: [
      'Git & GitHub',
      'Maven',
      'Gradle',
      'Jenkins',
      'Docker',
      'Jira',
      'SonarQube',
      'Postman',
      'AWS Basics',
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <SectionWrapper id="skills" eyebrow="02 / Skills" title="Technical toolkit">
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {CATEGORIES.map(({ icon: Icon, label, color, chip, skills }, ci) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: ci * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="gc sp skill-category-card rounded-2xl"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${color.slice(0, -1)} / .12)`,
                  border: `1px solid ${color.slice(0, -1)} / .22)`,
                  /* e.g. hsl(var(--neon) / .12) */
                }}
              >
                <Icon size={15} style={{ color }} />
              </div>
              <h3
                className="font-display font-semibold text-[.85rem]"
                style={{ color: 'hsl(var(--ink-1))' }}
              >
                {label}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, si) => (
                <motion.span
                  key={s}
                  className={`chip ${chip}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: ci * 0.1 + si * 0.04 + 0.2 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
