import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

function NumericTextField({ label, className, whiteBg, value, handleChange }) {
  const [error, setError] = useState(false)

  const handleBlur = () => {
    if (!value) {
      setError(true)
    }
  }

  return (
    <div className={`mx-auto w-full sm:max-w-[300px] md:max-w-[500px] my-5 ${className}`}>
      <TextField
        sx={{
          margin: 'auto',
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            backgroundColor: whiteBg ? 'white' : 'transparent',
          },
          '& fieldset': {
            borderWidth: '2px',
          },
        }}
        label={label}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value
          if (/^\d*$/.test(newValue)) {
            handleChange(e)
            if (error) setError(false)
          }
        }}
        onBlur={handleBlur}
        required
        error={error}
        helperText={error ? 'Trường này là bắt buộc' : ''}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      />
    </div>
  )
}

export default NumericTextField
