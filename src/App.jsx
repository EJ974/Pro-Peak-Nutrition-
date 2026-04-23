import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import WhatsappButton from "./components/WhatsappButton";
import CartSidebar from "./components/CartSidebar";

import "./styles/theme.css";

function App() {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  /* 🔥 DEBUG REAL DEL CARRITO */
  useEffect(() => {
    console.log("🛒 APP CART:", cart);
  }, [cart]);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar
        cart={cart}
        onOpenCart={() => setOpenCart(true)}
      />

      <AppRoutes
        cart={cart}
        setCart={setCart}
      />

      <WhatsappButton />
      <Footer />

      {/* 🔥 CARRITO */}
      <CartSidebar
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
        cart={cart}
        setCart={setCart}
      />
    </BrowserRouter>
  );
}

export default App;