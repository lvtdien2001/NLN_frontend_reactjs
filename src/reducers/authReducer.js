import { SET_AUTH, UPDATE_USER_INFO, UPDATE_USER_IMAGE, CREATE_NEW_ADDRESS, DELETE_ADDRESS, UPDATE_ADDRESS_DEFAULT } from "../context/constanst";

const authReducer = (state, action) => {
    const {type, payload: {isAuthenticated, user, allAddresses, newAddress, addressID}} = action;

    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
                allAddresses
            }
            case UPDATE_USER_INFO:
                return {
                    ...state,
                    isAuthenticated,
                    user
            }
            case UPDATE_USER_IMAGE:
                return {
                    ...state,
                    isAuthenticated,
                    user
                }
            case CREATE_NEW_ADDRESS:
                return {
                    ...state,
                    allAddresses: [...state.allAddresses, newAddress]
                }
            case DELETE_ADDRESS:
                return {
                    ...state,
                    allAddresses: state.allAddresses.filter(address => address._id !== addressID)
                }
            case UPDATE_ADDRESS_DEFAULT:
                const id = state.allAddresses.find(address => address._id === addressID);
               
                return {
                    ...state,
                    user: {...state.user, address: id}
                }
        default:
            break;
    }
}

export default authReducer
