import * as React from 'react'

export default function ContactInstructions() {
  return (
    <div className='py-20 flex justify-center items-center'>
      <div>
        <div className='text-[60px] font-bold text-primary uppercase text-center '>
          HƯỚNG DẪN LIÊN HỆ
        </div>
        <div className='max-w-[1150px] mt-10'>
          <div className=' list-disc text-[20px] pl-5 font-light'>
            Chúng tôi luôn sẵn sàng hỗ trợ quý khách hàng mọi lúc, mọi nơi. Nếu quý khách cần liên
            hệ với Yummy về các vấn đề liên quan đến đơn hàng, dịch vụ hoặc bất kỳ thắc mắc nào
            khác, vui lòng tham khảo các phương thức dưới đây:
          </div>
          <div>
            <ol className='list-decimal pl-5'>
              <li className='mt-5 text-[20px] font-bold'>
                Liên hệ qua tổng đài hỗ trợ
                <ul className=' list-disc pl-5 font-light'>
                  <li>Số điện thoại: 0338963327</li>
                  <li>Phí gọi: Miễn phí</li>
                  <li>
                    Hỗ trợ: Tư vấn đặt hàng, theo dõi tình trạng đơn hàng, hỗ trợ khiếu nại và giải
                    quyết các vấn đề phát sinh.
                  </li>
                </ul>
              </li>
              <li className='mt-5 text-[20px] font-bold'>
                Liên hệ qua email
                <ul className=' list-disc pl-5 font-light'>
                  <li>Email hỗ trợ khách hàng: yummy2024@gmail.com</li>
                  <li>Thời gian phản hồi: Từ 1-2 ngày làm việc</li>
                  <li>
                    Nội dung cần cung cấp: Để chúng tôi hỗ trợ nhanh nhất, quý khách vui lòng cung
                    cấp các thông tin sau khi gửi email: Họ tên, số điện thoại liên hệ, mã đơn hàng,
                    và vấn đề cần hỗ trợ chi tiết.
                  </li>
                </ul>
              </li>
              <li className='mt-5 text-[20px] font-bold'>
                Quy trình xử lý khiếu nại
                <ul className=' list-disc pl-5 font-light'>
                  <li>
                    Bước 1: Quý khách liên hệ với Yummy qua tổng đài, email, và cung cấp chi tiết về
                    khiếu nại.
                  </li>
                  <li>Bước 2: Đội ngũ hỗ trợ của Yummy sẽ tiếp nhận và xác minh thông tin.</li>
                  <li>
                    Bước 3: Chúng tôi sẽ phản hồi và đưa ra phương án giải quyết trong vòng 24 - 48
                    giờ.
                  </li>
                  <li>
                    Bước 4: Nếu khiếu nại được giải quyết, chúng tôi sẽ cập nhật kết quả và phản hồi
                    đến quý khách qua phương thức liên hệ đã cung cấp.
                  </li>
                </ul>
              </li>
            </ol>
            <div className='mt-10 text-[25px] font-bold text-center'>
              Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của{' '}
              <strong className='text-secondary text-[30px]'>Yummy</strong>. Đội ngũ hỗ trợ của
              chúng tôi luôn ở đây để lắng nghe và đồng hành cùng quý khách trong mọi trải nghiệm
              đặt món ăn trên <strong className='text-secondary text-[30px]'>Yummy</strong>!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
