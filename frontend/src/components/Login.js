

import React, {useState, useEffect} from 'react';

function Login (){
    return(
        <div className='Signup'>
            <form>
                <h2>Login</h2>
                <label for="email">Email</label>
                <input type="text" placeholder='Email' ></input>

                <label for="password">Password</label>
                <input type="password" placeholder='Password'></input>
            </form>
        </div>
    )
}

export default Login