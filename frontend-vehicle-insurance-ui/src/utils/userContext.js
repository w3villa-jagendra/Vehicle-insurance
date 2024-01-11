import { createContext, useState } from "react";

export const userContext = createContext();


export const Provider = ({ children }) => {
 
    const [user,setUser] = useState({
        username:'',
        email:'',
        hashedPassword:'',
        userRole:''
    });
    


    return (
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider>
    )
}

