import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import "../i18n";
import about from '../assets/images/about.jpg';
import mission from '../assets/images/mission.PNG';
import choose from '../assets/images/choose.jpg';
import '../styles/about.css';
import { Link } from "react-router-dom";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { t } = useTranslation(["about", "nav"]);

  // Composant animé
  const AnimatedSection = ({ children, id, direction = "left" }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    const variants = {
      hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
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
        <div className="slider_about">
          <h2>{t("about:slider")}</h2>
          <h1>{t("about:button")}</h1>
        </div>
      </AnimatedSection>

      {/* Section Info 1 */}
      <AnimatedSection id="info1" direction="right">
        <div className="info_about">
          <div className="text_about">
            <h1>{t("about:button")}</h1>
            <p>{t("about:about_text")}</p>
          </div>
          <img src={about} alt="About" />
        </div>
      </AnimatedSection>

      {/* Section Info 2 */}
      <AnimatedSection id="info2" direction="left">
        <div className="info_about">
          <img src={mission} alt="Mission" className="img1" />
          <div className="text_about1">
            <h1>{t("about:mission_title")}</h1>
            <p>{t("about:mission_text")}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Section Info 3 */}
      <AnimatedSection id="info3" direction="right">
        <div className="info_about">
          <div className="text_about">
            <h1>{t("about:choose_title")}</h1>
            <p>{t("about:choose_text")}</p>
          </div>
          <img src={choose} alt="Choose" />
        </div>
      </AnimatedSection>

      {/* Section Help */}
      <AnimatedSection id="help">
        <div className="help_about">
          <h1>{t("about:help")}</h1>
          <Link to="/Contact">{t("nav:contact")}</Link>
        </div>
      </AnimatedSection>
    </>
  );
};

export default About;