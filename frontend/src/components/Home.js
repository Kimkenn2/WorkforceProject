import Organisations from "./Organisations"

function Home({currentUser, setCurrentUser, organisations}){
    const renderOrgs = organisations.map(org =>
        <li><Organisations org={org}/></li>
        )

    //    function noOrg() {
    //      if(currentUser.organisation_id == false){
    //         return(
    //         <div>
    //              <p>You aren't a member of any organisations. Join an existing one or create a new one.</p>

    //              <h2>Organisations</h2>
    //         <ul>
    //             {renderOrgs}
    //         </ul>
    //         </div>
    //     )}}
    const noOrg = (
        <div>
             <p>You aren't a member of any organisations. Join an existing one or create a new one.</p>
             <h2>Organisations</h2>
            <ul className="orglist">
                {renderOrgs}
            </ul>
        </div>
    )
    return (
        <div>
            {currentUser.organisation_id ? <a></a> : noOrg}
        </div>
    )
}

export default Home