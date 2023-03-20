import { SET_AUTH, UPDATE_USER_INFO, UPDATE_USER_IMAGE } from "../context/constanst";
export const authReducer = (state, action) => {
    const {type, payload: {isAuthenticated, user}} = action;

    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
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
            
    
        default:
            break;
    }
}