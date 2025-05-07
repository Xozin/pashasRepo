import React, { useState } from 'react';
import './App.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import data from '../converter/data.json';


function App() {
    const [formData, setFormData] = useState({name:'',});
    const keys = Object.keys(data);

    const handleSubmit  = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);

        console.log('Отправленные данные:', formData);
        alert('Форма отправлена!');
        // сброс (если нужно)
        setFormData({ name: '', });
    };


  return (
      <>
          <h1>Наше Гавно</h1>
          <form className="form" onSubmit={handleSubmit}>
          <div className="card">
              <Autocomplete
                  disablePortal
                  options={keys}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Артикул" />}
              />
              <button type="submit" className="form-button">Поиск</button>
          </div>
          </form>
          <div className="create-line"></div>
      </>
  )
}

export default App
