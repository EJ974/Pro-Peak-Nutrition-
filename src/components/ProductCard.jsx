import { motion } from "framer-motion";
import "./ProductCard.css";

function ProductCard({ producto }) {
  return (
    <motion.div 
      className="card"
      whileHover={{ scale: 1.05 }}
    >
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <button>Comprar</button>
    </motion.div>
  );
}

export default ProductCard;