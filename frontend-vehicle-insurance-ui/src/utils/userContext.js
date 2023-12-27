import { createContext, useState } from "react";

export const userContext = createContext();


export const Provider = ({ children }) => {
    // const [name,setName] = useState({});
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    });
    const signUp =(value)=>{
        setUser({...user,name:value.username, email:value.email, password:value.password});
    }

    console.log(user)


    return (
        <userContext.Provider value={{user,signUp}}>
            {children}
        </userContext.Provider>
    )
}

