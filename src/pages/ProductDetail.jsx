import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import productos from "../data/productos";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();

  const producto = productos.find(
    (p) => String(p.id) === id
  );

  // ⚠️ protección obligatoria
  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
  <motion.div
    className="detail"
    layoutId={`product-card-${producto.id}`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >

    <motion.img
      src={producto.imagen}
      alt={producto.nombre}
      layoutId={`product-image-${producto.id}`}
      className="detail-img"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    />

    <motion.h1
      layoutId={`product-title-${producto.id}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15 }}
    >
      {producto.nombre}
    </motion.h1>

    <motion.p
      className="description"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      {producto.descripcion}
    </motion.p>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      ${producto.precio}
    </motion.p>

  </motion.div>
);
}

export default ProductDetail;