import {toast} from 'react-toastify'

export const NotificationAdd =(name)=>{
    return toast.success(`Add ${name} was successful`,{
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