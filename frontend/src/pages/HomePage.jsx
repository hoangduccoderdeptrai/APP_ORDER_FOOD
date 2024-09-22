import landing from '../assets/landing.png'
import appDownload from '../assets/appDownload.png'
const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
        <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 ">
            <h1 className=" text-3xl lg:text-5xl text-orange-500 font-semibold tracking-tight">Tuck into takeway today</h1>
            <span className="text-xl">Food is just a click away</span>
        </div>
        <div className='grid md:grid-cols-2 justify-center items-center gap-8'>
          <img src={landing}/>
          <div className='text-center flex flex-col justify-center gap-4'>
            <span className='text-3xl font-bold tracking-tighter'>Order takeaway event faster</span>
            <p>Download the MernEats App for faster ordering and personalished recommendations</p>
            <img src={appDownload}/>
          </div>
        </div>

    </div>
  )
}

export default HomePage
