import React from 'react'
import { AutoComplete, type AutoCompleteProps } from 'antd'
import './Autocomplete.scss'

export const AlterAutocomplete: React.FC<AutoCompleteProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <AutoComplete
      style={{
        maxWidth: 800,
        width: '100%',
        height: '48px',
        marginBottom: '12px',
      }}
      options={options}
      allowClear={true}
      value={value}
      placeholder="Артикул"
      filterOption={(inputValue, option) =>
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onSelect={onChange}
    />
  )
}
