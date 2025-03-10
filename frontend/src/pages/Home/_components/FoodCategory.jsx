import juice from '~/assets/images/home/juice_category.jpg'
import fastfood from '~/assets/images/home/fastfood_category.jpg'
import eu from '~/assets/images/home/eu_category.jpg'
import vegan from '~/assets/images/home/vegan_category.jpg'
import pho from '~/assets/images/home/pho_category.jpg'
import snack from '~/assets/images/home/snack_category.jpg'
import milktea from '~/assets/images/home/milktea_category.jpg'
import categoryImg from '~/assets/images/home/category.jpg'
import { routes } from '~/configs'
import { Link } from 'react-router-dom'

const FoodCategory = () => {
  const getLinkWithCategory = (category) => {
    return `${routes.MENU}?categories=${category}`
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8 mx-auto max-w-[1200px] w-fit'>
      {/* Đồ uống */}
      <Link to={getLinkWithCategory('Đồ+uống')} className='w-fit'>
        <div
          className='relative rounded-lg h-[180px] w-[150px] sm:h-[220px] sm:w-[180px] md:h-[260px] md:w-[220px] lg:h-[300px] lg:w-[250px] py-3 px-5 flex flex-col md:hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group shadow-md'
          style={{
            backgroundImage: `url(${juice})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            clipPath: 'inset(5px 0 0 0 round 15% 0)',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 rounded-lg'></div>
          <div className='relative mt-auto text-center text-white'>
            <div className='text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-bold font-oswald transition-all duration-[400ms] group-hover:translate-y-[-20px]'>
              Đồ uống
            </div>
          </div>
        </div>
      </Link>

      {/* Thức ăn nhanh */}
      <Link to={getLinkWithCategory('Thức+ăn+nhanh')} className='w-fit'>
        <div
          className='relative rounded-lg h-[180px] w-[150px] sm:h-[220px] sm:w-[180px] md:h-[260px] md:w-[220px] lg:h-[300px] lg:w-[250px] py-3 px-5 flex flex-col md:hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group shadow-md'
          style={{
            backgroundImage: `url(${fastfood})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            clipPath: 'inset(5px 0 0 0 round 15% 0)',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 rounded-lg'></div>
          <div className='relative mt-auto text-center text-white'>
            <div className='text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-bold font-oswald transition-all duration-[400ms] group-hover:translate-y-[-20px]'>
              Thức ăn nhanh
            </div>
          </div>
        </div>
      </Link>

      {/* Món Á */}
      <Link to={getLinkWithCategory('Món+Á')} className='w-fit'>
        <div
          className='relative rounded-lg h-[180px] w-[150px] sm:h-[220px] sm:w-[180px] md:h-[260px] md:w-[220px] lg:h-[300px] lg:w-[250px] py-3 px-5 flex flex-col md:hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group shadow-md'
          style={{
            backgroundImage: `url(${eu})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            clipPath: 'inset(5px 0 0 0 round 15% 0)',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 rounded-lg'></div>
          <div className='relative mt-auto text-center text-white'>
            <div className='text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-bold font-oswald transition-all duration-[400ms] group-hover:translate-y-[-20px]'>
              Món Á
            </div>
          </div>
        </div>
      </Link>

      {/* Cơm */}
      <Link to={getLinkWithCategory('Cơm')} className='w-fit'>
        <div
          className='relative rounded-lg h-[180px] w-[150px] sm:h-[220px] sm:w-[180px] md:h-[260px] md:w-[220px] lg:h-[300px] lg:w-[250px] py-3 px-5 flex flex-col md:hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group shadow-md'
          style={{
            backgroundImage: `url(${categoryImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            clipPath: 'inset(5px 0 0 0 round 15% 0)',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 rounded-lg'></div>
          <div className='relative mt-auto text-center text-white'>
            <div className='text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-bold font-oswald transition-all duration-[400ms] group-hover:translate-y-[-20px]'>
              Cơm
            </div>
          </div>
        </div>
      </Link>

      {/* Trà sữa */}
      <Link to={getLinkWithCategory('Trà+sữa')} className='w-fit'>
        <div
          className='relative rounded-lg h-[180px] w-[150px] sm:h-[220px] sm:w-[180px] md:h-[260px] md:w-[220px] lg:h-[300px] lg:w-[250px] py-3 px-5 flex flex-col md:hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group shadow-md'
          style={{
            backgroundImage: `url(${milktea})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            clipPath: 'inset(5px 0 0 0 round 15% 0)',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 rounded-lg'></div>
          <div className='relative mt-auto text-center text-white'>
            <div className='text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-bold font-oswald transition-all duration-[400ms] group-hover:translate-y-[-20px]'>
              Trà sữa
            </div>
          </div>
        </div>
      </Link>

      {/* Món chay */}
      <Link to={getLinkWithCategory('Món+chay')} className='w-fit'>
        <div
          className='relative rounded-lg h-[180px] w-[150px] sm:h-[220px] sm:w-[180px] md:h-[260px] md:w-[220px] lg:h-[300px] lg:w-[250px] py-3 px-5 flex flex-col md:hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group shadow-md'
          style={{
            backgroundImage: `url(${vegan})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            clipPath: 'inset(5px 0 0 0 round 15% 0)',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 rounded-lg'></div>
          <div className='relative mt-auto text-center text-white'>
            <div className='text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-bold font-oswald transition-all duration-[400ms] group-hover:translate-y-[-20px]'>
              Món chay
            </div>
          </div>
        </div>
      </Link>

      {/* Bún phở */}
      <Link to={getLinkWithCategory('Bún+phở')} className='w-fit'>
        <div
          className='relative rounded-lg h-[180px] w-[150px] sm:h-[220px] sm:w-[180px] md:h-[260px] md:w-[220px] lg:h-[300px] lg:w-[250px] py-3 px-5 flex flex-col md:hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group shadow-md'
          style={{
            backgroundImage: `url(${pho})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            clipPath: 'inset(5px 0 0 0 round 15% 0)',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 rounded-lg'></div>
          <div className='relative mt-auto text-center text-white'>
            <div className='text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-bold font-oswald transition-all duration-[400ms] group-hover:translate-y-[-20px]'>
              Bún phở
            </div>
          </div>
        </div>
      </Link>

      {/* Đồ ăn vặt */}
      <Link to={getLinkWithCategory('Đồ+ăn+vặt')} className='w-fit'>
        <div
          className='relative rounded-lg h-[180px] w-[150px] sm:h-[220px] sm:w-[180px] md:h-[260px] md:w-[220px] lg:h-[300px] lg:w-[250px] py-3 px-5 flex flex-col md:hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group shadow-md'
          style={{
            backgroundImage: `url(${snack})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            clipPath: 'inset(5px 0 0 0 round 15% 0)',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 rounded-lg'></div>
          <div className='relative mt-auto text-center text-white'>
            <div className='text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-bold font-oswald transition-all duration-[400ms] group-hover:translate-y-[-20px]'>
              Đồ ăn vặt
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default FoodCategory
