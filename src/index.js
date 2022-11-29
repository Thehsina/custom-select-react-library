import React, { useState } from 'react'
import CustomSelect from './custom-select'
import './styles.module.css'
const options = [
  { id: 1, label: 'Tinu' },
  { id: 2, label: 'Anu' },
  { id: 3, label: 'Gaadha' },
  { id: 4, label: 'Bibin' },
  { id: 5, label: 'Sojin' },
  { id: 6, label: 'Gokul' },
  { id: 7, label: 'Thehsina' },
  { id: 8, label: 'Arun' },
  { id: 9, label: 'Merin' }
]
export const ExampleComponent = () => {
  const [isSearchable, setIsSearchable] = useState(true)
  const [searchText, setSearchText] = useState(undefined)
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const onChange = (searchValue) => {
    setSearchText(searchValue)
  }
  const buttonClicked = () => {
    setIsSelectOpen(!isSelectOpen)
  }
  return (
    <CustomSelect
      options={options}
      isSearchable={isSearchable}
      setIsSearchable={setIsSearchable}
      placeholder='select'
      onChange={onChange}
      searchText={searchText}
      setSearchText={setSearchText}
      onClick={buttonClicked}
      isSelectOpen={isSelectOpen}
      setIsSelectOpen={setIsSelectOpen}
    />
  )
}
