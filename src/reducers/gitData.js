import { RECEIVE_GIT_DATA } from '../utils/constants'

const gitData = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_GIT_DATA:
            return {
                ...action.userGitData
            }
        default:
            return state
    }
}

export default gitData