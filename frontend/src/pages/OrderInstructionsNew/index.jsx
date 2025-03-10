import * as React from 'react'

export default function OrderInstructions() {
  return (
    <div className='py-20 flex justify-center items-center'>
      <div>
        <div className='text-[60px] font-bold text-primary uppercase text-center'>
          HƯỚNG DẪN ĐẶT MÓN
        </div>
        <div className='max-w-[1150px] mt-10'>
          <div className=' list-disc text-[20px] pl-5 font-light'>
            Chào mừng bạn đến với Yummy! Chúng tôi luôn mong muốn mang lại trải nghiệm đặt món ăn
            trực tuyến nhanh chóng và tiện lợi. Dưới đây là các bước hướng dẫn chi tiết giúp bạn đặt
            món trên Yummy một cách dễ dàng:
          </div>
          <div>
            <ol className='list-decimal pl-5'>
              <li className='mt-5 text-[20px] font-bold'>
                Đăng nhập hoặc Đăng ký tài khoản
                <ul className=' list-disc pl-5 font-light'>
                  <li>Bước 1: Truy cập website Yummy</li>
                  <li>
                    Bước 2: Chọn Đăng nhập nếu bạn đã có tài khoản, hoặc Đăng ký nếu bạn là người
                    dùng mới.
                  </li>
                  <li>
                    Bước 3: Điền thông tin tài khoản bao gồm họ tên, số điện thoại, và email để hoàn
                    tất đăng ký.
                  </li>
                </ul>
                <div className='font-light'>
                  <strong> Lưu ý:</strong> Nếu bạn muốn sử dụng Yummy để đặt món ăn thì việc đăng ký
                  tài khoản là bắt buộc nếu bạn chưa có tài khoản trước đó!
                </div>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Tìm kiếm món ăn và quán ăn
                <ul className=' list-disc pl-5 font-light'>
                  <li>
                    Sử dụng thanh tìm kiếm trên trang "Trang chủ" hoặc thanh tìm kiếm trên trang
                    "Món ăn". Ở đây sẽ có 2 sự lựa chọn cho bạn là "Tìm theo quán" và "Tìm theo món
                    ăn", chỉ cần bạn lựa chọn một trong hai sự lựa chọn sẽ cho phép bạn tìm kiếm món
                    ăn hoặc quán ăn mà bạn muốn một cách nhanh chóng và dễ dàng.
                  </li>
                  <li>
                    Thêm vào đó chúng tôi còn hiển thị thêm một số mục gợi ý nằm ở trang "Trang
                    chủ", bạn có thể xem xét và lựa chọn sao cho phù hợp với nhu cầu của bản thân
                  </li>
                  <li>
                    Trong trang "Món ăn" chúng tôi còn cung cấp một bộ lọc, khách hàng có thể dùng
                    bộ lọc này để tìm kiếm quán ăn phù hợp cho mình.
                  </li>
                </ul>
                <div className='font-light'>
                  <strong> Lưu ý:</strong> Khi bạn "Tìm theo quán" hoặc "Tìm theo món ăn" chũng tôi
                  cũng sẽ chỉ hiển thị, đề xuất ra các quán ăn liên quan, phù hợp nhất với nhu cầu
                  tìm kiếm của bạn!
                </div>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Thêm món vào giỏ hàng của từng quán ăn
                <ul className=' list-disc pl-5 font-light'>
                  <li>
                    Ứng với mỗi quán ăn, bạn chỉ có thể thêm hoặc bớt món ăn vào giỏ hàng của từng
                    quán ăn đó tại trang chi tiết của từng quán.
                  </li>
                </ul>
                <div className='font-light'>
                  <strong> Lưu ý:</strong> Khi bạn thoát ra khỏi trang chi tiết của quán ăn đó thì
                  dữ liệu thêm hoặc bớt món trước đó trong quán ăn đó của bạn sẽ bị xóa và chúng tôi
                  sẽ không lưu lại!
                </div>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Hoàn tất đặt đơn hàng
                <ul className=' list-disc pl-5 font-light'>
                  <li>
                    Bạn nãy kiểm tra các thông tin trong phần "Giỏ hàng của tôi" trong trang chi
                    tiết của từng quán ăn tật kĩ!
                  </li>
                  <li>
                    Sau đó nhấn nút "Đặt món" và lúc đó đơn hàng của bạn sẽ được gửi tới trang quản
                    lý của quán ăn đó!
                  </li>
                  <li>Đợi đến khi đơn hàng của bạn được quán ăn xác nhận và bắt đầu giao hàng. </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Theo dõi đơn hàng
                <ul className=' list-disc pl-5 font-light'>
                  <li>
                    Xem trạng thái đơn hàng: Bạn có thể theo dõi trạng thái đơn hàng trực tiếp trên
                    Yummy qua mục "Lịch sử mua hàng".
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Nhận hàng và thanh toán
                <ul className=' list-disc pl-5 font-light'>
                  <li>
                    Khi đơn hàng được gủi tới nhà của bạn, hãy vui lòng thực hiện quy trình thanh
                    toán với người giao hàng!
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Đánh giá và phản hồi sau khi nhận hàng
                <ul className=' list-disc pl-5 font-light'>
                  <li>
                    Sau khi nhận món, hãy dành ít phút để đánh giá món ăn và chất lượng dịch vụ.
                    Đánh giá của bạn giúp Yummy cải thiện chất lượng dịch vụ và giúp người dùng khác
                    có trải nghiệm tốt hơn.
                  </li>
                </ul>
              </li>
            </ol>
            <div className='mt-10 text-[25px] font-bold text-center'>
              <strong className='text-secondary text-[30px]'>Yummy</strong> hy vọng hướng dẫn này
              giúp bạn dễ dàng đặt món ăn và có trải nghiệm hài lòng khi sử dụng dịch vụ. Chúc bạn
              có những bữa ăn ngon miệng và tiện lợi với{' '}
              <strong className='text-secondary text-[30px]'>Yummy</strong>!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
