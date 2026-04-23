import { motion } from "framer-motion";
import "./Testimonials.css";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25
    }
  }
};

const card = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80
    }
  }
};

function Testimonials() {
  return (
    <section className="testimonials">

      <motion.h2
        className="testimonials-title"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Lo que dicen nuestros clientes 💬
      </motion.h2>

      <motion.div
        className="testimonials-container"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >

        <motion.div className="testimonial-card" variants={card} whileHover={{ scale: 1.05 }}>
          <p>"Los mejores suplementos que probé, calidad increíble 🔥"</p>
          <span>- Juan Pérez</span>
        </motion.div>

        <motion.div className="testimonial-card" variants={card} whileHover={{ scale: 1.05 }}>
          <p>"Noté resultados en semanas, totalmente recomendado 💪"</p>
          <span>- María López</span>
        </motion.div>

        <motion.div className="testimonial-card" variants={card} whileHover={{ scale: 1.05 }}>
          <p>"Excelente atención y productos de primera ⭐"</p>
          <span>- Carlos Gómez</span>
        </motion.div>

      </motion.div>

    </section>
  );
}

export default Testimonials;