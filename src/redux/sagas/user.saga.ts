import { APP_CONFIGS } from './../../utilities/constants/config.constants';
import { call, put, takeEvery } from "redux-saga/effects"
import Cookies from 'universal-cookie';

import { COMMON_ACTION_TYPES } from '../../utilities/constants';
import { USER_ACTION_TYPES } from '../../utilities/constants';
import { userService } from "../../services"

function* authorizeUser(action: any) {
    try {
        const cookies = new Cookies();
        // @ts-ignore
        const authorizedUser = yield call(userService.authorizeUser, action.payload)
        // Set authorized user cookie
        let authorizedUserData = authorizedUser.data;
        // TODO: check conditins before set isAuthorized
        authorizedUserData.isAuthorized = true;
        authorizedUserData = btoa(JSON.stringify(authorizedUserData));

        // generate cookie expire
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        
        cookies.set(APP_CONFIGS.USER_DATA_COOKIE, authorizedUserData, { path: '/', expires: expireDate });

        yield put({ type: USER_ACTION_TYPES.AUTHORIZE_USER + COMMON_ACTION_TYPES.SUCCESS, data: authorizedUser.data })
    }
    catch (error) {
        yield put({ type: USER_ACTION_TYPES.AUTHORIZE_USER + COMMON_ACTION_TYPES.ERROR, error: error.message })
    }
}

function* getUserDetail(action: any) {
    try {
        // @ts-ignore
        const userDetail = yield call(userService.getUserDetail, action.payload)
        console.log('Saga fetch res', userDetail)
        yield put({ type: USER_ACTION_TYPES.GET_USER_DETAIL + COMMON_ACTION_TYPES.SUCCESS, data: userDetail.data })
    }
    catch (error) {
        yield put({ type: USER_ACTION_TYPES.GET_USER_DETAIL + COMMON_ACTION_TYPES.ERROR, error: error.message })
    }
}

function* userSaga() {
    yield takeEvery(USER_ACTION_TYPES.AUTHORIZE_USER + COMMON_ACTION_TYPES.REQUEST, authorizeUser);
    yield takeEvery(USER_ACTION_TYPES.GET_USER_DETAIL + COMMON_ACTION_TYPES.REQUEST, getUserDetail);
}

export default userSaga;
