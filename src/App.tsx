import React, { useState } from 'react';
import './App.scss'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// @ts-ignore
import { VariableSizeList } from 'react-window';

interface DataType {
  [key: string]: string | number;
}

import untypedData from '../converter/data.json';
import CardList from "./CardList/card.tsx";

const data: DataType = untypedData;

// Компонент виртуализированного списка
const renderRow = ({ data, index, style }: { data: any; index: number; style: React.CSSProperties }) => {
  return (
    <div
      style={{
        ...style,
        border: 'none',
        display: 'block',
        textAlign: 'left',
        lineHeight: '34px',
      }}
      className={'myli'}
    >
      {data[index]}
    </div>
  );
};

const VirtualizedListbox = React.forwardRef(function VirtualizedListbox(
  props: React.HTMLAttributes<HTMLElement>,
  ref: React.Ref<HTMLDivElement>
) {
  const { children, ...other } = props;

  const itemData = React.Children.toArray(children);
  const itemCount = itemData.length;
  const itemSize = 32; // Высота элемента списка

  return (
    <div ref={ref} {...other}>
      <VariableSizeList
        height={Math.min(8 * itemSize, 300)} // Максимальная высота списка
        width="100%"
        itemSize={() => itemSize}
        itemCount={itemCount}
        itemData={itemData}
        overscanCount={5} // Сколько элементов загружать за пределами видимой области
      >
        {renderRow}
      </VariableSizeList>
    </div>
  );
});

function App() {
    const keys = Object.keys(data);
    const [value, setValue] = React.useState<string | null>();
    const [inputValue, setInputValue] = useState('');

    const handleSubmit  = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(value){alert(data[value])}
    };


  return (
    <>
      <h1>Наше Гавно</h1>
      <form className="form" onSubmit={handleSubmit}>
      <div className="card">
        <Autocomplete
          disablePortal
          value={value}
          onChange={(_event: any, newValue: string | null) => {
              setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => {
              setInputValue(newInputValue);
          }}
          slots={{
            listbox: VirtualizedListbox, // Используем кастомный виртуализированный список
          }}
          id="controllable-states-demo"        options={keys}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Артикул" />}
              />
              <button type="submit" className="form-button">Поиск</button>
          </div>
          </form>
          <div className="create-line"></div>
      {value && <div className="cardBoard">

      </div> }
    <CardList/>
      </>
  )
}

export default App
