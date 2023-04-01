import {createContext, useState} from 'react';

export const MessageContext = createContext();

const MessageContextProvider = ({children}) => {
   
    // message Toast
    const [inforMessage, setInforMessage] = useState({
        title: '',
        description: '',
        type: ''
    });
    // show toast
    const [showToast, setShowToast] = useState(false);

    //context data
    const messageContextData = {
        showToast, setShowToast, inforMessage, setInforMessage,
    }


    // Return Provider
    return (
        <MessageContext.Provider value={
            messageContextData
        }>
            {children}
        </MessageContext.Provider>
    )
}
export default MessageContextProvider;