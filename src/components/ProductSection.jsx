import { motion } from "framer-motion";
import productos from "../data/productos";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

function ProductsSection() {
  return (
    <motion.div
      className="products"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {productos.map((p) => (
        <motion.div
          key={p.id}
          className="product-card"
          variants={item}
          whileHover={{ scale: 1.05 }}
        >
          <img src={p.imagen} />
          <h3>{p.nombre}</h3>
          <p>${p.precio}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ProductsSection;