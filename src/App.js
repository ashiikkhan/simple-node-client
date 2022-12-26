import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers]=useState([]);

  useEffect(()=> {
    fetch("http://localhost:5000/users")
    .then(res=>res.json())
    .then(data=>setUsers(data));
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name=form.name.value;
    const email=form.email.value;
    const user={name, email}; 
    console.log(user);

    //data post 
    fetch("http://localhost:5000/users", {
      method: "POST", 
      headers: {
        "content-type": "application/json"
      }, 
      body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      const newUsers=[...users, data];
      setUsers(newUsers);
    })
    .catch(err=> console.log(err));
    event.target.reset();
  }

  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <button type="submit">Add User</button>
      </form>

      <h2>users: {users.length}</h2>

      {
        users.map(user=> <p key={user._id}>{user.name} {user.email}</p>)
      }
    </div>
  );
}

export default App;
