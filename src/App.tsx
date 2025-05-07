import React, { useState } from 'react';
import './App.css'

function App() {
    const [formData, setFormData] = useState({name:'',});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit  = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
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
              <label htmlFor="name" className="form-label">Введи Артикул</label>
              <input name="name" type="text" className="form-input" placeholder="Артикул" value={formData.name} onChange={handleChange}/>
              <button type="submit" className="form-button">Поиск</button>
          </div>
          </form>
          <div className="create-line"></div>
      </>
  )
}

export default App
