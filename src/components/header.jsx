import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import "../i18n";
import "../styles/Header.css";
import logo from "../assets/images/Logo.png"; // Import correct du logo

export default function Header() {
  const { t } = useTranslation("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  // Fonction pour vérifier si un lien est actif
  const isActive = (path) => location.pathname === path;

  return (
    <header>
      {/* Logo */}
      <Link to="/"><img src={logo} alt="Camel Company Merzouga" /></Link>

      {/* Navigation */}
      <nav>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "" }}></div>
          <div style={{ opacity: menuOpen ? "0" : "1" }}></div>
          <div style={{ transform: menuOpen ? "rotate(-45deg) translate(6px, -6px)" : "" }}></div>
        </div>

        <ul className={menuOpen ? "open" : ""}>
          <li onClick={() => setMenuOpen(false)} className={isActive('/') ? 'active' : ''}>
            <Link to="/">{t("nav:home")}</Link>
          </li>
          <li onClick={() => setMenuOpen(false)} className={isActive('/About') ? 'active' : ''}>
            <Link to="/About">{t("nav:about")}</Link>
          </li>
          <li onClick={() => setMenuOpen(false)} className={isActive('/Activities') ? 'active' : ''}>
            <Link to="/Activities">{t("nav:activities")}</Link>
          </li>
          <li onClick={() => setMenuOpen(false)} className={isActive('/AllTours') ? 'active' : ''}>
            <Link to="/AllTours">{t("nav:tours")}</Link>
          </li>
          <li onClick={() => setMenuOpen(false)} className={isActive('/dayTrips') ? 'active' : ''}>
            <Link to="/dayTrips">{t("nav:trips")}</Link>
          </li>
        </ul>
      </nav>

      {/* Bouton Contact */}
      <Link to="/Contact" className="contact-btn">{t("nav:contact")}</Link>
    </header>
  );
}