import React, {useState} from 'react'

function Table({currentOrg, currentUser, currentOrgShifts, organisations, setCurrentOrgShifts}) {
    const [newShiftDate, setNewShiftDate] = useState('')
    const [newStartTime, setNewStartTime] = useState('')
    const [newFinishTime, setNewFinishTime] = useState('')
    const [newBreakLength, setNewBreakLength] = useState('')
     

    const renderShifts = currentOrgShifts.map(shift => {
        const rawStartDate = new Date(shift.start)
        const rawFinishDate = new Date(shift.finish)

        const start_readable_date = new Date(shift.start).toLocaleDateString()
        const start_time = new Date(shift.start).toLocaleTimeString('en-US',{
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
        const finish_time =new Date(shift.finish).toLocaleTimeString('en-US',{
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
        const hours_worked = ((((rawFinishDate - rawStartDate)/1000)/60) - shift.break_length)/60

        const shift_cost = organisations.find((org) => org.id == currentUser.organisation_id).hourly_rate*hours_worked
        return(
        <tr>
            <td>{shift.user.name}</td>
            <td>{start_readable_date}</td>
            <td>{start_time}</td>
            <td>{finish_time}</td>
            <td>{shift.break_length}</td>
            <td>{hours_worked}</td>
            <td>{shift_cost}</td>

        </tr>
    )})

    // function renderShiftsEach() {
    //     for(let i = 0; i < currentOrgShifts.length; i++){
            
    //         return <tr>
    //             <td>{currentOrgShifts[i].user.name}</td>
    //         </tr>
    //     }
    // }
    function convertTime(timeStr) {
        // if(timeStr.length < 8 && timeStr[0] !== "0"){
        //     timeStr = 0 + timeStr
        // }
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
           hours = '00';
        }
        if (modifier.toLowerCase() === 'pm') {
           hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}:00`;
     };

    function createShift() {
        let array = newShiftDate.split("/")
        array.unshift(array.pop())
        let formattedStartDate = array.join("-")

        let formattedStartTime = convertTime(newStartTime)
        let formattedFinishTime = convertTime(newFinishTime)

        // const formattedStartDate = ((newShiftDate.split("/")).unshift(newShiftDate.split("/").pop())).join("-")
        const shiftData = {
            user_id: currentUser.id,
            start: (`${formattedStartDate} ${convertTime(formattedStartDate)}`),
            finish: (`${formattedStartDate} ${convertTime(formattedFinishTime)}`),
            break_length: newBreakLength
        }

        console.log("test", shiftData)

        fetch("http://localhost:3001/createshift", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shiftData),
    })
    .then(resp => resp.json())
    .then( data =>
        // console.log(data)
    setCurrentOrgShifts([...currentOrgShifts, data])
    )
    }
    return(
        <div className="tableContainer">
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Shift Date</th>
                        <th>Start Time</th>
                        <th>Finish Time</th>
                        <th>Break Length (minutes)</th>
                        <th>Hours Worked</th>
                        <th>Shift Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {renderShifts}
                    <tr>
                        <td>{currentUser.name}</td>
                        <td><input onChange={(e) => setNewShiftDate(e.target.value)}/></td>
                        <td><input onChange={(e) => setNewStartTime(e.target.value)}/></td>
                        <td><input onChange={(e) => setNewFinishTime(e.target.value)}/></td>
                        <td><input onChange={(e) => setNewBreakLength(e.target.value)}/></td>
                        <td colspan="2"><button onClick={() => createShift()}>Create Shift</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table