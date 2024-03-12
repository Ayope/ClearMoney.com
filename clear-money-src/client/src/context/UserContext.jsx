import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext({});

export function UserContextProvider({children}){

    const [user , setUser] = useState(()=>{
        const localStorageUser = localStorage.getItem("user");
        return localStorageUser ? JSON.parse(localStorageUser) : {};
    });
    
    const resetUser = () => {
        setUser({});
        localStorage.removeItem("user");
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
    };

    return (
        <UserContext.Provider value={{user, setUser, resetUser}}>
            {children}
        </UserContext.Provider>
    )

}

export function useUser() {
  return useContext(UserContext);
}