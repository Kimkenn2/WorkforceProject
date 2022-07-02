import Organisations from "./Organisations";
import React, { useState, useEffect } from "react";
import BelongsToOrganisation from "./BelongsToOrganisation";

function Home({
  currentUser,
  setCurrentUser,
  organisations,
  setOrganisations,
}) {
  const [newOrgName, setNewOrgName] = useState("");
  const [newHourlyRate, setNewHourlyRate] = useState("");

  function createandjoin() {
    let newOrgId = {}
    const org = {
      name: newOrgName,
      hourly_rate: Number(newHourlyRate),
    };
    fetch("http://localhost:3001/organisations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(org),
    })
      .then((resp) => resp.json())
      .then(data => newOrgId = {
        organisation_id: data.id
      })
      .then(() => {
        fetch("http://localhost:3001/organisations")
    .then(resp => resp.json())
    .then(orgs => setOrganisations(orgs))
    .then(() => {
        fetch(`http://localhost:3001/users/${currentUser.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newOrgId),
        })
        .then((resp) => resp.json())
        .then((data) => setCurrentUser(data));
    }
            );
        })
  }

  const renderOrgs = organisations.map((org) => (
    <li>
      <Organisations
        org={org}
        setOrganisations={setOrganisations}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </li>
  ));
  const noOrg = (
    <div>
      <p>
        You aren't a member of any organisations. Join an existing one or create
        a new one.
      </p>
      <h2>Organisations</h2>
      <ul className="orglist">{renderOrgs}</ul>
      <h2>Create Organisation</h2>
      <div>
        <label>Name: </label>
        <input
          placeholder="Orgainsation Name"
          onChange={(e) => setNewOrgName(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Hourly Rate: $</label>
        <input
          placeholder="0.00"
          onChange={(e) => setNewHourlyRate(e.target.value)}
        ></input>
      </div>
      <button onClick={() => createandjoin()}>Create and Join</button>
    </div>
  );
  return (
    <div className="home">{currentUser.organisation_id ? <BelongsToOrganisation setCurrentUser={setCurrentUser} currentUser={currentUser} organisations={organisations} setOrganisations={setOrganisations}/> : noOrg}</div>
  );
}

export default Home;
