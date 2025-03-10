import { Link } from 'react-router-dom'
import ApartmentIcon from '@mui/icons-material/Apartment'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import VerifiedIcon from '@mui/icons-material/Verified'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'

import footerImage from '~/assets/images/footer.png'
import Logo from '~/assets/icons/logo.svg'
import { routes } from '~/configs'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div
      className='min-w-screen h-[510px] py-[50px] px-2 md:px-5 lg:px-20'
      style={{
        backgroundImage: `url(${footerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='flex flex-col md:flex-row max-md:gap-8 justify-between w-full items-center text-white pl-10'>
        <img src={Logo} alt='Yummy logo' style={{ width: '125px', height: 'auto' }} />
        <div className='grid grid-cols-3 gap-x-[30px] md:gap-x-[20px] lg:gap-x-[40px] gap-y-[1px]'>
          <div>
            <p className='text-2xl md:text-[20px] font-bold'>Về Yummy</p>
            <div className='md:text-sm flex flex-col mt-5 md:mt-3 text-[#C9C9C9] gap-2.5 md:gap-[5px]'>
              <Link to={routes.ABOUTUS} className='hover:underline' onClick={scrollToTop}>
                Giới thiệu
              </Link>
              <Link to={routes.OURCOMMIT} className='hover:underline' onClick={scrollToTop}>
                Cam kết của Yummy
              </Link>
            </div>
          </div>
          <div>
            <p className='text-2xl md:text-[20px] font-bold'>Chính sách</p>
            <div className='md:text-sm flex flex-col mt-5 md:mt-3 text-[#C9C9C9] gap-2.5 md:gap-[5px]'>
              <Link to={routes.OPERATINGPOLICY} className='hover:underline' onClick={scrollToTop}>
                Chính sách hoạt động
              </Link>
              <Link to={routes.PRIVACYPOLICY} className='hover:underline' onClick={scrollToTop}>
                Chính sách bảo mật thông tin
              </Link>
            </div>
          </div>
          <div>
            <p className='text-2xl md:text-[20px] font-bold'>Hướng dẫn</p>
            <div className='md:text-sm flex flex-col mt-5 md:mt-3 text-[#C9C9C9] gap-2.5 md:gap-[5px]'>
              <Link to={routes.ORDERINSTRUCTIONS} className='hover:underline' onClick={scrollToTop}>
                Hướng dẫn đặt món
              </Link>
              <Link
                to={routes.CONTACTINSTRUCTIONS}
                className='hover:underline'
                onClick={scrollToTop}
              >
                Hướng dẫn liên hệ
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-white mx-auto w-[80%] md:w-full my-10 md:my-12'></div>

      <div className='pl-10 flex flex-col gap-2 max-w-[470px] text-white'>
        <div className='flex gap-4 items-center'>
          <ApartmentIcon />
          <p className='text-[28px] font-semibold'>CÔNG TY CỔ PHẦN YUMMY</p>
        </div>
        <div className='flex gap-4 items-center'>
          <FmdGoodIcon />
          <p className='text-sm'>
            Số 16, đường Hoàng Diệu 2, phường Linh Trung, TP.Thủ Đức, TP. Hồ Chí Minh
          </p>
        </div>
        {/* <div className='flex gap-4 items-center'>
          <VerifiedIcon />
          <p className='text-sm'>
            Giấy CN DKDN số: 8386365078 do Sở Kế hoạch và Đầu tư TP.HCM cấp 12/10/2024
          </p>
        </div> */}
        <div className='flex gap-4 items-center'>
          <EmailIcon />
          <p className='text-sm'>Email: yummy2024@gmail.com</p>
        </div>
        <div className='flex gap-4 items-center'>
          <LocalPhoneIcon />
          <p className='text-sm'>SDT: 0338963327</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
