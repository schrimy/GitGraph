import { RECEIVE_USER_DATA } from '../utils/constants'

const userData = (state = null, action) => {
    switch (action.type) {
        case RECEIVE_USER_DATA:
            return {
                ...action.userData
            }
        default:
            return state
    }
}

export default userData