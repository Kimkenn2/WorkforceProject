import './App.css';
import React, {useState, useEffect} from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [authenticated, setAuthenticated] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [login, setLogin] = useState(true)
  const [organisations, setOrganisations] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/users")
    .then(resp => resp.json())
    .then(users => setAllUsers(users))
  },[])

  useEffect(() => {
    fetch("http://localhost:3001/organisations")
    .then(resp => resp.json())
    .then(orgs => setOrganisations(orgs))
  })

  useEffect(() => {
    fetch("http://localhost:3001/me", {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setAuthenticated(true);
          console.log(user)
        });
      } else {
        setAuthenticated(true)
        console.log(res)
        ;
      }
    });
  }, []);

  return (
    <div className="App">
      {currentUser ? <h1>Welcome {currentUser.name}</h1> : <h4>Not Signed in</h4>}
     {currentUser ? <Home currentUser={currentUser} setCurrentUser={setCurrentUser} organisations={organisations}/> : login ? <Login setCurrentUser={setCurrentUser} login={login} setLogin={setLogin}/> : 
     <Signup currentUser={currentUser} allUsers={allUsers} setCurrentUser={setCurrentUser} login={login} setLogin={setLogin}/>}
     {/* <button onClick={() => setLogin(!login)}>ToggleLogin</button> */}
    </div>
  );
}

export default App;
