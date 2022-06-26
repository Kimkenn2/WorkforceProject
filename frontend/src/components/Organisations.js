import React, { useState } from "react";

function Organisations({ org, setOrganisations, currentUser, setCurrentUser }) {
  const [editToggle, setEditToggle] = useState(false);
//   const [staticName, setStaticName] = useState(org.name);
  const [editedName, setEditedName] = useState(org.name);
  const [editedWage, setEditedWage] = useState(org.hourly_rate);

  function onUpdate() {
    let data = {
      name: editedName,
      hourly_rate: editedWage,
    };
    fetch(`http://localhost:3001/organisations/${org.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    // .then(() => {
    //   setStaticName(editedName);
    // });
    .then(resp => resp.json())
    .then(data => setOrganisations(data))
  }

  function onJoin() {
    const data = {
      organisation_id: org.id,
    };
    fetch(`http://localhost:3001/users/${currentUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => setCurrentUser(data));
  }

  return (
    <div>
      {editToggle ? (
        <input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        ></input>
      ) : (
        <span>{org.name} </span>
      )}
      <button className="orgButton" onClick={() => setEditToggle(!editToggle)}>
        Edit{" "}
      </button>
      {editToggle ? (
        <></>
      ) : (
        <button className="orgButton" onClick={() => onJoin()}>
          Join
        </button>
      )}
      {editToggle ? (
        <div>
          <span>
            {/* <label>Name: </label>
                    <input placeholder={org.name} value={editedName} onChange={(e) => setEditedName(e.target.value)}></input> */}

            <label>Hourly Rate</label>
            <input
              placeholder={org.hourly_rate}
              value={editedWage}
              onChange={(e) => setEditedWage(e.target.value)}
            ></input>

            <button
              onClick={() => {
                onUpdate();
                setEditToggle(false);
              }}
            >
              Update
            </button>
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Organisations;
