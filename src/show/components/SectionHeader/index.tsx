import { motion } from 'framer-motion';

interface SectionProps {
  index: string;
  title: string;
}

const SectionHeading = ({ index, title }: SectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='mb-2 flex items-center gap-4'>
    <span className='text-primary font-mono text-sm'>{index}.</span>
    <h2 className='text-foreground text-2xl font-bold'>{title}</h2>
    <div className='bg-border ml-4 h-px max-w-xs flex-1' />
  </motion.div>
);

export default SectionHeading;
