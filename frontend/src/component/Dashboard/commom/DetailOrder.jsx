import React from 'react'

const DetailOrder = ({orders,className,openForm,setOpenForm,handleChangeStatus}) => {
    const handleCloseForm =()=>{
        setOpenForm(false)
    }
  return (
    <>
    
    <div className={`${className}  overflow-hidden`}>
        <div className='flex justify-between mb-5 -mt-4'>
            <div className='text-2xl font-mono font-bold'>Detail Orders</div>
            <div className='cursor-pointer' onClick={()=>handleCloseForm()}><i className='bx bx-x text-2xl -mt-3'></i></div>
        </div>
        <div className='w-full h-[calc(100vh-200px)] overflow-y-auto'>
            <div className='flex flex-col gap-3'>
                <table className='w-full border-collapse'>
                    <thead className='hidden'>
                        <tr>
                            <th>iamge</th>
                            <th>name</th>
                            <th>price</th>
                            <th>quantity</th>
                        </tr>    
                    </thead>
                    <tbody>
                    {orders?.items.length>0&&
                        orders?.items.map((order)=>{
                            return (
                        
                                        <tr key={order._id}>
                                            <td>
                                                <img src={order.menuItemId.imageUrl[0].url} className='w-[150px] flex mx-auto'/>
                                            </td>
                                            <td>
                                                <h4 className=' text-lg font-sans font-[500]'>{order.menuItemId.title}</h4>
                                            </td>
                                            <td>
                                                <span className='text-16 font-sans font-[600]'>{(order.menuItemId.price).toLocaleString('it-IT',{style:"currency",currency:'VND'})}</span>
                                            </td>
                                            <td>{order.quantity}</td>
                                        </tr>
                                
                                
                            )
                        })
                        
                    }
                    
                    </tbody>
                </table>
                <div className='flex flex-col place-items-end gap-2 '>
                    <div className='bg-[#F7F7F7] p-[3px_10px]'>
                        <div className='flex justify-center items-center gap-2'>
                            <h4 >TỔNG CỘNG</h4>
                            <span className=' font-sans text-[18px] font-[600] text-[#555555]'>{(orders?.totalPrice)?.toLocaleString('it-IT',{style:'currency',currency:'VND'})}</span>
                        </div>
                        <p className='opacity-50 text-center'>(Đã bao gồm VAT nếu có)</p>
                       
                    </div>
                    

                    
                </div>
                <div>
                    <h2 className='text-xl font-sans font-bold mb-4'>Địa Chỉ</h2>
                    
                    <div className='border-[2px_solid_black] border-2 p-[5px_10px]'>
                        <h3 className='font-bold'>Name: {orders?.accountId.name}</h3>
                        <p>{orders?.deliveryAddress.street}, {orders?.deliveryAddress.borough}, {orders?.deliveryAddress.city}, Việt Nam</p>
                        <span>Zip: {orders?.deliveryAddress.zip}</span>
                        <h2 className='text-md font-[300px]'>STD: {orders?.accountId.phone}</h2>
                    </div>
                    
                </div>
                <div className='flex justify-end'>
                    {
                        orders?.status =='pending'?
                        (
                            <div className='flex justify-center items-start gap-2'>
                                <button id={orders?._id}  value='canceled' onClick={(event)=>handleChangeStatus(event)}  className='bg-[#F7F7F7] round-sm p-2'>CANCEL</button>
                                <button id={orders?._id} value='accept' onClick={(event)=>handleChangeStatus(event)} className='bg-[#0D6EFD] round-sm p-2'>ACCEPT</button>
                            </div>
                            
                        ):(
                            <span className='bg-[#F7F7F7] text-lg font-[300] rounded-sm p-2 '><strong className="font-semibold">Status: </strong>{orders?.status}</span>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default DetailOrder
