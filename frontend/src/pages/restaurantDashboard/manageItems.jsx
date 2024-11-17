import React from 'react'
import { useState,useEffect,useCallback } from 'react'
import LoadingOverlay from 'react-loading-overlay-ts'
import hero from '../../assets/hero.png'
import ItemForm from '../../component/Dashboard/commom/ItemForm'
import { addItem,updateItem,deleteItem,fetchAllItem } from '../../features/products-slice'
import {useSelector,useDispatch} from "react-redux"
import { ToastContainer } from 'react-toastify'
import { SuccessfulNotification,FailedNotification} from '../../component/common/Notification.jsx'
import ShowDeleteConfirmation from '../../component/common/showDeleteConfirmation.jsx'
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
    const [showDelete,setShowDelete] =useState(false)
    const {itemList,isLoading,error} = useSelector(state=>state.RestaurantItems)
    const dispatch =useDispatch()
    const handleCreateItem =()=>{
        setCurrentEditedId(null)
        setOpenForm(!openForm)
        setRawData(initRawData)
    }
   
    const handleEdit =(item)=>{
        const id =item._id
        console.log(item,'item')
        // console.log(item.imageUrl[0].url)
        setRawData({
            images:item.imageUrl[0].url,
           
            ...item
        })
        console.log(rawData)

        
        setCurrentEditedId(id)

        setOpenForm(!openForm)
    }
    const handleShowDelete =(item)=>{
        setCurrentEditedId(item._id)
        setShowDelete(true)
        console.log("may nhin cai cho gì")
    }
    const handleDelete =async()=>{
        try{
            const data =await dispatch(deleteItem(currentEditedId))
            if(!isLoading && !error && data){
            
                dispatch(fetchAllItem(rawData?.restaurantId))
                setOpenForm(false)
                setShowDelete(false)
                SuccessfulNotification("Delete Item")
                setCurrentEditedId(null)
                setRawData(initRawData)
                setImgFile("")
            
            }
        }catch(err){
            FailedNotification("Delete Item")
            console.error(err.message)
        }
    }
    const onSubmit =async (event)=>{
        event.preventDefault()
        if(currentEditedId!==null){
            // Edit
            console.log(currentEditedId)
            try{
                const data =await dispatch(
                    updateItem({
                        currentEditedId,
                        formData:{
                            ...rawData,
                            images:imgFile
                        }
                    })
                )
                console.log(data,'edit')
                if(!isLoading&& !error){
                    dispatch(fetchAllItem(rawData?.restaurantId))
                    setOpenForm(false)
                    SuccessfulNotification("Edit Item")
                    setCurrentEditedId(null)
                    setRawData(initRawData)
                    setImgFile("")
                }
            }catch(err){
                FailedNotification("Edit Item")
                console.error("Error editing product:",err.message)
            }
            
            
        }else{
            // Create
            try{
                const data =await dispatch(
                    addItem({
                        ...rawData,
                        images:imgFile
                    })
                )
                console.log(data,"add")
                if(!isLoading&& !error){
                    dispatch(fetchAllItem(rawData?.restaurantId))
                    setOpenForm(false)
                    SuccessfulNotification("Add Item")
                    setRawData(initRawData)
                    setImgFile("")

                }
            }catch(err){
                FailedNotification("Add Item")
                console.error("Error creating product:",err.message)
            }
           
            
        }
    }
    useEffect(()=>{
        dispatch(fetchAllItem(rawData?.restaurantId))
        console.log(itemList,'cc')
    },[dispatch])
    useEffect(()=>{
        console.log(showDelete,'show')
    },[showDelete])
  return (
    
    <LoadingOverlay
        active={isLoading}
        spinner
        text="Loading..."
        className='h-[650px] '
    >

        <ToastContainer limit={1} className=""/>
        <div className='relative mx-5 my-2 px-3 py-4'>
           
            <div className='flex justify-between mb-3'>
                <h3 className='text-3xl font-[700] font-family color-1 text-left mb-4 '>Welcome Manage Items 👋</h3>
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
                                <td className=' '>
                                    {/* <td className='border-none'><button className='px-2 py-1  rounded-sm bg-[#ffc107]'>Edit</button></td>
                                    <td className='border-none'><button className='px-2 py-1 rounded-sm bg-[#dc3545]'>Delete</button></td> */}

                                    <button id="1" onClick={(event)=>handleEdit(event)} className='px-2 py-1  rounded-sm bg-[#ffc107] mr-2'>Edit</button>
                                    <button className='px-2 py-1 rounded-sm bg-[#dc3545]'>Delete</button>
                                </td>
                            </tr>
                            {
                                Array.isArray(itemList) &&!isLoading&& itemList.length>0 ? (
                                    itemList.map((item)=>(
                                        <tr key={item._id} id={item._id}>
                                            <td>
                                                <img src={item.imageUrl[0].url} className='w-[100px] flex mx-auto'/>
                                            </td>
                                            <td>
                                                {item.title}
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>{parseInt(item.price).toLocaleString('it-IT',{style:'currency',currency:'VND'})}</td>
                                            <td className=''>
                                                <button  onClick={()=>handleEdit(item)} className='px-2 py-1  rounded-sm bg-[#ffc107] mr-2'>Edit</button>
                                                <button onClick={()=>handleShowDelete(item)}  className='px-2 py-1 rounded-sm bg-[#dc3545]'>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ):(
                                    <tr>
                                        <td colSpan="5" className="text-center">No items found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ItemForm
                className={`${!openForm ?"hidden":"block animation-form"}  max-w-[720px] z-20 w-full px-5 text-left py-10 fixed mt-[100px]  left-[50%] -translate-x-[50%] bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_(rgba(145,158,171,0.08),0_12px_24px_-4px_(rgba(145,158,171,0.08))]`}
                rawData ={rawData}
                setRawData ={setRawData}
                openForm={openForm}
                setOpenForm={setOpenForm}
                buttonText={currentEditedId!==null?"Edit":"Add"}
                setCurrentEditedId={setCurrentEditedId}
                currentEditedId ={currentEditedId}
                imgFile={imgFile}
                setImgFile={setImgFile}
                onSubmit={onSubmit}
            />
            
            <ShowDeleteConfirmation setShowDelete={setShowDelete} showDelete={showDelete} handleDelete={handleDelete}/>
            {isLoading&&(
                <div>

                </div>
            )}
            <div className={`fixed ${openForm?"inset-0":""} bg-black opacity-25 z-10`}></div>
            
            
        </div>
    </LoadingOverlay>
  )
}

export default ManageItems
