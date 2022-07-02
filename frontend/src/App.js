import './App.css';
import React, {useState, useEffect} from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import NavBar from './components/NavBar';
import EditProfile from './components/EditProfile';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [allUsers, setAllUsers] = useState([])
  const [login, setLogin] = useState(true)
  const [organisations, setOrganisations] = useState([])
  const [editSelf, setEditSelf] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3001/users")
    .then(resp => resp.json())
    .then(users => setAllUsers(users))
  },[])

  useEffect(() => {
    fetch("http://localhost:3001/organisations")
    .then(resp => resp.json())
    .then(orgs => setOrganisations(orgs))
  },[])
  return (
    <div className="App">
      <span>
      {editSelf ? <EditProfile allUsers={allUsers} currentUser={currentUser} setEditSelf={setEditSelf}/> : <></>}
      </span>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} editSelf={editSelf} setEditSelf={setEditSelf}/>
     {currentUser ? <Home currentUser={currentUser} setCurrentUser={setCurrentUser} organisations={organisations} setOrganisations={setOrganisations}/> : login ? <Login setCurrentUser={setCurrentUser} login={login} setLogin={setLogin}/> : 
     <Signup currentUser={currentUser} allUsers={allUsers} setCurrentUser={setCurrentUser} login={login} setLogin={setLogin}/>}
    </div>
  );
}

export default App;
