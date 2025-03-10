const Footer = () => {
  return (
    <div className='flex justify-between py-6 items-center md:px-[50px] bg-orange-500 h-[100px] text-white px-4 gap-2 md:flex-row flex-col'>
      <h1 className='md:text-3xl text-xl cursor-pointer font-bold'>JoiChannels.com</h1>
      <ul className='flex justify-center items-center gap-3 cursor-pointer '>
        <li>Privacy Policy</li>
        <li>Terms of Service</li>
      </ul>
    </div>
  )
}

export default Footer
