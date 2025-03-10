import * as React from 'react'
import { useState } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Button } from '@mui/material'

const DistrictList = [
  'Quận 1',
  'Quận 3',
  'Quận 4',
  'Quận 5',
  'Quận 6',
  'Quận 7',
  'Quận 8',
  'Quận 10',
  'Quận 11',
  'Quận 12',
  'Quận Tân Bình',
  'Quận Tân Phú',
  'Quận Bình Tân',
  'Quận Bình Thạnh',
  'Quận Gò Vấp',
  'Quận Phú Nhuận',
  'Thành phố Thủ Đức',
]

const DistrictFilter = ({ selectedDistricts, handleSelectDistricts }) => {
  const [showIndex, setShowIndex] = useState(5)
  const handleCollapse = () => {
    setShowIndex(showIndex === 5 ? DistrictList.length : 5)
  }
  return (
    <div>
      <div className='text-[20px] text-primaryText font-bold'>Lọc theo khu vực</div>
      <FormGroup>
        {DistrictList.slice(0, showIndex).map((district) => (
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  '&.Mui-checked': {
                    color: '#7D0600',
                  },
                }}
                onChange={handleSelectDistricts}
                value={district}
                checked={selectedDistricts.includes(district)}
              />
            }
            key={district}
            label={district}
            className='text-primaryText'
          />
        ))}
      </FormGroup>
      <Button onClick={handleCollapse}>
        <div className='font-bold text-primary'>{showIndex === 5 ? 'Xem thêm...' : 'Thu gọn'}</div>
      </Button>
    </div>
  )
}

export default DistrictFilter
