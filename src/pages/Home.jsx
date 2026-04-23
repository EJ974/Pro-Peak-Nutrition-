import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import ProductsSection from "../components/ProductSection";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import "./Home.css";

const sectionVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

function Home() {
  return (
    <div className="home">

      {/* HERO no necesita whileInView */}
      <Hero />

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Benefits />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <CTA />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Testimonials />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
      </motion.div>

    </div>
  );
}

export default Home;