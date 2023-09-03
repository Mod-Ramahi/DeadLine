import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUserContext () {
    return useContext(UserContext);
}

export function UserProvider ({children}) {
    const [userId, setUserId] = useState();
    return (
        <UserContext.Provider value={{userId, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}