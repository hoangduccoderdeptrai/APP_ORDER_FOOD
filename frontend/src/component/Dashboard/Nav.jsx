import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import UseResponsive from '../../hooks/useResponsive'

const Nav = ({isOpen,setOpen}) => {
    const lg =UseResponsive()
    // const [isOpen,setOpen] =useState((isOpen)=>{
    //   if(lg==='lg')return isOpen =true
    //   else return isOpen=false
    // })
    // useEffect(()=>{
    //   if(lg==='lg')setOpen(true)
    //   else setOpen(false)
    // },[lg])
    // const navInfor =[
    //     {name:''}
    // ]
        
    
    const [dash,setDash] =useState(false)
    const [user,setUser] =useState(true)
    const [product,setProduct] =useState(true)
    const navigate =useNavigate()
    const handleMark =(e)=>{
        e.preventDefault()
        const id =e.target.id
        if(id==1){
          setDash(false)
          setUser(true)
          setProduct(true)
          navigate("/v2/dashboard")
        }else if(id==2){
          setUser(false)
          setDash(true)
          setProduct(true)
          navigate("/v2/dashboard/users")
        }else{
          setProduct(false)
          setUser(true)
          setDash(true)
          navigate("/v2/dashboard/products")
        }
    }
   
    return (
      <>
        <div  className={`w-[280px] bg-white shadow-md fixed  top-0 ${isOpen ? "left-0":"-left-[285px]"} lg:relative  z-10 h-[100vh] transition-all  `}>
          {/* Navigation dashboard */}
          <div className='w-full flex flex-col '>
              <div className='flex items-center gap-1 rounded-md my-6 mx-5 px-5 py-4 bg-[rgba(145,158,171,0.12)] '>
                <i className='bx bx-user-circle text-3xl'></i>
                {/* {arr.id} */}
                <label className='font-medium'>your name</label>
               
              </div>
              <nav className='flex flex-col mx-5 my-6 gap-y-3'>
                  <a id="1" aria-label={dash} onClick={(e)=>handleMark(e)} className='flex items-center gap-2 px-5 py-2 round-sm hover:bg-[rgba(145,158,171,0.12)]'  >
                    <span>
                      <svg  height="2rem" width="2rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 386.651 386.651"  stroke="blue"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"  ></g><g id="SVGRepo_iconCarrier"> <g> <path d="M342.367,135.781c-2.674-1.367-5.889-1.122-8.324,0.635l-138.556,99.968l-89.233-83.725 c-3.032-2.844-7.736-2.892-10.826-0.112l-74.395,66.959c-1.685,1.518-2.648,3.679-2.648,5.946v91.451c0,4.418,3.582,8,8,8h312.339 c4.418,0,8-3.582,8-8v-174C346.724,139.899,345.041,137.149,342.367,135.781z M53.507,308.903H34.385v-79.889l19.122-17.211 V308.903z M88.045,308.903H69.507v-111.5l18.538-16.685V308.903z M122.582,308.903h-18.538V172.526l18.538,17.393V308.903z M157.12,308.903h-18.538V204.931l18.538,17.394V308.903z M192.015,308.903H173.12v-71.565l16.227,15.226 c0.791,0.741,1.702,1.288,2.667,1.65V308.903z M226.91,308.903h-18.896v-61.828l18.896-13.634V308.903z M261.806,308.903H242.91 v-87.006l18.895-13.633V308.903z M296.701,308.903h-18.896V196.72l18.896-13.634V308.903z M330.724,308.903h-18.022v-137.36 l18.022-13.003V308.903z"></path> <path d="M385.375,65.087c-1.439-2.148-3.904-3.404-6.461-3.337l-50.696,1.368c-3.471,0.094-6.429,2.547-7.161,5.941 c-0.732,3.395,0.95,6.85,4.074,8.366l11.846,5.75L196.96,183.012l-95.409-86.504c-4.738-4.296-11.955-4.322-16.723-0.062 L4.173,168.491c-5.149,4.599-5.594,12.501-0.995,17.649c4.598,5.148,12.499,5.594,17.649,0.995l72.265-64.55l94.533,85.709 c2.369,2.147,5.376,3.239,8.398,3.239c2.532,0,5.074-0.767,7.255-2.322L350.82,104.01l0.701,11.074 c0.22,3.464,2.777,6.329,6.193,6.939c0.444,0.079,0.889,0.118,1.328,0.118c2.938,0,5.662-1.724,6.885-4.483l20.077-45.327 C387.052,69.968,386.815,67.234,385.375,65.087z"></path> </g> </g></svg>
                    </span>
                    <label htmlFor='1' className='font-family opacity-80 text-xl pointer-events-none '>Dashboard</label>
                  </a>
                  <a id="2" aria-label={user} onClick={(e)=>handleMark(e)} className='flex items-center gap-2 px-5 py-2 round-sm hover:bg-[rgba(145,158,171,0.12)]'>
                    <span>
                      <svg height="2rem" width="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1C274C"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <circle cx="9" cy="9" r="2" stroke="#1C274C" ></circle> <path d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z" stroke="#1C274C" ></path> <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.298 5.64118 21.5794 6.2255 21.748 7" stroke="#1C274C" ></path> <path d="M19 12H15" stroke="#1C274C" ></path> <path d="M19 9H14" stroke="#1C274C" ></path> <path d="M19 15H16" stroke="#1C274C" ></path> </g></svg>
                    </span>
                    <label  htmlFor='2' className='font-family opacity-80 text-xl pointer-events-none '>User</label>
                  </a>
                  <a id="3" aria-label={product} onClick={(e)=>handleMark(e)} className='flex items-center gap-2 px-5 py-2 round-sm hover:bg-[rgba(145,158,171,0.12)]'>
                    <span>
                      <svg height="2rem" width="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"  ></g><g id="SVGRepo_iconCarrier"> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" stroke="#1C274C" ></path> <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" stroke="#1C274C" ></path> <path d="M2.26121 3.09184L2.50997 2.38429H2.50997L2.26121 3.09184ZM2.24876 2.29246C1.85799 2.15507 1.42984 2.36048 1.29246 2.75124C1.15507 3.14201 1.36048 3.57016 1.75124 3.70754L2.24876 2.29246ZM4.58584 4.32298L5.20507 3.89983V3.89983L4.58584 4.32298ZM5.88772 14.5862L5.34345 15.1022H5.34345L5.88772 14.5862ZM20.6578 9.88275L21.3923 10.0342L21.3933 10.0296L20.6578 9.88275ZM20.158 12.3075L20.8926 12.4589L20.158 12.3075ZM20.7345 6.69708L20.1401 7.15439L20.7345 6.69708ZM19.1336 15.0504L18.6598 14.469L19.1336 15.0504ZM5.70808 9.76V7.03836H4.20808V9.76H5.70808ZM2.50997 2.38429L2.24876 2.29246L1.75124 3.70754L2.01245 3.79938L2.50997 2.38429ZM10.9375 16.25H16.2404V14.75H10.9375V16.25ZM5.70808 7.03836C5.70808 6.3312 5.7091 5.7411 5.65719 5.26157C5.60346 4.76519 5.48705 4.31247 5.20507 3.89983L3.96661 4.74613C4.05687 4.87822 4.12657 5.05964 4.1659 5.42299C4.20706 5.8032 4.20808 6.29841 4.20808 7.03836H5.70808ZM2.01245 3.79938C2.68006 4.0341 3.11881 4.18965 3.44166 4.34806C3.74488 4.49684 3.87855 4.61727 3.96661 4.74613L5.20507 3.89983C4.92089 3.48397 4.54304 3.21763 4.10241 3.00143C3.68139 2.79485 3.14395 2.60719 2.50997 2.38429L2.01245 3.79938ZM4.20808 9.76C4.20808 11.2125 4.22171 12.2599 4.35876 13.0601C4.50508 13.9144 4.79722 14.5261 5.34345 15.1022L6.43198 14.0702C6.11182 13.7325 5.93913 13.4018 5.83723 12.8069C5.72607 12.1578 5.70808 11.249 5.70808 9.76H4.20808ZM10.9375 14.75C9.52069 14.75 8.53763 14.7482 7.79696 14.6432C7.08215 14.5418 6.70452 14.3576 6.43198 14.0702L5.34345 15.1022C5.93731 15.7286 6.69012 16.0013 7.58636 16.1283C8.45674 16.2518 9.56535 16.25 10.9375 16.25V14.75ZM4.95808 6.87H17.0888V5.37H4.95808V6.87ZM19.9232 9.73135L19.4235 12.1561L20.8926 12.4589L21.3923 10.0342L19.9232 9.73135ZM17.0888 6.87C17.9452 6.87 18.6989 6.871 19.2937 6.93749C19.5893 6.97053 19.8105 7.01643 19.9659 7.07105C20.1273 7.12776 20.153 7.17127 20.1401 7.15439L21.329 6.23978C21.094 5.93436 20.7636 5.76145 20.4632 5.65587C20.1567 5.54818 19.8101 5.48587 19.4604 5.44678C18.7646 5.369 17.9174 5.37 17.0888 5.37V6.87ZM21.3933 10.0296C21.5625 9.18167 21.7062 8.47024 21.7414 7.90038C21.7775 7.31418 21.7108 6.73617 21.329 6.23978L20.1401 7.15439C20.2021 7.23508 20.2706 7.38037 20.2442 7.80797C20.2168 8.25191 20.1002 8.84478 19.9223 9.73595L21.3933 10.0296ZM16.2404 16.25C17.0021 16.25 17.6413 16.2513 18.1566 16.1882C18.6923 16.1227 19.1809 15.9794 19.6074 15.6318L18.6598 14.469C18.5346 14.571 18.3571 14.6525 17.9744 14.6994C17.5712 14.7487 17.0397 14.75 16.2404 14.75V16.25ZM19.4235 12.1561C19.2621 12.9389 19.1535 13.4593 19.0238 13.8442C18.9007 14.2095 18.785 14.367 18.6598 14.469L19.6074 15.6318C20.0339 15.2842 20.2729 14.8346 20.4453 14.3232C20.6111 13.8312 20.7388 13.2049 20.8926 12.4589L19.4235 12.1561Z" fill="#1C274C"></path> <path d="M16.5 6.5L15 15" stroke="#1C274C" ></path> <path d="M9 6.5L10.5 15" stroke="#1C274C" ></path> </g></svg>
                    </span>
                    <label htmlFor='3' className='font-family opacity-80 text-xl pointer-events-none '>Product</label>
                  </a>
                  
  
              </nav>
              
          </div>
        </div>
        {/* inset */}
        {lg!=='lg' &&<div onClick={()=>{setOpen(false)}} className={`fixed ${isOpen ? "inset-0":""} bg-black bg-opacity-25`}></div>}
      </>
      
    )
  }
  
  export default Nav
  
