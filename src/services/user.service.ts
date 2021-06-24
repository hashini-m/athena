import axios from 'axios';

const authorizeUser = (userEmail: string) => {
    // should replace with API
    // return axios.get(`/`)
    return ({
        data: {
            email: userEmail
        }
    })
}

const getUserDetail = (userId: number) => {
    console.log('Data on Axios',userId);
    return axios.get(`/api/products/${userId}`)
}

export const userService = {
    getUserDetail,
    authorizeUser
}
