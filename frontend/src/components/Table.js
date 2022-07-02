import React, {useState} from 'react'
import moment from 'moment'
import BreakLengths from './BreakLengths'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function Table({currentOrg, currentUser, currentOrgShifts, organisations, setCurrentOrgShifts}) {
    const [newShiftDate, setNewShiftDate] = useState('')
    const [newStartTime, setNewStartTime] = useState('')
    const [newFinishTime, setNewFinishTime] = useState('')
    // const [newBreakLength, setNewBreakLength] = useState('')
    const [tags, setTags] = useState([])
    const [searchName, setSearchName] = useState('')
    const [calendarToggle, setCalendarToggle] = useState(false)
    const [calendarStartDate, setCalendarStartDate] = useState(new Date());
    const [calendarEndDate, setCalendarEndDate] = useState(new Date());

    const onStartDateChange = (newDate) => {
        setCalendarStartDate(newDate);
        console.log(newDate);
    }

    const onEndDateChange = (newDate) => {
        setCalendarEndDate(newDate);
        console.log(newDate);
    }
    
    function searchedEmployees() {
        if(searchName == ''){
            return currentOrgShifts
        } else {
            return currentOrgShifts.filter(shift => shift.user.name.toLowerCase().includes(searchName.toLowerCase()))
        }
    }
    
    
   function searchCalendar() {
       if(calendarToggle == false){
           return searchedEmployees()
       } else {
           return searchedEmployees().filter(shift => new Date(shift.start).getTime() >= calendarStartDate.getTime() && new Date(shift.start).getTime() <= (calendarEndDate.getTime() + 86399000))
       }
   }
    const renderShifts = searchCalendar().map(shift => {
        // console.log(shift, "shift", shift.user.name)
        const rawStartDate = new Date(shift.start)
        // var stillUtc = moment.utc(shift.start).toDate();
        // var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
        // console.log(local, "local")

        //Calculating Total Break Length
        let breakarray = shift.break_length.split(", ").map(Number)
        let sumbreak = breakarray.reduce((a,b) => a+b, 0)
        // console.log(breakarray, "arraay")


        // const rawStartDate = moment(shift.start).format
        // const rawStartDate = moment(shift.start).format()
        const rawFinishDate = new Date(shift.finish)

        // const start_time_hour = rawStartDate.getHours()

        // console.log(start_time_hour)
        // console.log(rawStartDate, "raww")
//         const date = moment.utc().format()
//         console.log(date, "- now in UTC"); 

//         var local = moment.utc(date).local().format();
// console.log(local, "- UTC now to local"); 

// console.log("please work", moment.utc(shift.start).local().format(), "did you work?")

        const start_readable_date = new Date(shift.start).toLocaleDateString()
        const start_time = new Date(shift.start).toLocaleTimeString('en-US',{
            hour: 'numeric',
            minute: 'numeric',
            TimeZone: 'EST',
            hour12: true
        })
        // console.log(start_time)
        const finish_time = new Date(shift.finish).toLocaleTimeString('en-US',{
            hour: 'numeric',
            minute: 'numeric',
            TimeZone: 'EST',
            hour12: true
        })
        const hours_worked = ((((rawFinishDate - rawStartDate)/1000)/60) - sumbreak)/60

        const shift_cost = organisations.find((org) => org.id == currentUser.organisation_id).hourly_rate*hours_worked
        return(
        <tr>
            <td>{shift.user.name}</td>
            <td>{start_readable_date}</td>
            <td>{start_time}</td>
            <td>{finish_time}</td>
            <td>{shift.break_length}</td>
            <td>{Math.round(hours_worked*100)/100}</td>
            <td>{Math.round(shift_cost*100)/100}</td>

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
        let finisharray = newShiftDate.split("/")
        console.log(newStartTime > newFinishTime)
        if(newStartTime[newStartTime.length - 2] > newFinishTime[newFinishTime.length - 2]){
            finisharray[1] = (Number(array[1])+1).toString()
            console.log(finisharray)
        }
        array.unshift(array.pop())
        let formattedStartDate = array.join("-")
        let formattedFinishDate = finisharray.join("-")

        let formattedStartTime = convertTime(newStartTime)
        let formattedFinishTime = convertTime(newFinishTime)
        // if(newStartTime > newFinishTime){
        //     return()
        // }

        const shiftData = {
            user_id: currentUser.id,
            start: new Date(`${formattedStartDate} ${(formattedStartTime)}`),
            finish: new Date(`${formattedFinishDate} ${(formattedFinishTime)}`),
            break_length: tags.join(", ")
        }

        // console.log("test", shiftData)

        fetch("http://localhost:3001/createshift", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shiftData),
    })
    .then(resp => resp.json())
    .then( data => {
        // console.log(data, "data")
    setCurrentOrgShifts([...currentOrgShifts, data])
    }
    )
    setNewShiftDate('')
    setNewStartTime('')
    setNewFinishTime('')
    setTags([])
    }
    return(
        <div className="tableContainer">
            <div>
            <label>Search for Employee: </label>
            <input placeholder='Name' onChange={(e) => setSearchName(e.target.value)}></input>

            </div>
            <button onClick={() => setCalendarToggle(!calendarToggle)}>Search for Dates: </button>
            {calendarToggle ? <div className='calendarContainer'>
            <h4>
                Start Date:
            <Calendar
        onChange={onStartDateChange}
        value={calendarStartDate}
        showNeighboringMonth={true}
        locale={"en-US"}
        className={"calendar"}
     />
            </h4>
            <h4>
                End Date:
                <Calendar
        onChange={onEndDateChange}
        value={calendarEndDate}
        showNeighboringMonth={true}
        locale={"en-US"}
        className={"calendar"}
     />
            </h4>

            </div> : <></>}
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
                        <td><input onChange={(e) => setNewShiftDate(e.target.value)} value={newShiftDate} placeholder={"mm/dd/yyyy"}/></td>
                        <td><input onChange={(e) => setNewStartTime(e.target.value)} value={newStartTime} placeholder={"hh:mm mm"}/></td>
                        <td><input onChange={(e) => setNewFinishTime(e.target.value)} value={newFinishTime} placeholder={"hh:mm mm"}/></td>
                        <td>
                            {/* <input onChange={(e) => setNewBreakLength(e.target.value)} placeholder={"00"} /> */}
                            <BreakLengths tags={tags} setTags={setTags}/>
                            </td>
                        <td colSpan="2"><button onClick={() => createShift()}>Create Shift</button></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => console.log(calendarStartDate, calendarEndDate, "t", calendarEndDate.getTime())}>Calendar</button>
        </div>
    )
}

export default Table