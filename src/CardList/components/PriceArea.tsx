import React from 'react';

interface PriceAreaProps {
  RRC: string | number;
  discount: string;
  rate: string;
  onPriceClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const PriceArea: React.FC<PriceAreaProps> = ({ RRC, discount, rate, onPriceClick }) => (
  <div className="priceArea">
    <span className="price" onClick={onPriceClick}>
      {((+RRC) * (1 - parseFloat(discount) / 100)).toFixed(2) + '€'}
    </span>
    <span className="price" onClick={onPriceClick}>
      {((+RRC * +rate) * (1 - parseFloat(discount) / 100)).toFixed(2) + '₽'}
    </span>
  </div>
);

export default PriceArea;
