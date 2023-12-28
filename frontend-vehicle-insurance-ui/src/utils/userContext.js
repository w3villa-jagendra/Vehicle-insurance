import { createContext, useState } from "react";

export const userContext = createContext();


export const Provider = ({ children }) => {
    // const [name,setName] = useState({});
    const [user,setUser] = useState();
    const signUp =(value)=>{
        setUser(value);
    }

    console.log(user)


    return (
        <userContext.Provider value={{user,signUp}}>
            {children}
        </userContext.Provider>
    )
}

