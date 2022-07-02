import React, { useState, useEffect } from "react";
import Table from "./Table";

function BelongsToOrganisation({
  currentUser,
  organisations,
  setOrganisations,
  setCurrentUser,
}) {
  const [editToggle, setEditToggle] = useState(false);
  const [editedName, setEditedName] = useState(
    organisations.find((org) => org.id == currentUser.organisation_id).name
  );
  const [editedWage, setEditedWage] = useState(
    organisations.find((org) => org.id == currentUser.organisation_id)
      .hourly_rate
  );
  const [currentOrg, setCurrentOrg] = useState(
    organisations.find((org) => org.id == currentUser.organisation_id)
  )
  const [tableToggle, setTableToggle] = useState(false)
  const [currentOrgShifts, setCurrentOrgShifts] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3001/organisations/${currentUser.organisation_id}/shifts`)
    .then(resp => resp.json())
    .then(data => setCurrentOrgShifts(data))
  },[])

  function onSubmitEdit() {
    setEditToggle(false);
    const data = {
      name: editedName,
      hourly_rate: editedWage,
    };
    fetch(
      `http://localhost:3001/organisations/${currentUser.organisation_id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    )
      .then((resp) => resp.json())
      .then((data) => setOrganisations(data));
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
      .then((data) => setCurrentUser(data))
      .then(() => {
        fetch(`http://localhost:3001/shifts/${currentUser.id}`, {
          method: "DELETE"
        })
      })
  }
  return (
    <div>
      <h2>
        {
          organisations.find((org) => org.id == currentUser.organisation_id)
            .name
        }
      </h2>
      <button onClick={() => setTableToggle(!tableToggle)}>View Shifts</button>
      <button onClick={() => setEditToggle(!editToggle)}>Edit</button>
      <button onClick={() => onLeave()}>Leave</button>
      {editToggle ? (
        <div>
          <div>
            <label>Name: </label>
            <input
              onChange={(e) => setEditedName(e.target.value)}
              value={editedName}
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
              value={editedWage}
              onChange={(e) => setEditedWage(e.target.value)}
              placeholder={
                organisations.find(
                  (org) => org.id == currentUser.organisation_id
                ).hourly_rate
              }
            ></input>
          </div>
          <button onClick={() => onSubmitEdit()}>Submit Changes</button>
        </div>
      ) : (
        <></>
      )}
      {tableToggle ? <Table organisations={organisations} currentOrg={currentOrg} currentUser={currentUser} currentOrgShifts={currentOrgShifts} setCurrentOrgShifts={setCurrentOrgShifts}/> : <></>}
    </div>
  );
}

export default BelongsToOrganisation;
