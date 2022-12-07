import React, { useState } from 'react'

import { ExampleComponent } from 'custom-select-react-library'
import 'custom-select-react-library/dist/index.css'

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
const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: '1em' }}>
    <input type='checkbox' {...props} />
    {children}
  </label>
)

const App = () => {
  const [isSearchable, setIsSearchable] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isClearable, setClearable] = useState(true)
  const [value, setValue] = useState()

  

  return( 
  <div>
    <ExampleComponent 
      options={options}
      isSearchable={isSearchable}
      placeholder='select'
      isClearable={isClearable}
      isDisabled={isDisabled}
      value={value}
      setValue={setValue}
    />
    <div>
    <Checkbox
        checked={isSearchable}
        onChange={() => setIsSearchable((state) => !state)}
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
    </div>
    )
}

export default App
