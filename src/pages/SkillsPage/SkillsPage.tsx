import { motion } from 'framer-motion';

function SkillsPage() {
  return (
    <motion.div>
      <motion.div
        style={{ backgroundColor: 'blue', width: '50%', height: '100%' }}
      >
        <h1>Skill Page Left</h1>
      </motion.div>
      <motion.div
        style={{
          display: 'flex',
          backgroundColor: 'red',
          width: '50%',
          height: '100%',
        }}
        key='skills-page'
        initial={{ opacity: 0, marginLeft: '-1000px' }}
        animate={{ opacity: 1, marginLeft: 0 }}
        exit={{ opacity: 0, marginLeft: '-1000px' }}
        transition={{
          ease: 'linear',
          duration: 2,
        }}
      >
        <h1>Skill Page Right</h1>
      </motion.div>
    </motion.div>
  );
}

export default SkillsPage;
