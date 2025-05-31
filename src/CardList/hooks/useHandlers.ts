import { useState, useEffect, useCallback } from 'react'
import untypedConfig from '../../data/config.json'
import type { IConfig } from '../../data/configType.ts'

const config: IConfig = untypedConfig as IConfig

const useHandlers = (price: string | number) => {
  const [RRC, SetRRC] = useState(price)
  const [rate, setRate] = useState('0')
  const [discount, setDiscount] = useState('0')
  const [activeButton, setActiveButton] = useState('')
  const [snackbar, setSnackbar] = useState({ open: false })

  const calculateRRC = useCallback(
    (type: string) => {
      if (typeof price === 'number' && !isNaN(price)) {
        const rate = config.rates[type] || 1
        SetRRC((price * rate).toFixed(2))
      }
    },
    [price],
  )

  useEffect(() => {
    if (activeButton) calculateRRC(activeButton)
  }, [activeButton, calculateRRC])

  const handleButtonClick = (type: string) => setActiveButton(type)

  const copyHandler = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setSnackbar({ open: true })
  }

  const RRCClickHandler = () => copyHandler(RRC.toString())

  const priceClickHandler = (event: React.MouseEvent<HTMLSpanElement>) =>
    copyHandler(parseFloat(event.currentTarget.innerText).toFixed(2))

  const rateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
      .replace(/,/g, '.') // Замена запятых на точки
      .replace(/[^0-9.]/g, '') // Удаление всех символов, кроме цифр и точки
      .replace(/^0+(?=\d)/, '') // Удаление ведущих нулей

    setRate(inputValue || '0')
  }

  const percentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
      .replace(/,/g, '.') // Замена запятых на точки
      .replace(/[^0-9.]/g, '') // Удаление всех символов, кроме цифр и точки
      .replace(/^0+(?=\d)/, '') // Удаление ведущих нулей

    setDiscount(inputValue || '0')
  }

  const percentBlurHandler = (event: { target: { value: string } }) => {
    const inputValue = `${event.target.value}%`
    setDiscount(inputValue ? inputValue : '0')
  }

  const percentFocusHandler = (event: { target: { value: string } }) => {
    const inputValue = event.target.value.replace(/[^0-9.,]/g, '')
    setDiscount(inputValue ? inputValue : '0')
  }

  const resetRate = () => setRate('0')

  const handleClose = () => setSnackbar({ open: false })

  return {
    RRC,
    activeButton,
    rate,
    discount,
    snackbar,
    handlers: {
      handleButtonClick,
      RRCClickHandler,
      priceClickHandler,
      rateChangeHandler,
      percentChangeHandler,
      resetRate,
      percentBlurHandler,
      percentFocusHandler,
    },
    actions: {
      handleClose,
    },
  }
}

export default useHandlers
