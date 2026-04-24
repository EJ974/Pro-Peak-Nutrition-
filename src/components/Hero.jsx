import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Hero.css";

const slides = [
  {
    id: 1,
    titulo: "Potenciá tu fuerza",
    texto: "Las mejores proteínas para llevar tu entrenamiento al siguiente nivel",
    imagen: "/img/hero/hero1.jpg"
  },
  {
    id: 2,
    titulo: "Energía sin límites",
    texto: "Pre-entrenos diseñados para máximo rendimiento",
    imagen: "https://www.infobae.com/resizer/v2/D3QKMCC67BFSFP6SQ3JE5JG6RQ.jpg?auth=360b9a6223edd67388f8a433ac080f1119c1b08f3cb4301ae4b07f76f5b06aea"
  },
  {
    id: 3,
    titulo: "Definí tu cuerpo",
    texto: "Quemadores y suplementos para lograr tu mejor versión",
    imagen: "https://media.gq.com.mx/photos/62863225500ac81936c484e4/16:9/w_2560%2Cc_limit/pesas.jpg"
  }
];

const variants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

function Hero() {
  const [index, setIndex] = useState(0);

  // AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // cambia cada 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero">

      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          className="hero-slide"
          style={{ backgroundImage: `url(${slides[index].imagen})` }}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8 }}
        >

          {/* overlay oscuro */}
          <div className="hero-overlay" />

          {/* contenido */}
          <div className="hero-content">

            <h1 className="neon-text">
              {slides[index].titulo}
            </h1>

            <p className="neon-text">
              {slides[index].texto}
            </p>

            

          </div>

        </motion.div>
      </AnimatePresence>

    </section>
  );
}

export default Hero;