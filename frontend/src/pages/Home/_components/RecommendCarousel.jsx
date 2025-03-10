import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import RestaurantCard from '~/components/ui/RestaurantCard'

// Custom Previous Arrow
const PrevArrow = (props) => {
  const { className, onClick, style } = props
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        left: '-45px', // Giảm khoảng cách từ nút prev đến item carousel
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ màu đen
        borderRadius: '50%', // Viền tròn
        padding: '20px', // Khoảng cách bên trong để nút tròn lớn hơn
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ArrowBackIos style={{ color: 'white', fontSize: '30px' }} />
    </div>
  )
}

// Custom Next Arrow
const NextArrow = (props) => {
  const { className, onClick, style } = props
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        right: '-45px', // Giảm khoảng cách từ nút next đến item carousel
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ màu đen
        borderRadius: '50%', // Viền tròn
        padding: '20px', // Khoảng cách bên trong để nút tròn lớn hơn
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ArrowForwardIos style={{ color: 'white', fontSize: '30px' }} />
    </div>
  )
}

const RecommendCarousel = ({ restaurants }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />, // Custom Next Arrow
    prevArrow: <PrevArrow />, // Custom Previous Arrow
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: '50px',
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          centerMode: true,
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: '20px',
        },
      },
    ],
  }

  return (
    <div className='mx-auto max-w-[1190px] relative'>
      <Slider {...settings}>
        {restaurants.map((restaurant, index) => (
          <div className='px-2' key={index}>
            <RestaurantCard
              image={restaurant.imageUrl[0].url}
              rating={restaurant.starMedium}
              restaurant={restaurant.name}
              address={`${restaurant.address.street} ${restaurant.address.borough} ${restaurant.address.city}`}
              id={restaurant._id}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default RecommendCarousel
