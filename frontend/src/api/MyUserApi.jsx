import {useAuth0} from "@auth0/auth0-react"
import { useMutation} from "react-query";

const UIR_API_BASE =import.meta.env.VITE_URI_API_BASE
console.log(UIR_API_BASE)

//   WRONNG SOMETHING I DONT KNOW TO FIX !!!!!

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const createMyUserRequest = async (user) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${UIR_API_BASE}/api/my/user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
    };
    // this code snippet stand for fetch data from server
    const {
      mutateAsync: createUser,
      isLoading,
      isError,
      isSuccess,
    } = useMutation(createMyUserRequest);
  
    return {
      createUser,
      isLoading,
      isError,
      isSuccess,
    };
  };
  