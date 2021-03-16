import { RECEIVE_USER_DATA } from '../utils/constants'

export const receieveUserData = (userData) => {
    return {
        type: RECEIVE_USER_DATA,
        userData
    }
}