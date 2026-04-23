import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Contact from "../components/Contact";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";

import PageWrapper from "../components/PageWrapper";
import PageLoader from "../components/PageLoader";

function AppRoutes({ cart, setCart }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {/* LOADER */}
      <AnimatePresence mode="wait">
        {loading && <PageLoader />}
      </AnimatePresence>

      {/* ROUTES */}
      <Routes location={location}>

        <Route
          path="/"
          element={
            <PageWrapper variant="fade">
              <Home />
            </PageWrapper>
          }
        />

        <Route
          path="/tienda"
          element={
            <Shop cart={cart} setCart={setCart} />
          }
        />

        <Route
          path="/producto/:id"
          element={
            <PageWrapper variant="slide">
              <ProductDetail />
            </PageWrapper>
          }
        />

        <Route
          path="/contacto"
          element={
            <PageWrapper variant="scale">
              <Contact />
            </PageWrapper>
          }
        />

        {/* ✅ CHECKOUT AHORA BIEN UBICADO */}
        <Route
          path="/checkout"
          element={
            <PageWrapper variant="fade">
              <Checkout cart={cart} />
            </PageWrapper>
          }
        />

      </Routes>
    </>
  );
}

export default AppRoutes;