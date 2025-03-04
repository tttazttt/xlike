import { motion } from "framer-motion";

const ButtonMotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <motion.div whileHover={{ scale: 1.2, y: -5 }}>{children}</motion.div>;
};

export default ButtonMotionWrapper;
