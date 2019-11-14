import React, { useState } from 'react';
import './App.css';
import Form from './components/Form'
import Users from './components/Users'

function App() {
  //user state
  const [users, addUser] = useState([]);

  //add user function
  const addNewUser = (user) => {
    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      tos: user.tos
    }
    addUser([...users, newUser] )
  }


  return (
    <div className="App">
      {console.log(users)}
      <Form addNewUser={addNewUser}/>
      <Users users={users}/>
    </div>
  );
}

export default App;
