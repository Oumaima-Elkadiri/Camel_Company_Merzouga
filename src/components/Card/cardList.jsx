import React from 'react';
import Card from './card';
import { useTranslation } from 'react-i18next';
import '../../styles/cardList.css';

const CardList = ({ items, className }) => {
  const { t } = useTranslation();

  return (
    <div className={`card-list ${className}`}> {/* Ajoutez la classe personnalisée ici */}
      {items.map((item) => (
        <Card
          key={item.id}
          title={t(item.titre, { ns: item.namespace })}
          duration={t(item.durre, { ns: item.namespace })}
          image={item.image}
          type={t("titre2", { ns: item.namespace })}
          from={t(item.from, { ns: item.namespace })}
          item={item}
        />
      ))}
    </div>
  );
};

export default CardList;