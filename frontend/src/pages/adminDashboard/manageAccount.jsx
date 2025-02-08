import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay-ts'
import { ToastContainer } from 'react-toastify'
import TablePagination from '@mui/material/TablePagination'
import defaultAva from '../../assets/images/admin/default_acc.jpg'
import api from '~/features/api'
import PopupDelete from './components/PopupDelete'
import { toast } from 'react-toastify'

const ManageAccount = () => {
  const [allUsers, setAllUsers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [currentPage, setCurrentPage] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(0)
  const [searchValue, setSearchValue] = React.useState('')

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const fetchDataAllUsers = async () => {
    setIsLoading(true)
    try {
      const res = await api.get(`/admin/account?page=${currentPage + 1}&name=${searchValue}`)
      if (res.data.accounts) {
        setAllUsers(res.data.accounts)
        setTotalPages(res.data.objectPagination.numberPages)
      }
    } catch (error) {
      console.error('Error fetching all users: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchAccountName = async (event) => {
    if (event.key === 'Enter') {
      fetchDataAllUsers()
    }
  }

  const handleDeleteAccount = async (userId) => {
    try {
      const res = await api.delete(`/admin/account/delete/${userId}`)
      if (res.data) {
        toast.success('Tài khoản đã được xóa thành công!')
        fetchDataAllUsers()
      }
    } catch (error) {
      console.error('Error deleting account: ', error)
    }
  }

  React.useEffect(() => {
    fetchDataAllUsers()
  }, [currentPage, rowsPerPage])

  return (
    <LoadingOverlay active={isLoading} spinner text='Loading ...' className='h-[650px]'>
      <ToastContainer limit={1} />
      <div className='relative mx-5 my-2 px-3 py-4'>
        <div className='mb-3'>
          <h1 className='text-3xl font-[700] font-family color-1 m-7 text-center text-primary text-[40px]'>
            QUẢN LÝ TẤT CẢ TÀI KHOẢN NGƯỜI DÙNG
          </h1>
        </div>
        <div className='bg-[#FFFFFF] p-10 text-[#212B36] shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)] rounded-[16px] transition-[box-shadow_300ms_cubic-bezier(0.4,0,0.2,1)_0ms] '>
          <div className='max-w-[600px] w-full h-[50px] border-2 flex items-center rounded-md px-3 py-0  border-solid border-[#212B36] border-opacity-60'>
            <div>
              <i className='bx bx-search-alt-2 text-2xl'></i>
            </div>
            <input
              onChange={(event) => setSearchValue(event.target.value)}
              className=' outline-none w-full placeholder:text-slate-400 px-3 py-2 box-border '
              placeholder='Tìm kiếm tên người dùng...'
              onKeyDown={handleSearchAccountName}
            />
          </div>
          <div className=''>
            <table className='w-full border-2 border-collapse border-solid border-[rbg(200,200,200)] mt-4'>
              <thead>
                <tr>
                  <th className='bg-secondary text-accent text-[20px]'>Avatar</th>
                  <th className='bg-secondary text-accent text-[20px]'>Tên</th>
                  <th className='bg-secondary text-accent text-[20px]'>Email</th>
                  <th className='bg-secondary text-accent text-[20px]'>Số điện thoại</th>
                  <th className='bg-secondary text-accent text-[20px]'>Vai trò</th>
                  <th className='bg-secondary text-accent text-[20px]'>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.length > 0 && !isLoading ? (
                  allUsers.map((user) => (
                    <tr key={user._id}>
                      <td className='flex items-center justify-center'>
                        <img
                          src={user.avatar ? user.avatar.url : defaultAva}
                          alt='Avatar User'
                          className='w-12 h-12 rounded-full'
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>
                        <PopupDelete handleDeleteAccount={handleDeleteAccount} userId={user._id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='6' className='text-center'>
                      Không tìm thấy tài khoản nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='px-6 pb-6'>
            <TablePagination
              style={{
                fontWeight: 'bold',
                borderRadius: '4px',
                padding: '10px',
                fontSize: '1rem',
              }}
              page={currentPage}
              component='div'
              count={totalPages * rowsPerPage}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5]}
            />
          </div>
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default ManageAccount
