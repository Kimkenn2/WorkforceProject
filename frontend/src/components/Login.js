import React, {useState} from 'react';

function Login ({setCurrentUser, login, setLogin}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(e) {
        e.preventDefault()
       
        const userCreds = {
            email_address: email,
            password: password
        }
        fetch("http://localhost:3001/login", {
            credentials: 'include',
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userCreds),
          })
          .then(resp => resp.json())
          .then((user) => {
              if(user.email_address === undefined) {
                console.log(user)
                  setCurrentUser(undefined)
                  window.alert("Invalid Credentials")
              } else {
              console.log(user);
              setCurrentUser(user);
              setEmail("")
              setPassword("")}
          })

    }
    return(
        <div className='Signup'>
            <form onSubmit={(e) => handleLogin(e)}>
                <h2>Log In</h2>
                <label for="email">Email</label>
                <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>

                <label for="password">Password</label>
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={(e) => handleLogin(e)}>Login</button>
            </form>
            
     {login ? <a className='bottext' onClick={() => setLogin(!login)}>Signup</a> : <a className='bottext'onClick={() => setLogin(!login)}>Login</a>}
     <p className='bottext'>Forgot Password?</p>
        </div>
    )
}

export default Login