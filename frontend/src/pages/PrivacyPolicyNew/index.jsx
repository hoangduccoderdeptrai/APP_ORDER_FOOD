import * as React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className='py-20 flex justify-center items-center'>
      <div>
        <div className='text-[60px] font-bold text-primary uppercase text-center '>
          CHÍNH SÁCH BẢO MẬT THÔNG TIN
        </div>
        <div className='mb-10 text-primary font-light text-[25px] text-center'>
          Ngày có hiệu lực: ngày 01 tháng 10 năm 2024
        </div>
        <div className='max-w-[1150px]'>
          <ol className='list-decimal pl-5'>
            <li className='mt-5 text-[20px] font-bold'>
              Mục đích thu thập thông tin cá nhân
              <ul className=' list-disc pl-5 font-light'>
                <li>
                  Thông tin cá nhân mà chúng tôi thu thập giúp Yummy cung cấp dịch vụ tốt nhất và
                  phù hợp nhất với nhu cầu của bạn, bao gồm việc đặt hàng, giao hàng, và liên hệ hỗ
                  trợ.
                </li>
                <li>
                  Các thông tin như tên, số điện thoại, địa chỉ giao hàng và địa chỉ email sẽ được
                  sử dụng để hoàn tất các đơn hàng và thông báo về tình trạng đơn hàng.
                </li>
              </ul>
            </li>
            <li className='mt-5 text-[20px] font-bold'>
              Phạm vi sử dụng thông tin
              <ul className=' list-disc pl-5 font-light'>
                <li>
                  Thông tin của bạn chỉ được sử dụng trong nội bộ Yummy nhằm nâng cao chất lượng
                  dịch vụ
                </li>
                <li>
                  Yummy có thể chia sẻ thông tin cá nhân của bạn với đối tác giao hàng để đảm bảo
                  đơn hàng của bạn được giao đúng thời gian và địa chỉ.
                </li>
                <li>
                  Ngoài các mục đích trên, chúng tôi sẽ không cung cấp thông tin cá nhân của bạn cho
                  bên thứ ba mà không có sự đồng ý của bạn, ngoại trừ trường hợp yêu cầu từ cơ quan
                  có thẩm quyền.
                </li>
              </ul>
            </li>
            <li className='mt-5 text-[20px] font-bold'>
              Thời gian lưu trữ thông tin
              <ul className=' list-disc pl-5 font-light'>
                <li>
                  Thông tin của bạn sẽ được lưu trữ trong hệ thống của Yummy trong suốt thời gian
                  bạn sử dụng dịch vụ và sẽ được xóa khi bạn ngừng sử dụng dịch vụ, trừ khi luật
                  pháp yêu cầu lưu trữ lâu hơn.
                </li>
              </ul>
            </li>
            <li className='mt-5 text-[20px] font-bold'>
              Cam kết bảo mật thông tin
              <ul className=' list-disc pl-5 font-light'>
                <li>
                  Yummy áp dụng các biện pháp bảo mật tiên tiến để bảo vệ thông tin cá nhân của bạn
                  khỏi truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy.
                </li>
                <li>
                  Chúng tôi cam kết thực hiện các biện pháp an ninh kỹ thuật và tổ chức để bảo vệ
                  thông tin cá nhân của bạn.
                </li>
              </ul>
            </li>
            <li className='mt-5 text-[20px] font-bold'>
              Quyền của khách hàng đối với thông tin cá nhân
              <ul className=' list-disc pl-5 font-light'>
                <li>
                  Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bằng
                  cách liên hệ với Yummy qua email hoặc số điện thoại hỗ trợ.
                </li>
                <li>
                  Khách hàng cũng có thể từ chối nhận các thông tin khuyến mại hoặc yêu cầu ngừng
                  chia sẻ thông tin với các bên liên quan.
                </li>
              </ul>
            </li>
            <li className='mt-5 text-[20px] font-bold'>
              Thay đổi chính sách
              <ul className=' list-disc pl-5 font-light'>
                <li>
                  Yummy có quyền thay đổi chính sách bảo mật vào bất kỳ thời điểm nào. Mọi thay đổi
                  sẽ được cập nhật trên trang web và thông báo đến bạn. Chính sách bảo mật mới sẽ có
                  hiệu lực ngay khi được đăng tải trên trang web.
                </li>
              </ul>
            </li>
          </ol>
          <div className='mt-10 text-[25px] font-bold text-center'>
            Chúng tôi hy vọng rằng với các cam kết này, bạn có thể yên tâm khi sử dụng dịch vụ của
            <strong className='text-secondary text-[30px]'>Yummy</strong>.
          </div>
        </div>
      </div>
    </div>
  )
}
