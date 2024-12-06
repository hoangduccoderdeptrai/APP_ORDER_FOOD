import * as React from 'react'
import Image_value from '~/assets/images/aboutUs/about_us_ourvalue.png'
import Background from '~/assets/images/aboutUs/background_about_us.png'
import vector from '~/assets/images/aboutUs/about_us_line.png'

const AboutUs = () => {
  // Biến Style cho Heading
  const styleTextHeading = 'sm:text-[28px] md:text-[36px] lg:text-[48px] xl:text-[60px]'
  // Biến Style cho các description
  const styleTextDesc = 'sm:text-[12px] md:text-[16px] lg:text-[18px] xl:text-[25px]'
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
  // Mảng các thẻ cho Member
  const MemberList = [
    { img: '../src/assets/images/aboutUs/about_us_member2.png', name: 'Pham Duy' },
    { img: '../src/assets/images/aboutUs/about_us_member2.png', name: 'Nguyen Ba' },
    { img: '../src/assets/images/aboutUs/about_us_member3.png', name: 'Quang Dang' },
    { img: '../src/assets/images/aboutUs/about_us_member2.png', name: 'Hoang Duc' },
    { img: '../src/assets/images/aboutUs/about_us_member5.png', name: 'Le Khoi' },
  ]
  return (
    <div className='w-full' style={{ minWidth: '786px' }}>
      {/*====================================== Giới thiệu về Yummy ======================================*/}
      <div className='flex justify-center w-full items-center mt-[30px]'>
        <div className='flex items-center w-[96%] p-[97px] bg-secondary rounded-[20px]'>
          <img
            src='../src/assets/images/aboutUs/about_us_intro.png'
            alt='Image about_us_intro'
            className='max-w-[41.5%] h-auto'
          />
          <div className='flex justify-center p-[50px] bg-accent rounded-[20px] lg:absolute lg:left-[445px] lg:right-[90px]'>
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

      <div
        className='min-w-screen '
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/*====================================== Những con người tạo nên Yummy ======================================*/}
        <div className='py-[70px] px-[70px]'>
          <div
            className={`text-primary uppercase text-center font-bold w-[200px] sm:w-[400px] lg:w-[600px] text-[20px] ${styleTextHeading}`}
          >
            Những con người tạo nên Yummy
          </div>
          {/* Map thẻ gồm ảnh và tên của từng member */}
          <div className='relative w-full'>
            {MemberList.map((member, index) => {
              const memberPosition = [
                'mt-[12vh] ml-[4.1vw]',
                'ml-[26vw] mt-[10vw]',
                'ml-[45vw] mt-[-3vw]',
                'ml-[61vw] mt-[15vw]',
                'ml-[70vw] mt-[-10vw]',
              ][index]
              return (
                <div
                  key={index}
                  className={`absolute flex justify-center w-[15.6%] h-[17vw] py-[20px] px-[10px] ${memberPosition}`}
                  style={{
                    backgroundImage: `url(${member.img})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div
                    style={{ textShadow: '2px 2px 0 #000' }}
                    className={`text-accent font-bold text-center mt-auto leading-[30px] ${styleTextDesc}`}
                  >
                    {member.name}
                  </div>
                </div>
              )
            })}
          </div>
          <div className={`font-medium italic w-[55vw] mt-[30vw] ${styleTextDesc}`}>
            “Chúng tôi - những con người cùng với những ngọn lửa đam mê cháy bỏng dành cho công
            nghệ, đang không ngừng nỗ lực trau dồi và hoàn thiện bản thân hơn để mang đến những sản
            phẩm vượt trội và tạo ra những trải nghiệm tuyệt vời nhất cho mọi người.”
          </div>
        </div>

        {/*====================================== Sứ mệnh của chúng tôi ======================================*/}
        <div className=' mt-[4vw]'>
          <div className='relative'>
            <div
              dir='rtl'
              className={`inline bg-primary p-[2vw] rounded-s-[20px] text-accent uppercase font-bold ${styleTextHeading} pl-[100px]`}
            >
              Sứ mệnh của chúng tôi
            </div>
            <img
              src={vector}
              alt=''
              className='w-[64vw] h-auto absolute top-2 sm:top-4 lg:top-10'
            />
          </div>
          <div className='px-[70px] pb-[70px] flex gap-[30px] justify-between w-full mt-[4vw] items-center'>
            <div className=' items-center justify-between w-[800px]'>
              <p className={`text-center font-medium ${styleTextDesc}`}>
                <strong className='font-bold text-[40px] text-secondary'>Yummy</strong> cam kết mang
                đến cho khách hàng trải nghiệm ẩm thực đa dạng và tiện lợi thông qua nền tảng đặt
                món ăn trực tuyến hiện đại.
              </p>
              <p className={`mt-[20px] text-center font-medium ${styleTextDesc} xl:text-[-5px]`}>
                Chúng tôi kết nối những nhà hàng hàng đầu với thực khách, đảm bảo mỗi bữa ăn đều
                tươi ngon, an toàn và được giao tận nơi một cách nhanh chóng. Với Yummy, việc thưởng
                thức ẩm thực trở nên dễ dàng, chỉ cần vài cú click là bạn đã có ngay bữa ăn yêu
                thích tại nhà.
              </p>
            </div>
            <img
              src='../src/assets/images/aboutUs/about_us_mission.png'
              alt='about_us_mission'
              className='w-[30vw] h-auto'
            />
          </div>
        </div>
      </div>

      {/*====================================== Giá trị Yummy mang lại ======================================*/}
      <div
        className='flex flex-col items-center min-w-screen h-auto py-[4.1vw] px-[5vw]'
        style={{
          backgroundImage: `url(${Image_value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={`mb-[3vw] text-accent uppercase font-bold text-center ${styleTextHeading}`}>
          Giá trị Yummy mang lại
        </div>
        {/* Map các thẻ giá trị mà Yummy mang lại */}
        <div className='flex flex-wrap justify-center gap-[2vw] '>
          {Items.map((item, index) => (
            <div
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
