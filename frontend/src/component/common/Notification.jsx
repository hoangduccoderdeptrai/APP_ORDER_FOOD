import {toast} from 'react-toastify'
import { deleteItem } from '../../features/products-slice'

export const NotificationAdd =(name)=>{
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


  