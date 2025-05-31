import React from 'react'
import './CardList.scss'
import useHandlers from './hooks/useHandlers'

import {
  CardHeader,
  CardTags,
  CardActions,
  Notification,
  PriceArea,
} from './components'

interface CardListProps {
  article: string
  price: string | number
}

export const CardList: React.FC<CardListProps> = ({ article, price }) => {
  const { RRC, activeButton, handlers, discount, rate, snackbar, actions } =
    useHandlers(price)

  return (
    <div className="container">
      <h2>Найденные товары</h2>
      <div className="card">
        <div className="card-left">
          <img
            className="image-placeholder"
            src="./logo.png"
            alt="Логотип"
            width={200}
          />
        </div>
        <div className="card-right">
          <CardHeader
            article={article}
            RRC={RRC}
            price={price}
            onRRCClick={handlers.RRCClickHandler}
          />
          <CardTags
            activeButton={activeButton}
            onButtonClick={handlers.handleButtonClick}
          />
        </div>
      </div>
      <CardActions
        discount={discount}
        rate={rate}
        onDiscountChange={handlers.percentChangeHandler}
        onRateChange={handlers.rateChangeHandler}
        onResetRate={handlers.resetRate}
        onDiscountBlur={handlers.percentBlurHandler}
        onDiscountFocus={handlers.percentFocusHandler}
      />
      <PriceArea
        RRC={RRC}
        discount={discount}
        rate={rate}
        onPriceClick={handlers.priceClickHandler}
      />
      <Notification open={snackbar.open} onClose={actions.handleClose} />
    </div>
  )
}

// export default CardList;
