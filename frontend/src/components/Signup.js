import React, { useState, useEffect } from "react";

function Signup({ currentUser, setCurrentUser, allUsers, login, setLogin }) {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [comPassword, setComPassword] = useState();
  const [email, setEmail] = useState();

  function submitEvent(e) {
    e.preventDefault();
    const matchingName = allUsers.find((u) => u.name === name);
    if (matchingName === undefined && comPassword == password) {
      const user = {
        name: name,
        password: password,
        email_address: email,
      };
      fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.ok) {
          res.json().then(setCurrentUser);
        }
      });
    } else if (comPassword !== password) {
      window.alert("Password Confirmation does not match!");
    } else {
      window.alert("Name already Exists!");
    }
  }

  return (
    <div className="Signup">
      <form>
        <h2>Signup</h2>

        <label for="email">Email</label>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label for="name">Name</label>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label for="password">Password</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <label for="password">Password Confirmation</label>
        <input
          type="password"
          placeholder="Password Confirmation"
          onChange={(e) => setComPassword(e.target.value)}
        ></input>
      </form>
      <button onClick={(e) => submitEvent(e)}>Create Account</button>
      {login ? (
        <a className="bottext" onClick={() => setLogin(!login)}>
          Signup
        </a>
      ) : (
        <a className="bottext" onClick={() => setLogin(!login)}>
          Login
        </a>
      )}
    </div>
  );
}

export default Signup;
