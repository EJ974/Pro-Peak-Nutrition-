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
     FILTROS ACTIVOS
  ========================= */
  const hayFiltrosActivos =
    categoria !== "todos" ||
    objetivo !== "todos" ||
    precioMax < 30000 ||
    orden !== "default";

  const limpiarFiltros = () => {
    setCategoria("todos");
    setObjetivo("todos");
    setPrecioMax(30000);
    setOrden("default");
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
     🛒 AGREGAR AL CARRITO
  ========================= */
  const handleAddToCart = (producto, e) => {
    e.preventDefault();
    e.stopPropagation();

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

  /* =========================
     RENDER
  ========================= */
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

              {/* CATEGORÍAS */}
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

              {/* OBJETIVO */}
              <div className="sidebar-block">
                <h3>Objetivo</h3>
                <ul>
                  <li onClick={() => aplicarFiltro(() => setObjetivo("todos"))}>Todos</li>
                  <li onClick={() => aplicarFiltro(() => setObjetivo("volumen"))}>Volumen</li>
                  <li onClick={() => aplicarFiltro(() => setObjetivo("definicion"))}>Definición</li>
                  <li onClick={() => aplicarFiltro(() => setObjetivo("energia"))}>Energía</li>
                </ul>
              </div>

              {/* PRECIO */}
              <div className="sidebar-block">
                <h3>Precio máximo</h3>
                <input
                  type="range"
                  min="0"
                  max="30000"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                />
                <p>${precioMax}</p>
              </div>

              {/* ORDEN */}
              <div className="sidebar-block">
                <h3>Ordenar</h3>
                <select
                  value={orden}
                  onChange={(e) => aplicarFiltro(() => setOrden(e.target.value))}
                >
                  <option value="default">Por defecto</option>
                  <option value="precio-asc">Precio menor a mayor</option>
                  <option value="precio-desc">Precio mayor a menor</option>
                  <option value="vendidos">Más vendidos</option>
                </select>
              </div>

            </motion.aside>
          )}
        </AnimatePresence>

        {/* CONTENIDO */}
        <div className="shop-content">
          <h1 className="shop-title neon-text">Nuestra Tienda</h1>

          {/* 🔥 FILTROS ACTIVOS */}
          {hayFiltrosActivos && (
            <div className="active-filters">

              {categoria !== "todos" && (
                <span className="filter-chip">
                  {categoria}
                  <button onClick={() => setCategoria("todos")}>✕</button>
                </span>
              )}

              {objetivo !== "todos" && (
                <span className="filter-chip">
                  {objetivo}
                  <button onClick={() => setObjetivo("todos")}>✕</button>
                </span>
              )}

              {precioMax < 30000 && (
                <span className="filter-chip">
                  hasta ${precioMax}
                  <button onClick={() => setPrecioMax(30000)}>✕</button>
                </span>
              )}

              {orden !== "default" && (
                <span className="filter-chip">
                  {orden}
                  <button onClick={() => setOrden("default")}>✕</button>
                </span>
              )}

              <button className="clear-filters" onClick={limpiarFiltros}>
                Limpiar filtros
              </button>

            </div>
          )}

          {/* GRID */}
          <div className="shop-grid">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="shop-card">

                <Link to={`/producto/${producto.id}`}>
                  <div className="image-container">
                    <img src={producto.imagen} alt={producto.nombre} />
                  </div>

                  <h3 className="neon-text">{producto.nombre}</h3>
                  <p className="product-desc">{producto.descripcion}</p>
                </Link>

                <p className="price neon-text">${producto.precio}</p>

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