import React, { useEffect, useState } from "react";
import "./tetramino.scss";
import { AccessAlarm, CheckCircle, Delete } from "icons";
import moment from "moment";
import axios from "utils/axios";
import { deleteSchedule } from "routes";
import toastr from "utils/toastr";
import { refreshTetraminos } from "utils/store/slices/tetraminosSlice";
import { useDispatch } from "react-redux";
import { refreshActivities } from "utils/store/slices/activities-slice";

export default function Tetramino({
  progress = 0,
  large,
  status,
  title,
  start,
  end,
  id,
  today
}) {

  const [completed, setCompleted] = useState(status)
  const [percentage, setPercentage] = useState(progress)
  const format = "HH:mm"
  const startMoment = moment(start, format)
  const endMoment = moment(end, format)
  const dispatch = useDispatch()

  const deleteEvent = () => {
    axios.delete(deleteSchedule(id)).then(({data}) => {
      if(data.success === false) {
        toastr.warning(data.message)
        return
      }
      refreshActivities(dispatch)
      refreshTetraminos(dispatch)
    }).catch(err => toastr.error(err))
  }

  const clickedEvent = () => {

  }

  const calculatePercentageEvent= () => {
    const current = moment()
    const total = endMoment._d.getTime() - startMoment._d.getTime()
    const offset = current._d.getTime() - startMoment._d.getTime()
    const percent = ( offset / total )
    
    return ( 
      percent <= 0 ? 
        0 :
        (parseFloat( percent )) * 100  
    ) 
  }

  useEffect(() => {
    if(today) {
      if (percentage < 100) {
        const interval = setInterval(() => {
          setPercentage(calculatePercentageEvent())
        }, 1000)
        return () => clearInterval(interval)
      } else {
        setTimeout(() => {
          refreshTetraminos(dispatch)
        }, 1000);
        setCompleted(true)
      }
    }
  }, [percentage])

  return (
    <div className={`tetramino-container ${large ? "large fs-24" : "fs-18"}`} >
      <div className={`tetramino-percentage ${completed ? 'complete' : ''}`} style={{
        width: `${percentage}%`
      }} >
      </div>
      <div className={`glass-container tetramino`} >
        { !completed ? 
          <AccessAlarm className="warning icon"/> :
          <CheckCircle className="success icon"/>
        }
        <div className="icon"></div>
        <p className="title">{title}</p>
        <p className="hour">
          De {start} a {end}
        </p>
        <Delete className="error icon delete" onClick={deleteEvent}/>
      </div>
    </div>
  );
}
