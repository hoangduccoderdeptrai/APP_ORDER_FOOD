import { useAuth0 } from "@auth0/auth0-react"
import  {useCreateMyUser} from '../api/MyUserApi'
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
const CheckUser = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { createUser } = useCreateMyUser();
    const [hasCreatedUser,setCreateUser] = useState(false);
    useEffect(() => {
      if (user?.sub && user?.email && !hasCreatedUser) {
        createUser({ auth0Id: user.sub, email: user.email });
        setCreateUser(true)
      }
      navigate("/");
    }, [createUser, navigate, user,hasCreatedUser,setCreateUser]);
  
    return <>Loading...</>;
    
  
}

export default CheckUser
