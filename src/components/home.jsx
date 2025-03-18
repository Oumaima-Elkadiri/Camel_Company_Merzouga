import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import home_section from '../assets/images/home-section.png';
import service1 from '../assets/images/service1.png';
import service2 from '../assets/images/service2.png';
import service3 from '../assets/images/service3.png';
import service4 from '../assets/images/service4.png';
import about_img from '../assets/images/img_about.jpg';
import about_img2 from '../assets/images/img_about2.jpg';
import why from '../assets/images/why.png';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import CardList from "./Card/cardList";
import data from '../data.json';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { t } = useTranslation(["slider", "nav", "services", "about", "why", "tours"]);
  const [mixedData, setMixedData] = useState([]);

  // Fonction pour mélanger les données
  const getMixedData = () => {
    const { activities, allTours, dayTrips } = data;
    const allToursFlattened = Object.values(allTours).flat();
    const allData = [...activities, ...allToursFlattened, ...dayTrips];
    const shuffledData = allData.sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, 8);
  };

  useEffect(() => {
    const data = getMixedData();
    setMixedData(data);
  }, []);

  // Composant Section avec animation
  const Section = ({ children, id }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.div
        id={id}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
        }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <>
      {/* Section Home */}
      <Section id="home">
        <div className="home-section">
          <div className="content">
            <h1>CAMEL COMPANY MERZOUGA</h1>
            <h2>{t("slider:title")}</h2>
            <p>{t("slider:message")}</p>
            <Link to="/Contact">{t("nav:contact")}</Link>
          </div>
          <img src={home_section} alt="Camel Company Merzouga" className="home_section" />
        </div>
      </Section>

      {/* Section Services */}
      <Section id="services">
        <div className="services">
          {[service1, service2, service3, service4].map((service, index) => (
            <div className="service" key={index}>
              <img src={service} alt={`service ${index + 1}`} />
              <h3>"{t(`services:service${index + 1}`)}".</h3>
            </div>
          ))}
        </div>
      </Section>

      {/* Section About */}
      <Section id="about">
        <div className="about">
          <h1>{t("about:titre")}</h1>
          <div className="content_about">
            <div className="info">
              <p>{t("about:text")}</p>
              <h3>{t("about:titre2")}</h3>
              <p>{t("about:text2")}</p>
              <h3>{t("about:titre3")}</h3>
              <p>{t("about:text3")}</p>
              <h3>{t("about:titre4")}</h3>
              <p>{t("about:text4")}</p>
              <p>{t("about:footer")}</p>
              <Link to="/About">{t("about:button")}</Link>
            </div>
            <div className="img">
              <img src={about_img} alt="about_img" className="img1" />
              <img src={about_img2} alt="about_img" className="img2" />
            </div>
          </div>
        </div>
      </Section>

      {/* Section Tours */}
      <Section id="tours">
        <div className="tours">
          <h1>{t("tours:titre1")}</h1>
          <h2 className="color">{t("tours:titre2")}</h2>
          <h2>{t("tours:titre3")}</h2>
          <div className="mix">
            <CardList items={mixedData} className="card-list-home" />
          </div>
        </div>
      </Section>

      {/* Section Why */}
      <Section id="why">
        <div className="why">
          <div className="text">
            <h1>{t("why:question")}</h1>
            <p>{t("why:repense")}</p>
          </div>
          <img src={why} alt="" />
        </div>
      </Section>
    </>
  );
};

export default Home;