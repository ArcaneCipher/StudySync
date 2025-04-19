import { motion } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";

const AnimatedCard = ({
  children,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: 20 },
  transition = { duration: 0.3 },
  className = "",
  ...rest
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div>{children}</div>; // No animation on mobile
  }
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;


