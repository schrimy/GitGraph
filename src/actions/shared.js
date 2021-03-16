import { getGitData } from '../utils/helpers'
import { receiveGitData } from './gitData'
import { receieveUserData } from './user'

/**
 * thunk action that calls the helper method to get user data from GitHub GraphQL API,
 * then dispatches the action to store the relevant calendar data in store state
 */
export const handleUserSubmit = (userName) => {
    return (dispatch) => {
        return getGitData(userName)
        .then(data => data.json())
        .then(res => {
            console.log('handleUserSubmit:', res)
            //make sure no errors in returned response, here they are stored in a param rather than being thrown and forcing error
            if(res.errors === undefined) {
                dispatch(
                    receiveGitData(res.data.user.contributionsCollection.contributionCalendar)
                )
                //send user data from query to action -> reducer
                dispatch(receieveUserData({
                    avatar: res.data.user.avatarUrl,
                    login: res.data.user.login,
                    name: res.data.user.name
                }))
            }
        
            return Promise.resolve(res)
        })
        .catch(err => console.log('error getting GitHub data', err))
    }
}