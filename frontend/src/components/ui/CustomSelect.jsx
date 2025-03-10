import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

function CustomSelect({ label, options, value, handleChange }) {
  const handleSelectChange = (event) => {
    if (handleChange) {
      handleChange(event.target.value)
    }
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={`select-label-${label.replace(/\s+/g, '-')}`}>{label}</InputLabel>
      <Select
        labelId={`select-label-${label.replace(/\s+/g, '-')}`}
        id={`select-${label.replace(/\s+/g, '-')}`}
        value={value}
        onChange={handleSelectChange}
        label={label}
        sx={{
          borderRadius: '20px',
          '& fieldset': {
            borderWidth: '2px',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

CustomSelect.defaultProps = {
  value: '',
  handleChange: () => {},
}

export default CustomSelect
