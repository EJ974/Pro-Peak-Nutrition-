import { motion } from "framer-motion";

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  },

  slide: {
    initial: { x: "100%", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80 }
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3 }
    }
  },

  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
    exit: { scale: 0.95, opacity: 0 }
  }
};

function PageWrapper({ children, variant = "fade" }) {
  return (
    <motion.div
      variants={variants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;