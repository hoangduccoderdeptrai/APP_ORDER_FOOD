import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

function EmailTextField({ label, className, whiteBg, value, handleChange }) {
  const [error, setError] = useState(false)

  const handleBlur = () => {
    const emailPattern = /@/
    if (!emailPattern.test(value)) {
      setError(true)
    }
  }

  return (
    <div className={`mx-auto max-w-[500px] my-5 ${className}`}>
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
        required
        error={error}
        helperText={error ? 'Vui lòng nhập địa chỉ email hợp lệ' : ''}
      />
    </div>
  )
}

export default EmailTextField
