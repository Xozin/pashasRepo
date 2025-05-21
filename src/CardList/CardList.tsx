import React, {type ReactNode, useState, useEffect, type MouseEventHandler} from 'react';
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
  const [discount, setDiscount] = useState('0');
  const [activeButton, setActiveButton] = useState('');



  const industrialHandler = () => {
    setActiveButton('industrial')
    return (typeof price === 'number' && !isNaN(price)) ? SetRRC((price * config.rates.industrial).toFixed(2)) : price
  }

  const balancerHandler = () => {
    setActiveButton('balancer')

    return (typeof price === 'number' && !isNaN(price)) ? SetRRC((price * config.rates.balancer).toFixed(2)) : price
  }

  const profHandler = () => {
    setActiveButton('prof')

    return (typeof price === 'number' && !isNaN(price)) ? SetRRC((price * config.rates.prof).toFixed(2)) : price
  }

  const copyHandler = async (text: string) => {
    await navigator.clipboard.writeText(text)
    handleClick()

  }
  const RRCClickHandler = () => {
    copyHandler(RRC.toString())
  }

  const priceClickHandler = (event: MouseEventHandler<HTMLSpanElement>) => {
    copyHandler(parseFloat(event.target.innerText).toFixed(2))
  }

  useEffect(() => {
    if (activeButton === 'industrial') {
      industrialHandler();
    } else if (activeButton === 'balancer') {
      balancerHandler();
    } else if (activeButton === 'prof') {
      profHandler();
    } else {
      SetRRC(price); // если кнопка не выбрана
    }
  }, [article, price]);

  const rateChangeHandler = (event: { target: { value: string; }; })=> {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/,/g, '.')
    inputValue = inputValue.replace(/[^0-9.,]/g, '');
    inputValue = inputValue.replace(/(?<=\d*\.\d*)\./g, '')
    inputValue = inputValue.replace(/^0+(?!\.|,|$)/, '');

    setRate(inputValue ? inputValue : '0');

  }

  const percentChangeHandler = (event: { target: { value: string; }; })=> {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/,/g, '.')
    inputValue = inputValue.replace(/[^0-9.,]/g, '');
    inputValue = inputValue.replace(/(?<=\d*\.\d*)\./g, '')
    inputValue = inputValue.replace(/^0+(?!\.|,|$)/, '');
    setDiscount(inputValue ? inputValue : '0');
  }

  const percentBlurHandler = (event: { target: { value: string; }; })=> {
    let inputValue = event.target.value;
    inputValue = inputValue+'%'
    console.log(inputValue)
    setDiscount(inputValue ? inputValue : '0');
  }

  const percentFocusHandler = (event: { target: { value: string; }; })=> {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9.,]/g, '');
    setDiscount(inputValue ? inputValue : '0');

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
            <img className={"image-placeholder"} src="./logo.png" alt="Логотип" width={200} />
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
              <button className={`tag-button ${activeButton === "industrial" ? "active" : ""}`} onClick={industrialHandler}>INDUSTRIAL</button>
              <button className={`tag-button ${activeButton === "balancer" ? "active" : ""}`} onClick={balancerHandler}>BALANCERS</button>
              <button className={`tag-button ${activeButton === "prof" ? "active" : ""}`} onClick={profHandler}>PROF LINE</button>
            </div>
          </div>
        </div>
        <div className="actions">
          <label>Скидка</label>
          <input type="text" value={discount} className="input" onChange={percentChangeHandler} onBlur={percentBlurHandler} onFocus={percentFocusHandler} />
          <label>По курсу</label>
          <input className="input" type={'text'} placeholder="Курс" value={rate} onChange={rateChangeHandler} />
          <button className="close-btn" onClick={()=>setRate('0')}>×</button>
        </div>
        <div className="priceArea">
          <span className='price' onClick={priceClickHandler}>{((+RRC )*(1 - parseFloat(discount)/100)).toFixed(2)+'€'}</span>
          <span className='price' onClick={priceClickHandler}>{((+RRC * +rate)*(1 - parseFloat(discount)/100)).toFixed(2)+'₽'}</span>
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