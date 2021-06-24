import {COMMON_ACTION_TYPES, USER_ACTION_TYPES} from "../../utilities/constants";

const authorizeUser = (userEmail: string) => {
    return {
        type: USER_ACTION_TYPES.AUTHORIZE_USER + COMMON_ACTION_TYPES.REQUEST,
       payload: userEmail
    }
}

const getUserDetail = (userId: number) => {
   return{
       type: USER_ACTION_TYPES.GET_USER_DETAIL + COMMON_ACTION_TYPES.REQUEST,
       payload: userId
   }
}

export const userActions = {
    getUserDetail,
    authorizeUser
}
