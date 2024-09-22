
import { Auth0Provider} from "@auth0/auth0-react"
import { useNavigate} from "react-router-dom"

// this file to inital Auth0Provider so you can not get User or isLoading and so on

const AuthProviderWithNavigate = ({children}) => {
  // setting of auth
  const navigate =useNavigate()
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId =import.meta.env.VITE_AUTH0_CLIENT_ID
 
  if(!domain||!clientId){
    throw new Error("dont work with auth0")
  }
  
  const onRedirectCallback =()=>{
    navigate('/auth-callback')
    // <Navigate to={"/auth-callback"}/>
  }

 
  return (
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri:'http://localhost:5173'
        }}
        onRedirectCallback={
          onRedirectCallback
        }
      
       
    >
     {children}

    </Auth0Provider>
  )
}

export default AuthProviderWithNavigate
