import * as React from 'react'

const OurCommit = () => {
  return (
    <div className='py-20 flex justify-center items-center'>
      <div>
        <div className='text-[60px] font-bold text-primary uppercase text-center '>
          CAM KẾT CỦA YUMMY
        </div>
        <div className='mb-10 text-primary font-medium text-[25px] text-center'>
          Chọn Yummy - Chọn Trải Nghiệm Tốt Nhất
        </div>
        <div className='max-w-[1150px]'>
          <div className='text-[20px] font-light'>
            Tại Yummy, chúng tôi hiểu rằng việc đặt món ăn trực tuyến không chỉ dừng lại ở việc cung
            cấp bữa ăn ngon, mà còn phải đảm bảo chất lượng, tốc độ và sự hài lòng tối đa cho khách
            hàng. Dưới đây là những cam kết mà chúng tôi đặt ra để mang lại trải nghiệm tốt nhất cho
            bạn:
          </div>
          <div>
            <ol className='list-decimal pl-5'>
              <li className='mt-5 text-[20px] font-bold'>
                Chất Lượng Món Ăn
                <div className='font-light'>
                  Mỗi món ăn được cung cấp qua Yummy đều được chọn lựa từ các nhà hàng và quán ăn có
                  uy tín tại Thành phố Hồ Chí Minh. Chúng tôi luôn đảm bảo:
                </div>
                <ul className='list-disc pl-10'>
                  <li className='font-light'>
                    Nguyên liệu tươi ngon và an toàn vệ sinh thực phẩm.
                  </li>
                  <li className='font-light'>
                    Món ăn được chế biến và đóng gói cẩn thận, đảm bảo giữ nguyên hương vị khi đến
                    tay khách hàng.
                  </li>
                  <li className=' font-light'>
                    Đa dạng các món ăn từ nhiều nhà hàng, quán ăn nổi tiếng trong thành phố.
                  </li>
                </ul>
              </li>
              <li className='mt-5 text-[20px] font-bold'>
                Giá cả hợp lý
                <div className=' font-light'>
                  Chúng tôi luôn cố gắng mang đến mức giá cạnh tranh nhất cho khách hàng, với nhiều
                  ưu đãi hấp dẫn:
                </div>
                <ul className='list-disc pl-10'>
                  <li className='font-light'>
                    Cam kết không có phí ẩn, minh bạch giá cả từ nhà hàng đến phí giao hàng.
                  </li>
                  <li className='font-light'>
                    Chương trình khuyến mãi, mã giảm giá liên tục cho khách hàng thân thiết.
                  </li>
                  <li className='font-light'>
                    Chính sách giá ưu đãi đặc biệt cho các nhóm đặt món lớn hoặc đặt trước.
                  </li>
                </ul>
              </li>
              <li className='mt-5 text-[20px] font-bold'>
                Thời Gian Giao Hàng Nhanh Chóng
                <div className='font-light'>
                  Chúng tôi hiểu rằng thời gian là yếu tố quan trọng khi đặt món trực tuyến. Do đó,
                  Yummy cam kết:
                </div>
                <ul className='list-disc pl-10'>
                  <li className=' font-light'>Giao hàng nhanh chóng.</li>
                  <li className=' font-light'>
                    Hợp tác với các đối tác giao hàng chuyên nghiệp, đảm bảo món ăn đến tay bạn đúng
                    giờ.
                  </li>
                </ul>
              </li>
            </ol>
            <div className='text-center mt-10 text-[25px] font-bold'>
              Với tất cả những cam kết trên, chúng tôi hy vọng{' '}
              <strong className='text-secondary text-[30px]'>Yummy</strong> sẽ trở thành người bạn
              đồng hành đáng tin cậy, giúp bạn dễ dàng thưởng thức những bữa ăn ngon, chất lượng mà
              không cần rời khỏi nhà.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurCommit
