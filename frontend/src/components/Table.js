

function Table({currentOrg, currentUser, currentOrgShifts}) {

    const renderShifts = currentOrgShifts.map(shift => (
        <tr>
            <th>{shift.user.name}</th>
            <th>{shift.start.toDateString()}</th>
        </tr>
    ))
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
                    <tr>
                        <td>Test Man</td>
                        <td>5/27/2022</td>
                        <td>1:00pm</td>
                        <td>7:00pm</td>
                        <td>30</td>
                        <td>5.5</td>
                        <td>88</td>
                    </tr>
                    {renderShifts}
                </tbody>
            </table>
        </div>
    )
}

export default Table