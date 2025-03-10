import React from 'react'
import TextField from '@mui/material/TextField'

const DisabledTextField = ({ value, label, className }) => {
  return (
    <div className={`mx-auto w-full sm:max-w-[300px] md:max-w-[500px] my-5 ${className}`}>
      <TextField
        label={label}
        sx={{
          margin: 'auto',
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#333333',
            },
          },
          '& .MuiOutlinedInput-root.Mui-disabled fieldset.MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
          },
        }}
        disabled
        value={value}
      />
    </div>
  )
}

export default DisabledTextField
