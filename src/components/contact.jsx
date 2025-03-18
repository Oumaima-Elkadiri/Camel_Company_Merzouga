import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import "../i18n";
import { useLocation } from "react-router-dom";
import contact1 from '../assets/images/contact1.jpg';
import contact2 from '../assets/images/contact2.jpg';
import contact3 from '../assets/images/contact3.jpg';
import '../styles/contact.css';
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const { t } = useTranslation(["contact"]);
  const location = useLocation();

  // Numéro de téléphone et e-mail
  const phoneNumber1 = "+212652492025";
  const phoneNumber2 = "+212625658404";
  const email = "Hassansahara617@gmail.com";

  // Remonter en haut de la page à chaque changement d'URL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Composant animé
  const AnimatedSection = ({ children, id }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
      <motion.div
        id={id}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <>
      {/* Section Slider */}
      <AnimatedSection id="slider">
        <div className="slider_contact">
          <h2>{t("slider_h2")}</h2>
          <h1>{t("slider_h1")}</h1>
          <h3>{t("slider_h3")}</h3>
        </div>
      </AnimatedSection>

      {/* Section Contact Top */}
      <AnimatedSection id="contactTop">
        <div className="contact_top">
          <h1>{t("titre")}</h1>
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
        </div>
      </AnimatedSection>

      {/* Section Social Contact */}
      <AnimatedSection id="socialContact">
        <div className="social_contact">
          <h3>{t("social")}</h3>
          <div className="img_contact">
            <div className="social">
              <a href="https://www.instagram.com/hassan_anaam96/" target="_blank">
                <p><FaInstagram /> @camel_tours</p>
              </a>
              <img src={contact2} alt="" />
            </div>
            <div className="social">
              <a href="https://www.facebook.com/hassan.anaam.14?mibextid=rS40aB7S9Ucbxw6v" target="_blank">
                <p><FaFacebook /> @camel_tours</p>
              </a>
              <img src={contact1} alt="" />
            </div>
            <div className="social">
              <a href={`https://wa.me/${phoneNumber1}`} target="_blank" rel="noopener noreferrer">
                <p><FaWhatsapp /> @camel_tours</p>
              </a>
              <img src={contact3} alt="" />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section Message Contact */}
      <AnimatedSection id="msgContact">
        <div className="msg_contact">
          <h3>"{t("message1")}"</h3>
          <ul>
            <li>{t("info1")}</li>
            <li>{t("info2")}</li>
            <li>{t("info3")}</li>
          </ul>
          <h3>{t("message2")}</h3>
        </div>
      </AnimatedSection>

      {/* Section Footer Contact */}
      <AnimatedSection id="footerContact">
        <div className="footer_contact">
          <div className="footer1">
            <h1>{t("touch")}</h1>
            {/* Lien appele */}
            <p>
              <FaPhone className="icon" />
              <a href={`tel:${phoneNumber2}`} className='phone'>
                +212 625 658 404
              </a>
            </p>
            {/* Lien e-mail */}
            <p>
              <FaEnvelope className="icon" />
              <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
                Hassansahara617@gmail.com
              </a>
            </p>
          </div>
          <div className="footer2">
            <h1>{t("adresse")}</h1>
            <p>
              <FaMapMarkerAlt className="icon" />
              <span> C.P 52202 Rissani | MOROCCO</span>
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};

export default Contact;