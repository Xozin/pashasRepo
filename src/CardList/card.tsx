import React from 'react';
import './CardList.scss'

const CardList = () => {
  const article = "ТУТ ОТОБРАЖАЕТСЯ НАЙДЕННЫЙ АРТИКУЛ"
  const RRC = "ТУТ ОТОБРАЖАЕТСЯ РЕЗУЛЬТАТ КЭФА"
  const price = "ТУТ ЦЕНА"
  return (
      <div className="container">
        <h2>Найденные товары</h2>
        <div className="card">
          <div className="card-left">
            <div className="image-placeholder" />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div>
                <strong> Артикул: {article} </strong>
                <p className="RRC">RRC {RRC}</p>
              </div>
              <div className="price">Цена из прайса: {price} </div>
            </div>
            <div className="tags">
              <button className="tag-button">INDUSTRIAL</button>
              <button className="tag-button">BALANCERS</button>
              <button className="tag-button">PROF LINE</button>
            </div>
          </div>
        </div>
        <div className="actions">
          <button className="dark-btn">Дать скидку</button>
          <button className="dark-btn">По курсу</button>
          <input className="input" placeholder="Курс" />
          <button className="close-btn">×</button>
        </div>
      </div>
  );
}
export default CardList;