import React, {
    useState,
    useRef
} from 'react'
import { connect } from 'react-redux'

import { handleUserSubmit } from '../actions/shared'
import UserCard from './UserCard'

const SearchBar = (props) => {
    const { handleUserSubmit } = props
    //hold and update the form username
    const [userName, setUserName] = useState('')
    //set ref for search input -> add error styling when error occurs
    const formText = useRef('')
    const formLabel = useRef(true)

    //when called it applies red error styling to input and shows accessible label
    const showError = () => {
        formText.current.classList.add('is-invalid', 'text-danger')
        formLabel.current.hidden = false
    }

    //when called it removes red error styling to input and hides accessible label
    const hideError = () => {
        formText.current.classList.remove('is-invalid', 'text-danger')
        formLabel.current.hidden = true
    }

    //when a username is submitted this callback feeds the name to the helper method to fetch the data
    const handleSubmit = (evt) => {
        evt.preventDefault()

        //call thunk action which returns a promise, handle any errors from api response here
        handleUserSubmit(userName)
        .then(res => {
            res.errors !== undefined
                ? showError()
                : hideError()
        })
    }

    return (
        <div className='container d-sm-flex flex-row pt-2 pb-2'>
            <UserCard />
            <form className='ml-sm-2 mt-2 mt-sm-0 flex-fill align-self-center' onSubmit={ handleSubmit } >
                <div className='form-group d-flex mb-0'>
                    <input
                        type='text'
                        id='userInput'
                        className='form-control'
                        placeholder='Enter username'
                        ref={ formText }
                        autoFocus={ true }
                        value={ userName }
                        onChange={ (evt) => setUserName(evt.target.value)} />
                    <button
                        type='submit'
                        className='btn btn-dark'
                        disabled={ userName === '' }>SUBMIT</button>
                </div>
                <label
                    htmlFor='userInput'
                    ref={ formLabel }
                    className='text-danger mb-0 pt-1 font-weight-bold'
                    hidden>* invalid, please try another username</label>
            </form>
        </div>
    )
}

export default connect(null, { handleUserSubmit })(SearchBar)