import { FaWhatsapp } from "react-icons/fa";
import "./WhatsappButton.css";

function WhatsappButton() {
  return (
    <a
      href="https://wa.me/5493794774418"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsappButton;