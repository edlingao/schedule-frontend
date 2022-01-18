import React, { useState } from "react"
import TimeKeeper from 'react-timekeeper'
import Select from 'react-select'
import axios from "utils/axios"
import toastr from "utils/toastr"
import { postSchedule } from "routes"
import { hideAddForm } from "utils/store/slices/sliceShowForms"

import './addForm.scss'
import { useDispatch } from "react-redux"
import { refreshTetraminos } from "utils/store/slices/tetraminosSlice"
import weekdays from "utils/weekdays"

const customStyles = {
  option: (provided, state) => {
    return({
    ...provided,
      color: 'white',
      padding: 10,
      backgroundColor: state.isFocused ? '#111949' : 'rgba(0,0,0,0)'
    })
  },
  control: (provided, state) => {
    return({
      ...provided,
      backgroundColor: 'rgba(255,255,255,.5)',
      borderRadius: 5,
      border: 0,
    })
  },
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: 'rgba(17, 25, 73, 0.5)',
  })
}

export default function AddActivityForm() {
  const weekDays = weekdays
  const disptatch = useDispatch()
  const [timeStart, setTimeStart] = useState('12:00')
  const [timeEnd, setTimeEnd] = useState('13:00')
  const [showTimeStart, setShowTimeStart] = useState(false)
  const [showTimeEnd, setShowTimeEnd] = useState(false)
  const [selectedWeekDay, setSelectedWeekDay] = useState(weekDays[0])
  const [title, setTitle] = useState("")

  const createTetromino = (e) => {
    e.preventDefault()
    axios.post(postSchedule, {
      week_day: selectedWeekDay.value,
      start_hour: timeStart,
      end_hour: timeEnd,
      title
    }).then(({data}) => {
      if(data.status === false) {
        toastr.warning(data.message)
        return
      }

      disptatch(hideAddForm())
      refreshTetraminos(disptatch)
    }).catch((err) => toastr.error(err))
  }
  return (
    <form className="glass-container create-activity" onSubmit={createTetromino}>
      <label>
        <input
          className="title input"
          type="text"
          placeholder="Escribe un titulo aqui..."
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <Select
          defaultValue={selectedWeekDay}
          options={weekDays}
          styles={customStyles}
          onChange={setSelectedWeekDay}
        />
      </label>
      <div className="time-section">
          <div className="time-picker">
            { showTimeStart && 
                <TimeKeeper
                  time={timeStart}
                  onChange={(data) => setTimeStart(data.formatted24)}
                  onDoneClick={() => setShowTimeStart(false)}
                  switchToMinuteOnHourSelect
                />
            }
            { showTimeEnd && 
                <TimeKeeper
                  time={timeEnd}
                  onChange={(data) => setTimeEnd(data.formatted24)}
                  onDoneClick={() => setShowTimeEnd(false)}
                  switchToMinuteOnHourSelect
                />
            }
          </div>
        <label onClick={() => setShowTimeStart(true)}>
          De{" "}
          <b className="highlight">
            {timeStart}{" "}
          </b>
        </label>
        <label onClick={() => setShowTimeEnd(true)}>
          a {" "}
          <b className="highlight">
            {timeEnd}{" "}
          </b>
        </label>
      </div>
      <div className="footer">
        <button onClick={createTetromino}  type="submit" className="button save-button">Guardar</button>
      </div>
    </form>
  );
}
