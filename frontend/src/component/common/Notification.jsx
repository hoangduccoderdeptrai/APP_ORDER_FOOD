import {toast} from 'react-toastify'
import { deleteItem } from '../../features/products-slice'

export const SuccessfulNotification =(name)=>{
    return toast.success(`${name} was successful`,{
        position:'top-center',
        autoClose:2000,
        hideProgressBar:false,
        closeOnClick:true,
        style:{
            backgroundColor:'#fff',
            color:'#000'

        }
    })
}
export const FailedNotification =(name)=>{
    return toast.error(`${name} was not successful`,{
        position:'top-center',
        autoClose:2000,
        closeOnClick:true,
        hideProgressBar:false,
        

    })
}


  