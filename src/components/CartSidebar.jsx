import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CartSidebar.css";

function CartSidebar({ isOpen, onClose, cart, setCart }) {
  const navigate = useNavigate();

  /* =========================
     FUNCIONES
  ========================= */

  const increase = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      )
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
        .filter((p) => p.cantidad > 0) // 🔥 elimina si llega a 0
    );
  };

  const remove = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  /* =========================
     TOTAL
  ========================= */

  const total = cart.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  /* =========================
     FINALIZAR COMPRA
  ========================= */

  const handleCheckout = () => {
    if (cart.length === 0) return; // 🔥 seguridad

    onClose(); // cierra sidebar
    navigate("/checkout"); // 🔥 navega
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* SIDEBAR */}
          <motion.div
            className="cart-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
          >

            {/* HEADER */}
            <div className="cart-header">
              <h2 className="neon-text">Tu carrito</h2>
              <FaTimes
                className="close-icon"
                onClick={onClose}
              />
            </div>

            {/* ITEMS */}
            <div className="cart-items">

              {cart.length === 0 && (
                <p className="empty">
                  El carrito está vacío
                </p>
              )}

              <AnimatePresence>
                {cart.map((p) => (
                  <motion.div
                    key={p.id}
                    className="cart-item neon-card"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.3 }}
                  >

                    <img
                      src={p.imagen}
                      alt={p.nombre}
                    />

                    <div className="info">
                      <h4>{p.nombre}</h4>

                      <p className="price">
                        ${p.precio}
                      </p>

                      {/* CONTROLES */}
                      <div className="controls">

                        <button
                          className="qty-btn"
                          onClick={() => decrease(p.id)}
                        >
                          <FaMinus />
                        </button>

                        <span className="qty">
                          {p.cantidad}
                        </span>

                        <button
                          className="qty-btn"
                          onClick={() => increase(p.id)}
                        >
                          <FaPlus />
                        </button>

                      </div>

                      {/* SUBTOTAL */}
                      <p className="subtotal">
                        Subtotal: $
                        {p.precio * p.cantidad}
                      </p>
                    </div>

                    {/* REMOVE */}
                    <button
                      className="remove-btn"
                      onClick={() => remove(p.id)}
                    >
                      ✕
                    </button>

                  </motion.div>
                ))}
              </AnimatePresence>

            </div>

            {/* FOOTER */}
            <div className="cart-footer">

              <h3 className="total">
                Total: <span>${total}</span>
              </h3>

              {cart.length > 0 && (
                <motion.button
                  className="neon-btn checkout-btn"
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Finalizar compra
                </motion.button>
              )}

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartSidebar;