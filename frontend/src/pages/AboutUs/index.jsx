import * as React from 'react'
import Image_value from '~/assets/images/aboutUs/about_us_ourvalue.png'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const AboutUs = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 50,
      easing: 'ease-in-out',
      mirror: true,
    })
  }, [])

  // Biến Style cho Heading
  const styleTextHeading = 'text-[28px] md:text-[36px] lg:text-[48px] xl:text-[50px]'
  // Biến Style cho các description
  const styleTextDesc = 'text-[12px] md:text-[16px] lg:text-[18px] xl:text-[25px]'
  // Mảng các thẻ item của Giá trị mà Yummy mang lại
  const Items = [
    {
      icon: '../src/assets/icons/aboutUs/Protect.svg',
      title: 'An toàn và chất lượng',
      desc: 'Đảm bảo món ăn được giao đúng yêu cầu, an toàn a sinh thực phẩm',
    },
    {
      icon: '../src/assets/icons/aboutUs/Clock.svg',
      title: 'Tiện lợi và nhanh chóng',
      desc: 'Tiết kiệm thời gian cho khách hàng với vài thao tác đơn giản',
    },
    {
      icon: '../src/assets/icons/aboutUs/Voucher.svg',
      title: 'Ưu đãi hấp dẫn',
      desc: 'Yummy cung cấp các chương trình khuyến mãi thường xuyên cho khách hàng thân thiết và mới.',
    },
  ]
  return (
    <div className='w-full' style={{ minWidth: '410px' }}>
      {/*====================================== Giới thiệu về Yummy ======================================*/}
      <div className='flex justify-center w-full items-center mt-[100px]' data-aos='fade-up'>
        <div className='flex items-center w-[96%] p-[30px] md:p-[50px] bg-secondary rounded-[20px]'>
          <img
            src='../src/assets/images/aboutUs/about_us_intro.png'
            alt='Image about_us_intro'
            className='max-w-[41.5%] h-auto max-sm:hidden'
          />
          <div
            className='flex justify-center p-[30px] bg-accent rounded-[20px] lg:absolute lg:left-[445px] lg:right-[90px]'
            data-aos='zoom-in'
          >
            <div className='w-[94.5%]'>
              <div
                className={`text-primary font-bold text-center uppercase ${styleTextHeading} mt-[18px]`}
              >
                Giới thiệu về Yummy
              </div>
              <div className='mt-[30px] text-center'>
                <p className={`${styleTextDesc}`}>
                  Được xây dựng từ giữa năm 2024 của{' '}
                  <strong className='font-bold'>
                    một nhóm sinh viên tại Trường Đại học Công nghệ thông tin - ĐHQG TPHCM
                  </strong>
                </p>
                <p className={`${styleTextDesc}`}>
                  <strong className='font-bold text-[40px] text-secondary'>Yummy</strong> là cộng
                  đồng tin cậy cho mọi người có thể tìm kiếm, đánh giá và đặt món ăn từ các địa điểm
                  ăn uống: nhà hàng, quán ăn,..... tại thành phố Hồ Chí Minh. Từ đó kết nối những
                  thực khách đến với các địa điểm ăn uống lớn nhỏ cả đất nước.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*====================================== Những con người tạo nên Yummy ======================================*/}
      <div className=' mt-[70px] px-[20px] sm:px-[40px] lg:px-[70px]'>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-6'>
          <div
            className={`text-primary uppercase font-bold text-center lg:text-left w-full lg:w-[600px] ${styleTextHeading}`}
            data-aos='fade-right'
          >
            Những con người tạo nên Yummy
          </div>
          <div
            className={`font-medium italic text-center lg:text-left w-full lg:w-[55vw] ${styleTextDesc}`}
            data-aos='fade-left'
          >
            “Chúng tôi - những con người cùng với những ngọn lửa đam mê cháy bỏng dành cho công
            nghệ, đang không ngừng nỗ lực trau dồi và hoàn thiện bản thân hơn để mang đến những sản
            phẩm vượt trội và tạo ra những trải nghiệm tuyệt vời nhất cho mọi người.”
          </div>
        </div>
        <div className='relative group'>
          <img
            src='../src/assets/images/aboutUs/group_img.png'
            alt='Ảnh nhóm chúng tôi'
            className='h-[320px] sm:h-[480px] lg:h-[640px] w-full object-cover mt-10'
            data-aos='zoom-in'
          />
          <div className='absolute inset-0 flex justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000'>
            <div
              className={`transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out mt-[100px] sm:mt-[200px] lg:mt-[300px] p-[70px]`}
            >
              <p className={`${styleTextDesc} text-center`}>
                Nhóm chúng tôi gồm 5 thành viên đến từ lớp CNTT2022.1:
              </p>
              <div className='grid grid-cols-2 ml-[50px]'>
                <div className={`${styleTextDesc} font-light`}>1. Nguyễn Quang Đăng</div>
                <div className={`${styleTextDesc} font-light`}>MSSV: 22520191</div>
                <div className={`${styleTextDesc} font-light`}>2. Nguyễn Công Bá</div>
                <div className={`${styleTextDesc} font-light`}>MSSV: 22520087</div>
                <div className={`${styleTextDesc} font-light`}>3. Phạm Văn Duy</div>
                <div className={`${styleTextDesc} font-light`}>MSSV: 22520341</div>
                <div className={`${styleTextDesc} font-light`}>4. Lê Hoàng Đức</div>
                <div className={`${styleTextDesc} font-light`}>MSSV: 22520351</div>
                <div className={`${styleTextDesc} font-light`}>5. Lê Minh Khôi</div>
                <div className={`${styleTextDesc} font-light`}>MSSV: 22520698</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*====================================== Sứ mệnh của chúng tôi ======================================*/}
      <div className=' p-[20px] lg:p-[70px] flex relative flex-col lg:flex-row justify-center'>
        <div
          className='relative md:mr-[120px] flex justify-center flex-shrink-0'
          data-aos='fade-down-right'
        >
          <img
            src='../src/assets/images/aboutUs/about_us_mission.png'
            alt=''
            className=' w-full  xl:w-[550px] xl:h-[420px] lg:h-[340px]  rounded-[20px]'
          />
          <img
            src='../src/assets/images/aboutUs/about_us_mission1.png'
            alt=''
            className='absolute xl:top-[150px] lg:left-[180px] lg:top-[100px] xl:left-[290px] lg:w-[300px] xl:w-[350px] rounded-[20px] max-lg:hidden'
          />
        </div>
        <div className='flex flex-col items-center max-lg:mt-5 ' data-aos='fade-up-left'>
          <div
            className={`text-primary uppercase font-bold  w-full ${styleTextHeading} max-lg:text-center`}
          >
            Yummy - Kết nối vị ngon, trọn từng bữa ăn!
          </div>
          <div className={`font-light ${styleTextDesc} mt-[30px] max-lg:text-center`}>
            Yummy cam kết mang đến cho khách hàng trải nghiệm ẩm thực đa dạng và tiện lợi thông qua
            nền tảng đặt món ăn trực tuyến hiện đại. <br />
            Chúng tôi kết nối những nhà hàng hàng đầu với thực khách, đảm bảo mỗi bữa ăn đều tươi
            ngon, an toàn và được giao tận nơi một cách nhanh chóng. Với Yummy, việc thưởng thức ẩm
            thực trở nên dễ dàng, chỉ cần vài cú click là bạn đã có ngay bữa ăn yêu thích tại nhà.
          </div>
          <button
            className='px-[30px] py-[15px] bg-primary rounded-[100px] text-accent text-[11px] md:text-[15px] xl:text-[20px] transition-all duration-300 hover:bg-accent hover:text-primary hover:shadow-lg mt-[20px]'
            onClick={'routes.OURCOMMIT'}
          >
            Cam kết của Yummy
          </button>
        </div>
      </div>

      {/*====================================== Giá trị Yummy mang lại ======================================*/}
      <div
        className='flex flex-col items-center min-w-screen min-h-[700px] py-[4.1vw] px-[5vw]'
        style={{
          backgroundImage: `url(${Image_value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={`mb-[3vw] text-accent uppercase font-bold text-center ${styleTextHeading}`}>
          Giá trị Yummy mang lại
        </div>
        <div className='flex flex-wrap justify-center gap-[5vw] '>
          {Items.map((item, index) => (
            <div
              data-aos='fade-up'
              data-aos-anchor-placement='top-bottom'
              data-aos-delay={index * 200}
              key={index}
              className='relative w-[90%] sm:w-[293px] h-auto p-[3vw] mt-[2vw] bg-accent bg-opacity-70 rounded-[20px]'
            >
              <img
                src={item.icon}
                alt='Icon item'
                className='absolute top-[-3.125vw] left-1/2 transform -translate-x-1/2 w-[6.25vw]'
              />
              <div className={`mt-[12px] text-center font-bold ${styleTextDesc}`}>{item.title}</div>
              <p className='mt-[40px] text-center font-light sm:text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px]'>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutUs
