import Organisations from "./Organisations"
import React, {useState, useEffect} from 'react';

function Home({currentUser, setCurrentUser, organisations}){
    const [newOrgName, setNewOrgName] = useState("")
    const [newHourlyRate, setNewHourlyRate] = useState("")
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
            <h2>Create Organisation</h2>
            <div>
                <label>Name: </label>
                <input placeholder="Orgainsation Name" onChange={(e) => setNewOrgName(e.target.value)}></input>
            </div>
            <div>
                <label>Hourly Rate: $</label>
                <input placeholder="0.00" onChange={(e) => setNewHourlyRate(e.target.value)}></input>
            </div>
            <button>Create and Join</button>
        </div>
    )
    return (
        <div>
            {currentUser.organisation_id ? <a></a> : noOrg}
        </div>
    )
}

export default Home