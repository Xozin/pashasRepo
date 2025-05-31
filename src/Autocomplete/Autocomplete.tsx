import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import React, { useMemo } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { VariableSizeList } from 'react-window'

const renderRow = ({
  data,
  index,
  style,
}: {
  data: any
  index: number
  style: React.CSSProperties
}) => (
  <div
    style={{
      ...style,
      border: 'none',
      textAlign: 'left',
      lineHeight: '34px',
    }}
    className="myli"
    role="option"
    aria-selected={false}
  >
    {data[index]}
  </div>
)

const VirtualizedListbox = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>((props, ref) => {
  const { children, ...other } = props

  const itemData = useMemo(() => React.Children.toArray(children), [children])
  const itemCount = itemData.length
  const itemSize = 32

  return (
    <div ref={ref} {...other} role="listbox">
      <VariableSizeList
        height={Math.min(itemCount * itemSize, 300)}
        width="100%"
        itemSize={() => itemSize}
        itemCount={itemCount}
        itemData={itemData}
        overscanCount={5}
      >
        {renderRow}
      </VariableSizeList>
    </div>
  )
})

interface MyAutocompleteProps {
  value: string | null // Текущая выбранная опция
  setValue: (value: string | null) => void // Функция для изменения выбранной опции
  inputValue: string // Значение текстового ввода
  setInputValue: (value: string) => void // Функция для изменения значения текстового ввода
  keys: string[] // Список опций
}

export const MyAutocopmlete: React.FC<MyAutocompleteProps> = ({
  value,
  setValue,
  inputValue,
  setInputValue,
  keys,
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const keyHandler = (e) => {
    const keyKode = e.keyCode
    console.log(keyKode)
    if (keyKode === 13) {
      console.log('enter!')
    }
    if (keyKode === 38) {
      console.log('up!')
    }
    if (keyKode === 40) {
      console.log('down!')
    }
  }
  return (
    <div className="card">
      <Autocomplete
        disablePortal
        style={{ width: '700px' }}
        value={value}
        onChange={(_event, newValue) => setValue(newValue)}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
        slots={{ listbox: VirtualizedListbox }}
        id="controllable-states-demo"
        options={keys}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Артикул" />}
        onKeyDown={keyHandler}
      />
    </div>
  )
}
