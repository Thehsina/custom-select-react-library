import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

const CustomSelect = (props) => {
  const [value, setValue] = useState({})
  const [filteredResults, setFilteredResults] = useState(props.options)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isClearable, setClearable] = useState(true)

  const Checkbox = ({ children, ...props }) => (
    <label style={{ marginRight: '1em' }}>
      <input type='checkbox' {...props} />
      {children}
    </label>
  )
  const buttonClicked = () => {
    props.setIsSelectOpen(!props.isSelectOpen)
  }
  const dropDownClose = (val) => {
    console.log('value', val)
    setValue(val)
    props.setSearchText('')
    props.setIsSelectOpen(false)
  }
  const clearSelect = () => {
    setValue('')
  }
  const handleKeyDown = (e) => {
    const index = props.options.findIndex((d) => d.id === value.id)
    if (e.key === 'ArrowDown') {
      if (index === -1 || index === props.options.length - 1) {
        setValue(props.options[0])
      } else if (index < props.options.length - 1) {
        setValue(props.options[index + 1])
      }
    }
    if (e.key === 'ArrowUp') {
      if (index >= 1) {
        setValue(props.options[index - 1])
      } else if (index === 0) {
        setValue(props.options[props.options.length - 1])
      }
    }
    if (e.key === 'Enter') {
      props.setIsSelectOpen(false)
    }
  }
  const mouseDownClick = (e) => {
    console.log('clicked', e)
    if (e.type === 'mousedown') {
      setTimeout(() => {
        props.setIsSelectOpen(false)
      }, 1000)
    }
  }

  useEffect(() => {
    document.addEventListener('click', mouseDownClick)
    return () => {
      document.removeEventListener('click', mouseDownClick)
    }
  })
  useEffect(() => {
    console.log(value)
  }, [value])
  useEffect(() => {
    if (props.searchText) {
      const filteredData = props.options.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(props.searchText.toLowerCase())
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(props.options)
    }
  }, [props.searchText])

  useEffect(() => {
    props.setSearchText(undefined)
  }, [value])

  return (
    <div>
      <div className={styles.custom_select_container}>
        {props.isSearchable ? (
          <React.Fragment>
            <input
              type='text'
              className={props.isSelectOpen ? styles.expanded : ''}
              placeholder={props.placeholder}
              onChange={(e) => props.onChange(e.target.value)}
              value={
                props.searchText || props.searchText === ''
                  ? props.searchText
                  : value.label
                  ? value.label
                  : ''
              }
              disabled={isDisabled}
              onClick={props.onClick}
              onKeyDown={handleKeyDown}
              // onBlur={() => setSearchText(undefined)}
            />
            {value && isClearable ? (
              <span
                className={styles.custom_select_clear}
                onClick={clearSelect}
              >
                &#x2715;
              </span>
            ) : (
              ''
            )}
          </React.Fragment>
        ) : (
          <button onClick={buttonClicked} onKeyDown={handleKeyDown}>
            {value.label}
          </button>
        )}

        {props.isSelectOpen ? (
          <div
            className={`${styles.custom_select_modal} ${
              props.isSelectOpen ? 'show' : ''
            }`}
            role='listbox'
            tabIndex={-1}
            aria-activedescendant={value.label}
          >
            {filteredResults.map((option, index) => {
              return (
                <div
                  key={`select_${index}`}
                  className={
                    option.id === value.id
                      ? styles.custom_select_modal_item_active
                      : ''
                  }
                >
                  <div
                    className={styles.custom_select_modal_item}
                    id={option.id}
                    role='option'
                    aria-selected={value === index}
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
        ) : (
          ''
        )}
      </div>
      <Checkbox
        checked={props.isSearchable}
        onChange={() => props.setIsSearchable((state) => !state)}
      >
        Searchable
      </Checkbox>
      <Checkbox
        checked={isDisabled}
        onChange={() => setIsDisabled((state) => !state)}
      >
        Disabled
      </Checkbox>
      <Checkbox
        checked={isClearable}
        onChange={() => setClearable((state) => !state)}
      >
        Clearable
      </Checkbox>
    </div>
  )
}
export default CustomSelect
