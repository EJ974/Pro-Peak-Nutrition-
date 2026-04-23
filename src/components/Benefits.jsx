import { motion } from "framer-motion";
import "./Benefits.css";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90
    }
  }
};

const benefits = [
  {
    icon: "🚚",
    title: "Envíos a todo el país",
    desc: "Recibí tus productos rápido y seguro en cualquier lugar"
  },
  {
    icon: "💎",
    title: "Calidad premium",
    desc: "Trabajamos con las mejores marcas del mercado"
  },
  {
    icon: "🔒",
    title: "Pagos seguros",
    desc: "Protección total en todas tus compras"
  }
];

function Benefits() {
  return (
    <section className="benefits">

      <motion.h2
        className="benefits-title neon-text"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ¿Por qué elegirnos?
      </motion.h2>

      <motion.div
        className="benefits-container neon-text"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            className="benefit-card"
            variants={item}
            whileHover={{ scale: 1.08 }}
          >
            <div className="icon">{b.icon}</div>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}

export default Benefits;