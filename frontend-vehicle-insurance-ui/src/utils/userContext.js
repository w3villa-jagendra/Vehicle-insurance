import { createContext, useState } from "react";

export const userContext = createContext();


export const Provider = ({ children }) => {
    // const [name,setName] = useState({});
    const [user,setUser] = useState({
        username:'',
        email:'',
        hashedPassword:''
    });
    const signUp =(value)=>{
        setUser({
            username : value.username,
            email : value.email,
            hashedPassword: value.password

        });
    }


    return (
        <userContext.Provider value={{user,signUp}}>
            {children}
        </userContext.Provider>
    )
}

