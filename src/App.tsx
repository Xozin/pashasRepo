import React, {useState} from 'react';
import './App.scss'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {VariableSizeList} from 'react-window';

import untypedData from './data/data.json';
import CardList from "./CardList/CardList.tsx";
import type {IData} from "./data/IData.ts";

const data: IData = untypedData;

// Компонент виртуализированного списка
const renderRow = ({data, index, style}: { data: any; index: number; style: React.CSSProperties }) => {
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
      role="option"
      aria-selected={false}
    >
      {data[index]}
    </div>
  );
};

const VirtualizedListbox = React.forwardRef(function VirtualizedListbox(
  props: React.HTMLAttributes<HTMLElement>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...other} = props;

  const itemData = React.Children.toArray(children);
  const itemCount = itemData.length;
  const itemSize = 32; // Высота элемента списка

  return (
    <div ref={ref} {...other} role="listbox">
      <VariableSizeList
        height={Math.min(12 * itemSize, 300)} // Максимальная высота списка
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
  const [value, setValue] = useState<string | null>();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>Ведро артикулов</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="card">
          <Autocomplete
            disablePortal
            style={{width: '700px'}}
            value={value}
            onChange={(_event: any, newValue: string | null) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(_event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            slots={{listbox: VirtualizedListbox as React.ComponentType<React.HTMLAttributes<HTMLElement>>}}
            id="controllable-states-demo"
            options={keys}
            sx={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Артикул"/>}
          />
        </div>
      </form>
      <div className="create-line"></div>
      {value && <div className="cardBoard">
          <CardList article={value} price={data[value]}/>
      </div>}
    </>
  )
}

export default App
