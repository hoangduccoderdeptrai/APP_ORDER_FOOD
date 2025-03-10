import React from 'react'
import TextField from '@mui/material/TextField'

function TimeInput({ label, name, value, handleChange }) {
  return (
    <div className='mx-auto my-5 w-full sm:w-[230px]'>
      <TextField
        sx={{
          margin: 'auto',
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            backgroundColor: 'white',
          },
          '& fieldset': {
            borderWidth: '2px',
          },
        }}
        label={label}
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        type='time'
        InputLabelProps={{ shrink: true }}
      />
    </div>
  )
}

export default TimeInput
