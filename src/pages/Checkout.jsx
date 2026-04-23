import { useState } from "react";
import { motion } from "framer-motion";

function Checkout({ cart }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nota, setNota] = useState("");

  const [envio, setEnvio] = useState("retiro"); // retiro | envio
  const [metodoPago, setMetodoPago] = useState("");

  const total = cart.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  /* =========================
     WHATSAPP
  ========================= */
  const generarMensajeWhatsApp = () => {
    const productosTexto = cart
      .map(
        (p) =>
          `- ${p.nombre} x${p.cantidad} = $${p.precio * p.cantidad}`
      )
      .join("\n");

    let metodoPagoTexto = "";

    if (envio === "retiro") {
      metodoPagoTexto = "A coordinar en tienda";
    }

    if (envio === "envio" && metodoPago === "efectivo") {
      metodoPagoTexto = "Pago en efectivo al recibir";
    }

    if (envio === "envio" && metodoPago === "mp") {
      metodoPagoTexto =
        "Mercado Pago\nAlias: TU_ALIAS_MP\nEnviar comprobante de pago";
    }

    const mensaje = `
Hola, quiero hacer este pedido:

${productosTexto}

📦 Envío: ${
      envio === "retiro"
        ? "Retiro en tienda"
        : "Envío a domicilio"
    }

💳 Pago: ${metodoPagoTexto}

👤 Datos del cliente:
Nombre: ${nombre}
Teléfono: ${telefono}
Dirección: ${direccion || "No especificada"}

📝 Nota: ${nota || "Sin notas"}

💰 Total: $${total}
`;

    return encodeURIComponent(mensaje);
  };

  const enviarPedido = () => {
    if (!nombre || !telefono) {
      alert("Completá nombre y teléfono");
      return;
    }

    if (envio === "envio" && !metodoPago) {
      alert("Elegí un método de pago");
      return;
    }

    const mensaje = generarMensajeWhatsApp();

    window.open(
      `https://wa.me/5493794774418?text=${mensaje}`,
      "_blank"
    );
  };

  return (
    <motion.section
      className="checkout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="neon-text">Finalizar Compra</h1>

      <div className="checkout-grid">

        {/* IZQUIERDA */}
        <div className="checkout-left">

          {/* ENVÍO */}
          <div className="block">
            <h3>Método de envío</h3>

            <div className="envio-opciones">
              <button
                onClick={() => setEnvio("retiro")}
                className={envio === "retiro" ? "active" : ""}
              >
                Retiro en tienda
              </button>

              <button
                onClick={() => setEnvio("envio")}
                className={envio === "envio" ? "active" : ""}
              >
                Envío a domicilio
              </button>
            </div>
          </div>

          {/* DATOS */}
          <div className="block">
            <h3>Datos del cliente</h3>

            <input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <input
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

            {envio === "envio" && (
              <input
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            )}

            <textarea
              placeholder="Nota (opcional)"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </div>

          {/* PAGOS */}
          {envio === "envio" && (
            <div className="block">
              <h3>Método de pago</h3>

              <div className="pago-opciones">
                <button
                  onClick={() => setMetodoPago("efectivo")}
                  className={metodoPago === "efectivo" ? "active" : ""}
                >
                  Efectivo al recibir
                </button>

                <button
                  onClick={() => setMetodoPago("mp")}
                  className={metodoPago === "mp" ? "active" : ""}
                >
                  Mercado Pago
                </button>
              </div>

              {metodoPago === "mp" && (
                <div className="alias-box">
                  <p><strong>Alias:</strong> TU_ALIAS_MP</p>
                  <p>Enviar comprobante de pago</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* DERECHA */}
        <div className="checkout-right">
          <h3>Tu pedido</h3>

          {cart.map((p) => (
            <div key={p.id} className="resumen-item">
              <span>
                {p.nombre} x{p.cantidad}
              </span>
              <span>${p.precio * p.cantidad}</span>
            </div>
          ))}

          <hr />

          <h2>Total: ${total}</h2>

          <button
            className="neon-btn"
            onClick={enviarPedido}
          >
            Confirmar pedido
          </button>
        </div>

      </div>
    </motion.section>
  );
}

export default Checkout;