import React, {type ReactNode, useState} from 'react';
import './CardList.scss'

interface CardListProps {
  article: string;
  price: string | number;
}

import untypedConfig from '../data/config.json';
import type {IConfig} from "../data/configType.ts";
import {IconButton, Snackbar, type SnackbarCloseReason} from "@mui/material";

const config: IConfig = untypedConfig as IConfig;

function CloseIcon() {
  return null;
}

const CardList: React.FC<CardListProps> = ({article, price}): ReactNode => {

  const [RRC, SetRRC] = useState(price);
  const [rate, setRate] = useState('0');
  const [discount] = useState('0');

  const industrialHandler = () => (typeof price === 'number' && !isNaN(price))?SetRRC((price * config.rates.industrial).toFixed(2)): price

  const balancerHandler = () => (typeof price === 'number' && !isNaN(price))?SetRRC((price * config.rates.balancer).toFixed(2)): price

  const profHandler = () => (typeof price === 'number' && !isNaN(price))?SetRRC((price * config.rates.prof).toFixed(2)): price

  const copyHandler = async (text: string) => {
    await navigator.clipboard.writeText(text)
    handleClick()

  }
  const RRCClickHandler = () => {
    copyHandler(RRC.toString())
  }

  const priceClickHandler = () => {
    copyHandler((+RRC * +rate).toFixed(2).toString())
  }

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
    </React.Fragment>
  );

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
                Артикул: {article}
                <p className="RRC" onClick={RRCClickHandler}>RRC {RRC}€</p>
              </div>
              <div className="price">Цена из прайса: {price}€ </div>
            </div>
            <div className="tags">
              <button className="tag-button" onClick={industrialHandler}>INDUSTRIAL</button>
              <button className="tag-button" onClick={balancerHandler}>BALANCERS</button>
              <button className="tag-button" onClick={profHandler}>PROF LINE</button>
            </div>
          </div>
        </div>
        <div className="actions">
          <label>Скидка</label>
          <input type="text" value={discount} className="input"/>
          <label>По курсу</label>
          <input className="input" type={'text'} placeholder="Курс" value={rate} onChange={(event)=> {
            let inputValue = event.target.value;

            inputValue = inputValue.replace(/,/g, '.')

            // Удаляем все символы, кроме цифр и точки
            inputValue = inputValue.replace(/[^0-9.,]/g, '');
            inputValue = inputValue.replace(/(?<=\d*\.\d*)\./g, '')

            // Удаляем ведущие нули
            inputValue = inputValue.replace(/^0+(?!\.|,|$)/, '');
            // Преобразуем в число и обновляем состояние
            console.log(inputValue)
            console.log(+inputValue)
            setRate(inputValue ? inputValue : '0');

          }}/>
          <button className="close-btn" onClick={()=>setRate('0')}>×</button>
        </div>
        <div className="priceArea">
          <span className='price' onClick={priceClickHandler}>{(+RRC * +rate).toFixed(2)+'₽'}</span>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message="Цена скопирована в буфер обмена"
          action={action}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Устанавливаем позицию
        />
      </div>
  );
}
export default CardList;