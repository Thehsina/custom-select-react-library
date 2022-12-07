import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

const CustomSelect = (props) => {
  const [filteredResults, setFilteredResults] = useState(props.options)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [searchText, setSearchText] = useState(undefined)

  const onChange = (searchValue) => {
    setSearchText(searchValue)
  }

  const buttonClicked = () => {
    setIsSelectOpen(!isSelectOpen)
  }
  const dropDownClose = (val) => {
    props.setValue(val)
    setSearchText('')
    setIsSelectOpen(false)
  }
  const clearSelect = () => {
    props.setValue('')
  }
  const handleKeyDown = (e) => {
    const index = props.options.findIndex((d) => d.id === props.value.id)
    if (e.key === 'ArrowDown') {
      if (index === -1 || index === props.options.length - 1) {
        props.setValue(props.options[0])
      } else if (index < props.options.length - 1) {
        props.setValue(props.options[index + 1])
      }
    }
    if (e.key === 'ArrowUp') {
      if (index >= 1) {
        props.setValue(props.options[index - 1])
      } else if (index === 0) {
        props.setValue(props.options[props.options.length - 1])
      }
    }
    if (e.key === 'Enter') {
      setIsSelectOpen(false)
    }
  }
  // const mouseDownClick = (e) => {
  //   console.log('clicked', e)
  //   if (e.type === 'mousedown') {
  //     setTimeout(() => {
  //       setIsSelectOpen(false)
  //     }, 1000)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', mouseDownClick)
  //   return () => {
  //     document.removeEventListener('click', mouseDownClick)
  //   }
  // })
  // useEffect(() => {
  //   console.log(props.value)
  // }, [props.value])
  useEffect(() => {
    if (searchText) {
      const filteredData = props.options.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchText.toLowerCase())
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(props.options)
    }
  }, [searchText])

  useEffect(() => {
    setSearchText(undefined)
  }, [props.value])

  return (
    <div>
      <div className={styles.custom_select_container}>
        <input
          type='text'
          placeholder={props.placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={
            searchText || searchText === ''
              ? searchText
              : props.value
              ? props.value.label
              : ''
          }
          disabled={props.isDisabled}
          onClick={buttonClicked}
          onKeyDown={handleKeyDown}
          readOnly={!props.isSearchable}
          onBlur={() => setSearchText(undefined)}
        />
        {!props.isDisabled && props.isClearable && (
          <span className={styles.custom_select_clear} onClick={clearSelect}>
            &#x2715;
          </span>
        )}

        {isSelectOpen && (
          <div
            className={`${styles.custom_select_modal} ${
              isSelectOpen ? 'show' : ''
            }`}
            role='listbox'
            tabIndex={-1}
            aria-activedescendant={props.value}
          >
            {filteredResults.map((option, index) => {
              return (
                <div
                  key={`select_${index}`}
                  className={
                    option.id === props.value
                      ? styles.custom_select_modal_item_active
                      : ''
                  }
                >
                  <div
                    className={styles.custom_select_modal_item}
                    id={option.id}
                    role='option'
                    tabIndex={0}
                    onClick={() => {
                      dropDownClose(option)
                    }}
                  >
                    {option.label}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
export default CustomSelect
