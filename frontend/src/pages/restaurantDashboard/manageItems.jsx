import React from 'react'
import { useState,useEffect } from 'react'
import LoadingOverlay from 'react-loading-overlay-ts'
import hero from '../../assets/hero.png'
import ItemForm from '../../component/Dashboard/commom/ItemForm'
import { addItem,updateItem,deleteItem,fetchAllItem } from '../../features/products-slice'
import {useSelector,useDispatch} from "react-redux"
import { ToastContainer } from 'react-toastify'
import { NotificationAdd } from '../../component/common/Notification.jsx'
import 'react-toastify/dist/ReactToastify.css';
const initRawData ={
    images:null,
    restaurantId:"66f754127c954abda7c56d15", 
    title:"", 
    description:"", 
    price:"1000", 
    category:"cho"
}
const ManageItems = () => {
    const [openForm,setOpenForm] =useState(false)
    const [rawData,setRawData] =useState(initRawData)
    const [currentEditedId,setCurrentEditedId] =useState(null)
    const [imgFile,setImgFile] =useState("")
    const dispath =useDispatch()
    const {itemList,isLoading,error} = useSelector(state=>state.RestaurantItems)
    const handleCreateItem =()=>{
        
        setOpenForm(!openForm)
    }
    const handleEdit =(event)=>{
        const id =event.target.id
        setCurrentEditedId(id)
        setOpenForm(!openForm)
    }
    const onSubmit =async (event)=>{
        event.preventDefault()
        if(currentEditedId!==null){
            // Edit
            try{
                const data =await dispath(
                    updateItem(currentEditedId,rawData)
                )
                console.log(data,'edit')
            }catch(err){
                console.error("Error editing product:",err.message)
            }
            
            
        }else{
            // Create
            try{
                const data =await dispath(
                    addItem({
                        ...rawData,
                        images:imgFile
                    })
                )
                console.log(data,"add")
                if(!isLoading&& !error){
                    dispath(fetchAllItem())
                    setOpenForm(false)
                    NotificationAdd("Item")
                }
            }catch(err){
                console.error("Error creating product:",err.message)
            }
           
            
        }
    }
    useEffect(()=>{
        dispath(fetchAllItem())
    },[dispath])
  return (
    
    <LoadingOverlay
        active={isLoading}
        spinner
        text="Loading..."
        className='h-[650px] '
    >

        <ToastContainer/>
        <div className='relative mx-5 my-2 px-3 py-4'>
           
            <div className='flex justify-between mb-3'>
                <h3 className='text-3xl font-[700] font-family color-1 text-left mb-4'>Welcome Manage Items 👋</h3>
                <button onClick={()=>handleCreateItem()} className=' bg-[#0d6efd] text-white font-bold rounded-md px-3 '>Add new Product</button>
            </div>
        
            <div className='bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)] rounded-[16px] transition-[box-shadow_300ms_cubic-bezier(0.4,0,0.2,1)_0ms]'>
                <div className='px-6 flex justify-between items-center min-h-[64px] h-[128px]'>
                    <div className='border-2 flex items-center rounded-md px-3 py-1  border-solid border-[#212B36] border-opacity-60'>
                        <div>
                        <i className='bx bx-search-alt-2 text-2xl'></i>
                        </div>
                        <input className=' outline-none placeholder:text-slate-400 px-3 py-2 box-border ' placeholder="Search user..."/>
                    </div>
                    <button>
                        <i className='bx bx-filter text-2xl' ></i>
                    </button>
                </div>
                
                <div className='px-6 pb-6'>
                    <table className='w-full overflow-x-auto border-collapse  border-2 border-solid border-[rbg(200,200,200)] '>
                        <thead className=''>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Others</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=''>
                                <td>
                                    <img className='w-[100px] flex mx-auto' src={hero}/>
                                </td>
                                
                                <td>Bánh Humbeger la so mot do ca em eoi sdfs</td>
                                <td>2</td>
                                <td>{(30000).toLocaleString('it-IT',{style:"currency",currency:'VND'})}</td>
                                <td className='border-none '>
                                    {/* <td className='border-none'><button className='px-2 py-1  rounded-sm bg-[#ffc107]'>Edit</button></td>
                                    <td className='border-none'><button className='px-2 py-1 rounded-sm bg-[#dc3545]'>Delete</button></td> */}

                                    <button id="1" onClick={(event)=>handleEdit(event)} className='px-2 py-1  rounded-sm bg-[#ffc107] mr-2'>Edit</button>
                                    <button className='px-2 py-1 rounded-sm bg-[#dc3545]'>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <ItemForm
                className={`${!openForm ?"hidden":"block animation-form"}  max-w-[720px] z-10 w-full px-5 text-left py-10 absolute top-0  left-[50%] -translate-x-[50%] bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_(rgba(145,158,171,0.08),0_12px_24px_-4px_(rgba(145,158,171,0.08))]`}
                rawData ={rawData}
                setRawData ={setRawData}
                openForm={openForm}
                setOpenForm={setOpenForm}
                buttonText={currentEditedId!==null?"Edit":"Add"}
                imgFile={imgFile}
                setImgFile={setImgFile}
                onSubmit={onSubmit}
            />
            {isLoading&&(
                <div>

                </div>
            )}
            <div className={`fixed ${openForm?"inset-0":""} bg-black opacity-25`}></div>
            
            
        </div>
    </LoadingOverlay>
  )
}

export default ManageItems
