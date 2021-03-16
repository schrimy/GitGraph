import React from 'react'
import { connect } from 'react-redux'

const UserCard = (props) => {
    const { userInfo } = props

    //TODO: place into seperate style file
    const divStyle = {
        width: '40px',
        height: '40px'
    }

    return(
        userInfo !== null &&(
            <div className='d-inline-flex align-items-center'>
                <img style={divStyle} className='rounded-circle mr-1' src={userInfo.avatar} alt="user's avatar from GitHub" />
                <div className='d-flex flex-column'>
                    <em>{userInfo.name}</em>
                    <strong>{userInfo.login}</strong>
                </div>
            </div>
        )
    )
}

function mapStateToProps({ userData }) {
    return {
        userInfo: userData !== null ? userData : null
    }
}

export default connect(mapStateToProps)(UserCard)