import React,{memo} from 'react'
import {FormData} from '../../../config/FormDate'
import UploadImage from './UploadImage'
                
const ItemForm = ({rawData,setRawData,className,openForm,setOpenForm,buttonText,imgFile,setImgFile,onSubmit,setCurrentEditedId,currentEditedId}) => {
    // console.log(rawData.images)
    const handleForm =(Item)=>{
        let value =rawData[Item.name] || ""
        let element =null
        let classCustom ='border-2 border-black border-opacity-20 rouded-sm py-2 px-3'
        if(Item.componentType ==='input'){
            element =(
                <input 
                    type={Item.type} 
                    placeholder={Item.placeholder}
                    className={classCustom}
                    id={Item.name}
                    name={Item.name}
                    value={value}
                    onChange={(event)=>{setRawData({...rawData,[Item.name]:event.target.value})}}

                />
            )
        }else if(Item.componentType ==='textarea'){
            element =(
                <textarea 
                    type={Item.type} 
                    placeholder={Item.placeholder} 
                    id={Item.name}
                    name={Item.name}
                    className={classCustom}
                    value={value}
                    onChange={(event)=>{setRawData({...rawData,[Item.name]:event.target.value})}}

                />

                
            )
        }else if(Item.componentType ==='select'){
            element=(
                <select
                    value={value}
                    className={classCustom}
                    id={Item.name}
                    name={Item.name}
                    onChange={(event)=>{setRawData({...rawData,[Item.name]:event.target.value})}}
                >
                    {
                        Item?.options.map((elm)=>(
                            <option key={elm.id} id={elm.id} value={elm.id}>{elm.label}</option>
                            
                        ))
                    }
                   
                </select>
            )
        }else{
            element=(
                <input 
                    type={Item.type} 
                    placeholder={Item.placeholder}
                    className={classCustom}
                    id={Item.name}
                    name={Item.name}
                    value={value}
                    onChange={(event)=>{setRawData({...rawData,[Item.name]:event.target.value})}}

                />
            )
        }

        return element
    }
    const handleCloseForm =()=>{
        setCurrentEditedId(null)
        console.log(currentEditedId,'day la current id')
        setOpenForm(false)
    }
  return (
    <div className={className}>
        <form className='w-full'>
            <div className='flex justify-between mb-2'>
                <div className='text-2xl font-mono font-bold'>{buttonText ==="Add"?"Add New Product":"Edit Product"}</div>
                <div className='cursor-pointer' onClick={()=>handleCloseForm()}><i className='bx bx-x text-2xl'></i></div>
            </div>
            <div className='flex flex-col gap-3'>
                <UploadImage setImgFile={setImgFile} imgFile={imgFile} rawData={rawData}/>
                {FormData&&
                    FormData.map((Item)=>{
                        return (
                            <div className='w-full grid gap-1' key={Item.id}>
                                <label className='first-letter:capitalize text-xl'>{Item.lable}</label>
                                {handleForm(Item)}
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-end'>
                <button onClick={(event)=>onSubmit(event)} type='submit' className='mt-3 max-w-[200px] w-full py-1 text-white bg-[#198754]'>{buttonText||"Submit"}</button>
            </div>
            
        </form>
    </div>
  )
}

export default memo(ItemForm)
