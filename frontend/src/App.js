import './App.css';
import React, {useState, useEffect} from 'react';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [authenticated, setAuthenticated] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [login, setLogin] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3001/users")
    .then(resp => resp.json())
    .then(users => setAllUsers(users))
  },[])

  useEffect(() => {
    fetch("/me", {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setAuthenticated(true);
          console.log(user)
        });
      } else {
        setAuthenticated(true);
      }
    });
  }, []);

  return (
    <div className="App">
      {currentUser ? <h1>Welcome {currentUser.name}</h1> : <h4>Not Signed in</h4>}
     {login ? <Login setCurrentUser={setCurrentUser}/> : <Signup currentUser={currentUser} allUsers={allUsers} setCurrentUser={setCurrentUser}/>}
     <button onClick={() => setLogin(!login)}>ToggleLogin</button>
    </div>
  );
}

export default App;
