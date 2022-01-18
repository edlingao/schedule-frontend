import React, { useEffect, useState } from "react"
import Day from "./day"
import weekdays from "utils/weekdays"
import MiniSchedule from "./miniSchedule"
import './editSchedule.scss'
import axios from "utils/axios"
import toastr from "utils/toastr"
import { getSchedulesDay } from "routes"
import moment from "moment"

const weekValue = ({
  'sunday': 0,
  'monday': 1,
  'tuesday': 2,
  'wednesday': 3,
  'thursday': 4,
  'friday': 5,
  'saturday': 6,
})


export default function EditSchedule() {
  
  const [daySchedules, setDaySchedules] = useState([])
  const [daySelected, setDaySelected] = useState("sunday")
  
  const checkTodayOrBefore = () => {
    const today = moment()
    const selectedDayValue = weekValue[daySelected]
    return selectedDayValue <= today.day()
  }

  const fillSchedules = (day) => {
    setDaySelected(day)

    axios.get(getSchedulesDay(day)).then(({data})=> {
      if(data.success === false) {
        toastr.warning(data.message)
        return
      }

      setDaySchedules(data[0].activities)

    }).catch(err => toastr.error(err))
  }
  
  const refreshMiniTetraminos = () => {
    fillSchedules(daySelected)
  }

  useEffect(() => {
    fillSchedules(daySelected)
  }, [])

  return (
    <div className="glass-container edit-schedule">
      <div className="header">
        <h1 className="fs-24 fc-main fw-regular">Week schedule</h1>
        <p className="fs-10 fc-main fw-regular">Click a day to see all your activities from that specific day</p>
      </div>
      <div className="days-section">
        {weekdays.map(({label, value}, index) => (
          <Day selected={value === daySelected} day={label} value={value} key={`${index}_schedule_edit`} onClick={(e, value) => fillSchedules(value)}/>
        ))}
      </div>
      <div className="schedule-section">
        {daySchedules.map(({title, start_hour, end_hour, _id}) => (
          <MiniSchedule
            onDelete={refreshMiniTetraminos}
            title={title}
            start={start_hour}
            end={end_hour}
            id={_id}
            key={`${_id}_schedule`}
            todayOrBefore={checkTodayOrBefore()}
            daySelected={daySelected}
          />
        ))}
      </div>
    </div>
  )
}
