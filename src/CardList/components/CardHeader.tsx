import React from 'react';

interface CardHeaderProps {
  article: string;
  RRC: string | number;
  price: string | number;
  onRRCClick: () => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({ article, RRC, price, onRRCClick }) => (
  <div className="card-header">
    <div>
      Артикул: {article}
      <p className="RRC" onClick={onRRCClick}>RRC {RRC}€</p>
    </div>
    <div className="price">Цена из прайса: {price}€</div>
  </div>
);

export default CardHeader;
