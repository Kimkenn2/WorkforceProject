import React, { useState, useEffect } from "react";

function EditProfile({ currentUser, setCurrentUser, allUsers, setEditSelf, login, setLogin }) {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [comPassword, setComPassword] = useState();
  const [email, setEmail] = useState();

  function submitEvent(e) {
    e.preventDefault();
    const matchingName = allUsers.find((u) => u.name === name);
    if ((matchingName === undefined || name == currentUser.name) && comPassword == password) {
      const user = {
        name: name,
        password: password,
        email_address: email,
      };
      fetch(`http://localhost:3001/users/${currentUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.ok) {
          res.json().then(setCurrentUser);
        }
        setEditSelf(false)
      });
    } else if (comPassword !== password) {
      window.alert("Password Confirmation does not match!");
    } else {
      window.alert("Name already Exists!");
    }
  }

  return (
    <div className="EditProfile">
    <div className="Signup">
      <form>
        <h2>Edit Profile</h2>

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
      <button onClick={(e) => submitEvent(e)}>Confirm</button>
    </div>
    </div>
  );
}

export default EditProfile