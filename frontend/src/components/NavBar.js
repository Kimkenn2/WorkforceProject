import React from "react";


function NavBar({currentUser, setCurrentUser, isLoggedIn}) {
    return (
        <div className="mainNavDiv">
        {currentUser ? <h3>Welcome {currentUser.name}</h3> : <h4>Not Signed in</h4>}
            {currentUser ? <button className="navBarLogoutLink" onClick={ () => window.location.reload()}>Logout</button> : <></>}
        </div>
    )
}

export default NavBar;