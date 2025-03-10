import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

function RequiredTextField({
  label,
  className,
  placeholder,
  whiteBg,
  value,
  handleChange,
  required = true,
}) {
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
          handleChange(e)
          if (error) setError(false)
        }}
        onBlur={handleBlur}
        required={required}
        error={error}
        placeholder={placeholder}
        helperText={error && required ? 'Đây là trường bắt buộc' : ''}
      />
    </div>
  )
}

export default RequiredTextField
