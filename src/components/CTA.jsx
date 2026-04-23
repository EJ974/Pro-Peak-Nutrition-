import { motion } from "framer-motion";
import "./CTA.css";

function CTA() {
  return (
    <section className="cta neon-text">

      {/* fondo animado */}
      <motion.div
        className="cta-bg"
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="cta-content"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <motion.h2
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          Empezá tu cambio hoy
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No esperes más para alcanzar tu mejor versión
        </motion.p>

        <motion.button
          className="cta-btn neon-text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Ver productos
        </motion.button>

      </motion.div>
    </section>
  );
}

export default CTA;