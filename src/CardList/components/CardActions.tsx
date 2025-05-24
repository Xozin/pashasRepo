import React from 'react';

interface CardActionsProps {
  discount: string;
  rate: string;
  onDiscountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDiscountBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDiscountFocus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetRate: () => void;
}

const CardActions: React.FC<CardActionsProps> = ({ discount, rate, onDiscountChange, onRateChange, onResetRate, onDiscountBlur, onDiscountFocus  }) => (
  <div className="actions">
    <label>Скидка</label>
    <input
      type="text"
      value={discount}
      className="input"
      onChange={onDiscountChange}
      onBlur={onDiscountBlur}
      onFocus={onDiscountFocus}
    />
    <label>По курсу</label>
    <input
      className="input"
      type="text"
      placeholder="Курс"
      value={rate}
      onChange={onRateChange}
    />
    <button className="close-btn" onClick={onResetRate}>×</button>
  </div>
);

export default CardActions;
