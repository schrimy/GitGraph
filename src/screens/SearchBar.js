import React, { useState } from 'react'
import { getGitData } from '../utils/helpers'

const SearchBar = () => {
    //hold and update the form username
    const [userName, setUserName] = useState('')

    //when a username is submitted this callback feeds the name to the helper method to fetch the data
    const handleSubmit = (evt) => {
        evt.preventDefault()

        getGitData(userName)
    }

    return (
        <form className="container pt-2 pb-2" onSubmit={ handleSubmit } >
            <div className='form-group d-flex mb-0'>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    autoFocus={ true }
                    value={ userName }
                    onChange={ (evt) => setUserName(evt.target.value)} />
                <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={ userName === '' }>
                SUBMIT</button>
            </div>
        </form>
    )
}

export default SearchBar