import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import productos from "../data/productos";
import "./Shop.css";

function Shop({ cart, setCart }) {
  const [flyingItem, setFlyingItem] = useState(null);

  const [categoria, setCategoria] = useState("todos");
  const [objetivo, setObjetivo] = useState("todos");
  const [precioMax, setPrecioMax] = useState(30000);

  const [showFilters, setShowFilters] = useState(false);
  const [orden, setOrden] = useState("default");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  /* =========================
     DETECTAR MOBILE
  ========================= */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setShowFilters(false);
  }, [isMobile]);

  const aplicarFiltro = (callback) => {
    callback();
    if (isMobile) setShowFilters(false);
  };

  /* =========================
     FILTRADO
  ========================= */
  let productosFiltrados = productos.filter((p) => {
    return (
      (categoria === "todos" || p.categoria === categoria) &&
      (objetivo === "todos" || p.objetivo === objetivo) &&
      p.precio <= precioMax
    );
  });

  /* =========================
     ORDENAMIENTO
  ========================= */
  if (orden === "precio-asc") {
    productosFiltrados.sort((a, b) => a.precio - b.precio);
  }

  if (orden === "precio-desc") {
    productosFiltrados.sort((a, b) => b.precio - a.precio);
  }

  if (orden === "vendidos") {
    productosFiltrados.sort((a, b) => b.vendidos - a.vendidos);
  }

  /* =========================
     🛒 AGREGAR AL CARRITO (FIX REAL)
  ========================= */
  const handleAddToCart = (producto, e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("CLICK FUNCIONA", producto); // 👈 DEBUG CLAVE

    const rect = e.currentTarget.getBoundingClientRect();

    setCart((prev) => {
      const existe = prev.find((item) => item.id === producto.id);

      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });

    setFlyingItem({
      ...producto,
      x: rect.left,
      y: rect.top
    });

    setTimeout(() => setFlyingItem(null), 800);
  };

  useEffect(() => {
    console.log("🛒 CART ACTUAL:", cart);
  }, [cart]);

  return (
    <section className="shop">

      {/* BOTÓN MOBILE */}
      {isMobile && (
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(true)}
        >
          Filtros / Ordenar
        </button>
      )}

      {/* OVERLAY */}
      <AnimatePresence>
        {isMobile && showFilters && (
          <motion.div
            className="overlay"
            onClick={() => setShowFilters(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div className="shop-layout">

        {/* SIDEBAR */}
        <AnimatePresence>
          {(!isMobile || showFilters) && (
            <motion.aside
              className="shop-sidebar"
              initial={{ x: isMobile ? -300 : 0 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? -300 : 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              {isMobile && (
                <button
                  className="close-sidebar"
                  onClick={() => setShowFilters(false)}
                >
                  ✕
                </button>
              )}

              <div className="sidebar-block">
                <h3>Categorías</h3>
                <ul>
                  <li onClick={() => aplicarFiltro(() => setCategoria("todos"))}>Todos</li>
                  <li onClick={() => aplicarFiltro(() => setCategoria("proteinas"))}>Proteínas</li>
                  <li onClick={() => aplicarFiltro(() => setCategoria("creatinas"))}>Creatinas</li>
                  <li onClick={() => aplicarFiltro(() => setCategoria("preentrenos"))}>Pre Entrenos</li>
                  <li onClick={() => aplicarFiltro(() => setCategoria("quemadores"))}>Quemadores</li>
                </ul>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* CONTENIDO */}
        <div className="shop-content">
          <h1 className="shop-title neon-text">Nuestra Tienda</h1>

          <div className="shop-grid">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="shop-card">

                {/* SOLO LA IMAGEN Y TEXTO NAVEGAN */}
                <Link to={`/producto/${producto.id}`}>
                  <div className="image-container">
                    <img src={producto.imagen} alt={producto.nombre} />
                  </div>

                  <h3 className="neon-text">{producto.nombre}</h3>
                  <p className="product-desc">{producto.descripcion}</p>
                </Link>

                <p className="price neon-text">${producto.precio}</p>

                {/* 🔥 BOTÓN FUERA DEL LINK */}
                <button
                  type="button"
                  className="shop-btn btn-font"
                  onClick={(e) => handleAddToCart(producto, e)}
                >
                  AGREGAR AL CARRITO
                </button>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ITEM VOLADOR */}
      {flyingItem && (
        <motion.img
          src={flyingItem.imagen}
          className="flying-item"
          initial={{
            x: flyingItem.x,
            y: flyingItem.y,
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: window.innerWidth - 80,
            y: 0,
            opacity: 0,
            scale: 0.3
          }}
          transition={{ duration: 0.8 }}
        />
      )}

    </section>
  );
}

export default Shop;