import React, { useState } from 'react'

const SearchBar = () => {
    //hold and update the form username
    const [userName, setUserName] = useState('')

    return (
        <form className="container pt-2 pb-2">
            <div className='form-group d-flex mb-0'>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    autoFocus={ true }
                    value={ userName }
                    onChange={ (evt) => setUserName(evt.target.value)} />
                <button type="submit" className="btn btn-dark">SUBMIT</button>
            </div>
        </form>
    )
}

export default SearchBar