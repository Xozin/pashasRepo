import React, { useState, useMemo } from 'react'
import './App.scss'

import untypedData from './data/data.json'
import { CardList } from './CardList'
import type { IData } from './data/IData.ts'
import { AlterAutocomplete } from './Autocomplete'
const data: IData = untypedData

function App() {
  const keys = useMemo(
    () => Object.keys(data).map((key: string) => ({ value: key })),
    [],
  )
  const [value, setValue] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <h1>Ведро артикулов</h1>
      <form className="form" onSubmit={handleSubmit}>
        <AlterAutocomplete options={keys} onChange={setValue} />
      </form>

      <div className="create-line"></div>
      {value && (
        <div className="cardBoard">
          <CardList article={value} price={data[value]} />
        </div>
      )}
    </>
  )
}

export default App
