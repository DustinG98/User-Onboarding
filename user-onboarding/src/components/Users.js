import React from 'react';

const Users = (props) => {
    return (
        <div>
            {props.users.map(user => {
                return <div key={user.id}>
                    <h1>{user.name}</h1>
                    <h4>{user.email}</h4>
                    <p>{user.password}</p>
                </div>
            })}
        </div>
    )
}

export default Users