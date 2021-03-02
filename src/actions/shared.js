import { getGitData } from '../utils/helpers'
import { receiveGitData } from './gitData'

//TODO: maybe needs to just go into gitData actions, see when others are created.

/**
 * thunk action that calls the helper method to get user data from GitHub GraphQL API,
 * then dispatches the action to store the relevant calendar data in store state
 */
export const handleUserSubmit = (userName) => {
    return (dispatch) => {
        return getGitData(userName)
        .then(data => data.json())
        .then(res => {
            if(res.errors === undefined) {
                dispatch(
                    receiveGitData(res.data.user.contributionsCollection.contributionCalendar)
                )
            }
        
            return Promise.resolve(res)
        })
        .catch(err => console.log('error getting GitHub data', err))
    }
}