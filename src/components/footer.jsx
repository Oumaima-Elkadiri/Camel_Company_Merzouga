import React from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import "../styles/footer.css";
import logo from "../assets/images/Logo.png"; // Assurez-vous du bon chemin de l'image
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation("footer");
  const phoneNumber1 = "+212652492025";
  const phoneNumber2 = "+212625658404";
  const email = "Hassansahara617@gmail.com";
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3>{t("menu")}</h3>
          <ul>
            <li><Link to="/">{t("home")}</Link></li>
            <li><Link to="/About">{t("about")}</Link></li>
            <li><Link to="/Contact">{t("contact")}</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>{t("tours")}</h3>
          <ul>
            <li><Link to="/AllTours">{t("Atrips")}</Link></li>
            <li><Link to="/dayTrips">{t("Dtrips")}</Link></li>
            <li><Link to="/Activities">{t("desert")}</Link></li>
          </ul>
        </div>
        <div className="locations">
          <h3>{t("locations")}</h3>
          <div className="locations-list">
            {[
              "Casablanca (1)",
              "Marrakech (16)",
              "Zagora (2)",
              "Chefchaouen (1)",
              "Merzouga (10)",
              "Sahara Desert (17)",
              "Fes (9)",
            ].map((location, index) => (
              <span key={index} className="location-item">
                {location}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-middle">
        <div className="contact-box">
          <a href={`https://wa.me/${phoneNumber1}`} target="_blank" rel="noopener noreferrer"><p><FaWhatsapp /> +212 652 492 025</p></a>
          <a href={`tel:${phoneNumber2}`} className='phone'><p><FaPhone />+212 625 658 404</p></a>
        </div>
        <div className="ligne"></div>
        <img src={logo} alt="Company Logo" className="footer-logo" />
        <div className="ligne"></div>
        <div className="contact-box">
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer"><p><FaEnvelope/> Hassansahara617@gmail.com</p></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {t("copyright")} {new Date().getFullYear()}. {t("rights")}.</p>
        
        <div className="social-icons">
            <a href={`https://wa.me/${phoneNumber1}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href="https://www.instagram.com/hassan_anaam96/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/hassan.anaam.14?mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noopener noreferrer"><FaFacebook /> </a>
        </div>
      </div>
    </footer>
  );
}