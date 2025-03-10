import React from 'react'
import { Tabs, Tab, Box } from '@mui/material'

const Navigation = ({ labels, value, onChange }) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant='scrollable'
      scrollButtons='auto'
      aria-label='navigation tabs'
      sx={{
        display: 'flex',
        justifyContent: 'center', // Căn giữa các tab
        backgroundColor: '#fdf8e7',
        '& .MuiTabs-flexContainer': {
          justifyContent: 'center', // Đảm bảo các tab được căn giữa
        },
        '& .MuiTab-root': {
          minWidth: '120px',
          padding: '8px 16px',
          fontSize: { xs: 12, sm: 14 },
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'medium',
          color: '#333333',
        },
        '& .MuiTabs-indicator': {
          backgroundColor: '#7D0600',
          height: '3px',
        },
      }}
    >
      {labels.map((label, index) => (
        <Tab
          key={`tab-${index}`}
          label={label}
          sx={{
            '&.Mui-selected': {
              color: '#7D0600',
              fontWeight: 'bold',
            },
          }}
        />
      ))}
    </Tabs>
  )
}

export default Navigation
