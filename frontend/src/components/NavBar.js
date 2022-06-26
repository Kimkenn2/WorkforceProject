import React from "react";


function NavBar({currentUser, setCurrentUser, isLoggedIn}) {
    return (
        <div className="mainNavDiv">
        {currentUser ? <h3>Welcome {currentUser.name}</h3> : <h4>Not Signed in</h4>}
            
        </div>
    )
}

export default NavBar;