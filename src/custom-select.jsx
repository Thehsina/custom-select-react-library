import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

const CustomSelect = (props) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [value, setValue] = useState(props.input)
  const [searchText, setSearchText] = useState('')
  const options = ['Tinu', 'Anu', 'Gaadha']
  useEffect(() => {
    setValue(options[0].label)
  }, [])
  const buttonClicked = () => {
    setIsSelectOpen(!isSelectOpen)
  }
  const dropDownClose = (index) => {
    setValue(index)
    setIsSelectOpen(false)
  }
  const handleSearchChange = (e) => {
    // if (options.includes(e.target.value)) {
    //   console.log(true)
    setSearchText(e.target.value)
    // }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setValue(value - 1 >= 0 ? value - 1 : options.length - 1)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setValue(value === options.length - 1 ? 0 : value + 1)
    }
  }
  useEffect(() => {
    options.filter((d) => {
      if (props.input === '') {
        return d
      } else {
        return d.toLowerCase().includes(props.input)
      }
    })
  }, [])
  useEffect(() => {
    setSearchText(options[value])
  }, [value])
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <div>
      <div className={styles.custom_select_container}>
        <input
          type='search'
          className={styles.custom_select_input}
          placeholder='SEARCH...'
          onChange={handleSearchChange}
          value={searchText}
          onClick={buttonClicked}
        />
        {isSelectOpen ? (
          <div
            className={styles.custom_select_modal}
            role='listbox'
            aria-activedescendant={options[value]}
            tabIndex={-1}
          >
            {options.map((option, index) => (
              <div key={`select_${index}`}>
                <div
                  className={styles.custom_select_modal_item}
                  id={option}
                  role='option'
                  aria-selected={value === index}
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  onClick={() => {
                    dropDownClose(index)
                  }}
                >
                  {option}
                </div>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
export default CustomSelect
