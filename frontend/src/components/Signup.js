import React, { useState, useEffect } from "react";

function Signup({setCurrentUser, allUsers, login, setLogin }) {
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

        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <label>Password Confirmation</label>
        <input
          type="password"
          placeholder="Password Confirmation"
          onChange={(e) => setComPassword(e.target.value)}
        ></input>
      </form>
      <button onClick={(e) => submitEvent(e)}>Create Account</button>
      <div>
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
    </div>
  );
}

export default Signup;
