import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCalendarDay, FaBookmark } from 'react-icons/fa';
import '../styles/details.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Définir AnimatedSection en dehors du composant Details
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

const Details = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const { t, i18n } = useTranslation();

  // Remonter en haut de la page à chaque changement d'URL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!item) {
    return <div>No item selected</div>;
  }

  // Fonction pour résoudre les références
  const resolveReference = (reference, translations) => {
    const parts = reference.split('.');
    let result = translations;

    for (const part of parts) {
      if (result && result[part] !== undefined) {
        result = result[part];
      } else {
        console.warn(`Reference "${reference}" not found in translations.`);
        return []; // Retourne un tableau vide si la référence n'est pas trouvée
      }
    }

    return Array.isArray(result) ? result : []; // Assurez-vous de retourner un tableau
  };

  // Charger les traductions pour le namespace spécifié (par exemple, "dayTrips")
  const translations = i18n.getResourceBundle(i18n.language, item.namespace);

  // Résoudre les références pour chaque champ
  const highlights = resolveReference(item.Highlights, translations);
  const included = resolveReference(item.Included, translations);
  const excluded = resolveReference(item.excluded, translations);
  const itinerary = resolveReference(item.Itinerary, translations);

  // Vérifiez que les données sont valides
  if (!highlights || !Array.isArray(highlights)) {
    console.error('Highlights is missing or not an array:', highlights);
    return <div>Invalid data: Highlights is missing or not an array.</div>;
  }

  if (!included || !Array.isArray(included)) {
    console.error('Included is missing or not an array:', included);
    return <div>Invalid data: Included is missing or not an array.</div>;
  }

  if (!excluded || !Array.isArray(excluded)) {
    console.error('Excluded is missing or not an array:', excluded);
    return <div>Invalid data: Excluded is missing or not an array.</div>;
  }

  if (!itinerary || !Array.isArray(itinerary)) {
    console.error('Itinerary is missing or not an array:', itinerary);
    return <div>Invalid data: Itinerary is missing or not an array.</div>;
  }

  let titre;
  if (item.namespace === "allTours") {
    titre = t('titreA2', { ns: 'details' });
  } else if (item.namespace === "activities") {
    titre = t('titreA1', { ns: 'details' });
  } else if (item.namespace === "dayTrips") {
    titre = t('titreA3', { ns: 'details' });
  }

  return (
    <>
      {/* Section Hero (Image et Titre) */}
      <AnimatedSection id="hero">
        <div className="hero-section">
          <h3>{t(item.from, { ns: item.namespace })}</h3>
          <h1>{t(item.titre, { ns: item.namespace })}</h1>
          <div className="info">
            <h3><FaCalendarDay /> {t(item.durre, { ns: item.namespace })}</h3>
            <h3><FaBookmark /> {t(item.namespace, { ns: item.namespace })}</h3>
          </div>
        </div>
      </AnimatedSection>

      <div className="details-page">
        <AnimatedSection id="heroImage">
          <img
            src={`${import.meta.env.BASE_URL}images/${item.image}`}
            alt={t(item.titre, { ns: item.namespace })}
            className="hero-image"
          />
        </AnimatedSection>

        {/* Section Principale */}
        <div className="main-content">
          {/* Section À propos */}
          <AnimatedSection id="about">
            <section className="about-section">
              <h2>{titre}</h2>
              <p>{t(item.about, { ns: item.namespace })}</p>
            </section>
          </AnimatedSection>

          {/* Section Points Forts */}
          <AnimatedSection id="highlights">
            <section className="highlights-section">
              <h2>{t('titreH', { ns: 'details' })}</h2>
              <ul>
                {highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </section>
          </AnimatedSection>

          {/* Section Inclusions et Exclusions */}
          <AnimatedSection id="inclusionsExclusions">
            <div className="inclusions-exclusions">
              {/* Inclusions */}
              <section className="inclusions-section">
                <h2>{t('titreI', { ns: 'details' })}</h2>
                <ul>
                  {included.map((inclusion, index) => (
                    <li key={index}>{inclusion}</li>
                  ))}
                </ul>
              </section>

              {/* Exclusions */}
              <section className="exclusions-section">
                <h2>{t('titreE', { ns: 'details' })}</h2>
                <ul>
                  {excluded.map((exclusion, index) => (
                    <li key={index}>{exclusion}</li>
                  ))}
                </ul>
              </section>
            </div>
          </AnimatedSection>

          {/* Section Itinéraire */}
          <AnimatedSection id="itinerary">
            <section className="itinerary-section">
              <h2>{t('titreIt', { ns: 'details' })}</h2>
              {itinerary.map((day, index) => (
                <div key={index} className="itinerary-day">
                  <h3>
                    <span className="day">{day.titre[0]}</span>  {day.titre[1]}
                  </h3>
                  <ul>
                    {day.liste.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default Details;