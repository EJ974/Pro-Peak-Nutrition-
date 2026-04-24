import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

function Footer() {
  return (
    <footer className="footer">

      <motion.div
        className="footer-container"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >

        {/* MARCA */}
        <motion.div className="footer-col neon-text" variants={item}>
          <h2>PRO-PEAK NUTRITION</h2>
          <p>Tu tienda de suplementos y accesorios fitness</p>
        </motion.div>

        {/* LINKS */}
        <motion.div className="footer-col neon-text" variants={item}>
          <h3>Secciones</h3>

          <Link 
            to="/"
            onClick={() => {
              setTimeout(() => {
                document.getElementById("hero")?.scrollIntoView({
                  behavior: "smooth"
                });
              }, 100);
            }}
          >
            Inicio
          </Link>
          <Link to="/tienda">Tienda</Link>
          <Link to="/contacto">Contacto</Link>

        </motion.div>

        {/* CONTACTO */}
        <motion.div className="footer-col neon-text" variants={item}>
          <h3>Contacto</h3>
          <p>📍 Corrientes, Argentina</p>
          <p>📞 +54 9 3794774418</p>
          <p>✉️ contacto@gymstore.com</p>
        </motion.div>

        {/* REDES */}
        <motion.div className="footer-col" variants={item}>
        <h3 className="neon-text">Seguinos</h3>

        <div className="socials">

          <motion.a 
            href="https://instagram.com"
            target="_blank"
            whileHover={{ scale: 1.2 }}
          >
            <FaInstagram />
          </motion.a>

          <motion.a 
            href="https://facebook.com"
            target="_blank"
            whileHover={{ scale: 1.2 }}
          >
            <FaFacebookF />
          </motion.a>

          <motion.a 
            href="https://wa.me/549XXXXXXXXXX"
            target="_blank"
            whileHover={{ scale: 1.2 }}
          >
            <FaWhatsapp />
          </motion.a>

        </div>
      </motion.div>

      </motion.div>

      {/* COPYRIGHT */}
      <motion.div
        className="footer-bottom neon-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © {new Date().getFullYear()} GYM STORE - Todos los derechos reservados
      </motion.div>

    </footer>
  );
}

export default Footer;