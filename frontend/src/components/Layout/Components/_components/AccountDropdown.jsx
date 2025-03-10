import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import Logout from '@mui/icons-material/Logout'
import HistoryIcon from '@mui/icons-material/History'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { Link } from 'react-router-dom'
import { routes } from '~/configs'
import authApi from '~/apis/auth'
import useAuth from '~/stores/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useCheckRole from '~/hooks/useCheckRole'

export default function AccountMenu({ user, setUserInfo }) {
  const { logout, setUser } = useAuth()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = async () => {
    try {
      const res = await authApi.signOut()
      logout()
      setUser(null)
      setUserInfo(null)

      toast.success('Đăng xuất thành công!')
    } catch (error) {
      toast.error('Đã xảy ra lỗi, thử lại sau!')
    }

    navigate(routes.HOME)
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Box>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='large'
            sx={{ ml: 2, p: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <div className='flex gap-3 justify-start'>
              <div className='text-white flex-col gap-1 text-sm justify-start'>
                <p className='font-bold text-[15px]'>{user?.username}</p>
                <p>{user?.email}</p>
              </div>
              <Avatar sx={{ width: 32, height: 32 }} src={user?.avatar?.url} alt='avatar' />
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        disableScrollLock
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to={routes.DETAIL_ACCOUNT}>
          <MenuItem onClick={handleClose} sx={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <ListItemIcon>
              <AccountCircleIcon fontSize='small' />
            </ListItemIcon>
            Tài khoản của tôi
          </MenuItem>
        </Link>
        <Link to={routes.ORDER_TRACKING}>
          <MenuItem onClick={handleClose} sx={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <ListItemIcon>
              <HistoryIcon fontSize='small' />
            </ListItemIcon>
            Lịch sử mua hàng
          </MenuItem>
        </Link>
        {useCheckRole('seller') && (
          <Link to={routes.RESTAURANT_DASHBOARD}>
            <MenuItem onClick={handleClose} sx={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <ListItemIcon>
                <RestaurantIcon fontSize='small' />
              </ListItemIcon>
              Nhà hàng của tôi
            </MenuItem>
          </Link>
        )}

        {useCheckRole('admin') && (
          <Link to={routes.ADMIN_MANAGEACCOUNT}>
            <MenuItem onClick={handleClose} sx={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <ListItemIcon>
                <AdminPanelSettingsIcon fontSize='small' />
              </ListItemIcon>
              Admin
            </MenuItem>
          </Link>
        )}

        <Divider sx={{ marginTop: '5px', marginBottom: '5px' }} />

        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
