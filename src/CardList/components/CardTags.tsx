import React from 'react';

interface CardTagsProps {
  activeButton: string;
  onButtonClick: (type: string) => void;
}

const CardTags: React.FC<CardTagsProps> = ({ activeButton, onButtonClick }) => (
  <div className="tags">
    {['industrial', 'balancer', 'prof'].map((btn) => (
      <button
        key={btn}
        className={`tag-button ${activeButton === btn ? 'active' : ''}`}
        onClick={() => onButtonClick(btn)}
      >
        {btn.toUpperCase()}
      </button>
    ))}
  </div>
);

export default CardTags;
