
import React, {useState, useEffect} from 'react';

function Signup({currentUser, setCurrentUser, allUsers}){
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    function submitEvent(e) {
        e.preventDefault()
        const matchingName = allUsers.find(u => u.name === name)
        if(matchingName === undefined) {
            const user = {
                name: name,
                password: password,
                email_address: email
            }
            fetch('http://localhost:3001/users',{
                method: "POST",
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(user)
            })
            .then(res => {
                if(res.ok){
                    res.json().then(setCurrentUser)
                }
                ;
            })
        } else {
            window.alert("Name already Exists!")
        }
    }

    return(
        <div className="Signup">
            <form>
                <input placeholder="email" onChange={(e) => setEmail(e.target.value)}></input>
                <input placeholder="password" onChange={(e => setPassword(e.target.value))}></input>
                <input placeholder="name" onChange={(e) => setName(e.target.value)}></input>
                <button onClick={(e) => submitEvent(e)}>Create Account</button>
            </form>
        </div>
    )
}

export default Signup