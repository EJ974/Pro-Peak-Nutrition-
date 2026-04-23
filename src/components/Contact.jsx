import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser"; // ✅ LIBRERÍA CORRECTA
import "./Contact.css";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

function Contact() {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    setSending(true);
    setSuccess(null);

    emailjs
      .sendForm(
        "service_wh7gzqm",   // ✅ TU SERVICE ID
        "template_x79dl7d",  // ✅ TU TEMPLATE ID
        formRef.current,
        "642fgmB80HBupdMYQ"  // ✅ TU PUBLIC KEY
      )
      .then(() => {
        setSuccess(true);
        formRef.current.reset();
      })
      .catch((error) => {
        console.error("ERROR COMPLETO:", error);
        setSuccess(false);
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <section className="contact neon-text">

      <motion.h2
        className="contact-title"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contactanos
      </motion.h2>

      <motion.div
        className="contact-container"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >

        {/* INFO */}
        <motion.div className="contact-info" variants={item}>
          <h3>Información</h3>
          <p>📍 Corrientes, Argentina</p>
          <p>📞 +54 9 3794774418</p>
          <p>✉️ pro_pek@gmail.com</p>
        </motion.div>

        {/* FORM */}
        <motion.form
          ref={formRef}
          className="contact-form"
          variants={item}
          onSubmit={sendEmail}
        >

          <input
            type="text"
            name="user_name"
            placeholder="Tu nombre"
            required
          />

          <input
            type="email"
            name="user_email"
            placeholder="Tu email"
            required
          />

          <textarea
            name="message"
            placeholder="Tu mensaje"
            rows="5"
            required
          />

          <motion.button
            type="submit"
            className="contact-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            disabled={sending}
          >
            {sending ? "Enviando..." : "Enviar mensaje"}
          </motion.button>

          {/* MENSAJE DE ESTADO */}
          {success === true && (
            <p className="success-msg">Mensaje enviado correctamente ✅</p>
          )}

          {success === false && (
            <p className="error-msg">Error al enviar ❌</p>
          )}

        </motion.form>

      </motion.div>

    </section>
  );
}

export default Contact;