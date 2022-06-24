import './App.css';
import React, {useState, useEffect} from 'react';
import Signup from './components/Signup';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [authenticated, setAuthenticated] = useState(false);

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
     <Signup />
    </div>
  );
}

export default App;
