import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

const currencies = [
  {
    value: 'restaurant',
    label: 'Tìm theo quán',
  },
  {
    value: 'food',
    label: 'Tìm theo món ăn',
  },
]

const SearchBar = ({
  searchValue,
  handleChangeSearch,
  handleChangeCurrencies,
  currencyValue = 'restaurant',
  handleSubmit,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className='w-full flex max-w-[800px] mx-auto'>
      <TextField
        value={searchValue}
        onChange={handleChangeSearch}
        fullWidth
        placeholder={currencyValue === 'food' ? 'Tìm kiếm món ăn' : 'Tìm kiếm quán ăn'}
        className='bg-white rounded-l-full outline-none pl-2'
        autoFocus
        onKeyDown={handleKeyDown}
        sx={{
          '& .MuiOutlinedInput-root': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '30px 0 0 30px',
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
            '& .MuiInputBase-input': {
              paddingLeft: '30px',
            },
          },
          '@media (max-width: 768px)': {
            '& .MuiOutlinedInput-root': {
              height: '40px',
              boxShadow: 'none',
            },
          },
        }}
      />
      <TextField
        id='outlined-select-currency'
        select
        value={currencyValue}
        onChange={handleChangeCurrencies}
        defaultValue='restaurant'
        sx={{
          '& .MuiOutlinedInput-root': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '0 30px 30px 0',
            minWidth: '175px',
            backgroundColor: '#F3BE12',
            borderColor: '#F3BE12',
            '&.Mui-focused fieldset': {
              borderColor: '#A64C46',
            },
          },
          '@media (max-width: 768px)': {
            '& .MuiOutlinedInput-root': {
              minWidth: '40px',
              padding: '0',
              height: '40px',
              boxShadow: 'none',
            },
            '& .MuiSelect-select': {
              color: 'transparent',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '40px',
            },
            '& .MuiSelect-icon': {
              visibility: 'visible',
            },
          },
        }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value} className='min-w-[100px]'>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}

export default SearchBar
