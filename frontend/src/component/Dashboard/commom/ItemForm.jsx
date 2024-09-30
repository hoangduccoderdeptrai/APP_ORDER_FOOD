import React from 'react'
import {FormData} from '../../../config/FormDate'
const ItemForm = (rawData) => {
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
                    value={value}

                />
            )
        }else if(Item.componentType ==='textarea'){
            element =(
                <textarea 
                    type={Item.type} 
                    placeholder={Item.placeholder} 
                    className={classCustom}
                    value={value}

                />

                
            )
        }else if(Item.componentType==='select'){
            element=(
                
            )
        }

        return element
    }
  return (
    <div className='absolute max-w-[720px] w-full top-0 left-[50%] -translate-x-[50%] bg-[#FFFFFF] text-left text-[#212B36] shadow-[2px_0_2px_0_rgba(145,158,171,0.08)]'>
        <form className='w-full'>
            {FormData&&
                FormData.map((Item)=>{
                    return (
                        <div className='w-full grid gap-1' key={Item.id}>
                            <label className='first-letter:capitalize text'>{Item.lable}</label>
                        </div>
                    )
                })
            }
        </form>
    </div>
  )
}

export default ItemForm
