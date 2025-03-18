import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaStar } from 'react-icons/fa'; // Importez les icônes

const Card = ({ title, duration, image, type, from, item }) => {
  const navigate = useNavigate();
  const imagePath = `${import.meta.env.BASE_URL}images/${image}`;
  const handleClick = () => {
    navigate('/details', { state: { item } });
  };
  return (
    <div className="card"  onClick={handleClick}>
      <div className="card-image-container">
        <img src={imagePath} alt={title} className="card-image" />
        <div className="card-from">{from}</div> {/* Texte "from" en dessus de l'image */}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="footerCard">
          <p className="card-duration">
            <FaClock /> {duration} {/* Icône de durée */}
          </p>
          <div className="divider"></div> {/* Ligne de séparation */}
          <p className="card-type">
            <FaStar /> {type} {/* Icône de type */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;