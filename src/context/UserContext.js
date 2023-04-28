import {createContext, useState} from 'react';

const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);

    //context data
    const data = {
        allUsers, setAllUsers, users, setUsers, orders, setOrders
    }


    // Return Provider
    return (
        <UserContext.Provider value={data} >
            {children}
        </UserContext.Provider>
    )
}

export { UserContext }
export default UserContextProvider
