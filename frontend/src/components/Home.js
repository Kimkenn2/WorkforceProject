

function Home({currentUser, setCurrentUser, organisations}){
    return (
        <div>
            <p>Logged in as {currentUser.name}</p>
            {currentUser.organisation_id ? <a></a> : <p>You aren't a member of any organisations. Join an existing one or create a new one.</p>}
        </div>
    )
}

export default Home