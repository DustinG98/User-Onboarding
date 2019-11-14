import React from 'react';

const Users = (props) => {
    return (
        <div>
            {props.users.map(user => {
                return <div key={user.id}>
                    <h1>Name: {user.name}</h1>
                    <h4>Email: {user.email}</h4>
                    <p>Password: {user.password}</p>
                </div>
            })}
        </div>
    )
}

export default Users