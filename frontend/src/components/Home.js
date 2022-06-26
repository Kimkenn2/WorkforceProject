import Organisations from "./Organisations";
import React, { useState, useEffect } from "react";

function Home({
  currentUser,
  setCurrentUser,
  organisations,
  rerenderOrgs,
  setOrganisations,
}) {
  const [newOrgName, setNewOrgName] = useState("");
  const [newHourlyRate, setNewHourlyRate] = useState("");
  const [editToggle, setEditToggle] = useState(false);

  function createandjoin() {
    const org = {
      name: newOrgName,
      hourly_rate: Number(newHourlyRate),
    };
    fetch("http://localhost:3001/organisations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(org),
    })
      // .then(console.log(res))
      .then((resp) => resp.json())
      // .then(data => returnedOrgData = data)
      .then((resp) => {
        console.log(resp);
        // res.json().then(console.log(res))
        // console.log(res => res.json(), "t")
        const newOrgId = {
          organisation_id: resp.id,
        };
        fetch(`http://localhost:3001/users/${currentUser.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrgId),
        })
          .then((resp) => resp.json())
          .then((data) => setCurrentUser(data));
        // .then
        // console.log(returnedOrgData)
      });
  }

  function onLeave() {
    const data = {
      organisation_id: null,
    };
    fetch(`http://localhost:3001/users/${currentUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => setCurrentUser(data));
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
  const yesOrg = currentUser.organisation_id ? (
    <div>
      <h2>
        {
          organisations.find((org) => org.id == currentUser.organisation_id)
            .name
        }
      </h2>
      <button>View Shifts</button>
      <button onClick={() => setEditToggle(!editToggle)}>Edit</button>
      <button onClick={() => onLeave()}>Leave</button>
      {editToggle ? (
        <div>
          <div>
            <label>Name: </label>
            <input
              placeholder={
                organisations.find(
                  (org) => org.id == currentUser.organisation_id
                ).name
              }
            ></input>
          </div>
          <div>
            <label>Hourly Rate: $</label>
            <input
              placeholder={
                organisations.find(
                  (org) => org.id == currentUser.organisation_id
                ).hourly_rate
              }
            ></input>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
  return (
    <div className="home">{currentUser.organisation_id ? yesOrg : noOrg}</div>
  );
}

export default Home;
