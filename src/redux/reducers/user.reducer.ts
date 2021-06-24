import { stat } from "fs";
import {COMMON_ACTION_TYPES, USER_ACTION_TYPES} from "../../utilities/constants";

const INITIAL_STATE = {
    userDetail: {
        data: {},
        isLoading: false,
        error: null
    },
    authorizedUser: {
        data: {},
        isLoading: false,
        error: null
    }
}

const userReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        // Authorize user
        case USER_ACTION_TYPES.AUTHORIZE_USER+ COMMON_ACTION_TYPES.REQUEST:
            return {
                ...state,
                authorizedUser: {
                    ...state.authorizedUser,
                    isLoading: true,
                }
            }
        case USER_ACTION_TYPES.AUTHORIZE_USER+ COMMON_ACTION_TYPES.SUCCESS:
            return {
                ...state,
                authorizedUser: {
                    isLoading: false,
                    data: action.data,
                    error: null
                }
            }
            case USER_ACTION_TYPES.AUTHORIZE_USER+ COMMON_ACTION_TYPES.ERROR:
            return {
                ...state,
                authorizedUser: {
                    isLoading: false,
                    data: {},
                    error: action.error
                }
            }
        // get user details
        case USER_ACTION_TYPES.GET_USER_DETAIL+ COMMON_ACTION_TYPES.REQUEST:
            return {
                ...state,
                userDetail: {
                    ...state.userDetail,
                    isLoading: true,
                }
            }
        case USER_ACTION_TYPES.GET_USER_DETAIL+ COMMON_ACTION_TYPES.SUCCESS:
            console.log('Action on reducer',action)
            return {
                ...state,
                userDetail: {
                    isLoading: false,
                    data: action.data.data,
                    error: null
                }
            }
            case USER_ACTION_TYPES.GET_USER_DETAIL+ COMMON_ACTION_TYPES.ERROR:
            return {
                ...state,
                userDetail: {
                    isLoading: false,
                    data: {},
                    error: action.error
                }
            }
        default:
            return state;

    }
}

export default userReducer;
