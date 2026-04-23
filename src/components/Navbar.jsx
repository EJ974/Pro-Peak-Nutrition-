import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

function Navbar({ cart, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const lastScroll = useRef(0);
  const menuRef = useRef(null);

  /* SCROLL */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setScrolled(current > 50);

      if (current > lastScroll.current && current > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ESC */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* CLICK AFUERA */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const totalItems = cart.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >

      {/* LOGO */}
      <Link to="/" className="logo neon-text">
        <img src="/img/logo/logo.png" alt="logo" />
      </Link>

      {/* LINKS */}
      <div className="nav-links">
        <NavLink to="/" className="neon-text">Inicio</NavLink>
        <NavLink to="/tienda" className="neon-text">Tienda</NavLink>
        <NavLink to="/contacto" className="neon-text">Contacto</NavLink>
      </div>

      {/* CARRITO */}
      <div className="cart-icon" onClick={onOpenCart}>
        🛒
        {totalItems > 0 && (
          <span className="cart-count">{totalItems}</span>
        )}
      </div>

      {/* HAMBURGUESA */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              ref={menuRef}
              className="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <NavLink to="/" onClick={() => setMenuOpen(false)}>Inicio</NavLink>
              <NavLink to="/tienda" onClick={() => setMenuOpen(false)}>Tienda</NavLink>
              <NavLink to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</NavLink>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}

export default Navbar;