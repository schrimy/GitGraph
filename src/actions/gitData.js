import { RECEIVE_GIT_DATA } from '../utils/constants'

//dispatches action to git data reducer with passed in git user data payload
export const receiveGitData = (userGitData) => {
    return {
        type: RECEIVE_GIT_DATA,
        userGitData
    }
}