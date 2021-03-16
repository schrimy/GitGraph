import { combineReducers } from 'redux'
import gitData from './gitData'
import userData from './user'

export default combineReducers({
    gitData,
    userData
})