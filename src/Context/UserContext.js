import React, {createContext, useState, useContext} from "react";

const UserContext = createContext();

export default function UserProvider({children}){
    const[user, setUser] =  useState({
        id: 0,
        nome: "",
        login: "",
        senha: "",
        logado: false
    })

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function UseUser(){
    const context = useContext(UserContext)
    const {user, setUser} = context
    return{user, setUser}
}