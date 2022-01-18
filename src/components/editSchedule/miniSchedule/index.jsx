import React, { useEffect, useRef, useState } from "react"
import {
  AccessAlarm,
  CheckCircle,
  Edit,
  RemoveCircle,
  AddBoxI,
  ExpandMore,
  ExpandLess,
} from 'icons'
import {
  refreshTetraminos
} from 'utils/store/slices/tetraminosSlice'

import {
  createTask,
  deleteSchedule, editSchedule, getTaskByTetramino
} from 'routes'

import axios from 'utils/axios'
import toastr from "utils/toastr"
import moment from "moment"

import './miniSchedule.scss'
import { useDispatch } from "react-redux"
import Activity from "components/activity"
import { refreshActivities, todayActivities } from "utils/store/slices/activities-slice"
import { useSelector } from "react-redux"

export default function MiniSchedule({
  status,
  title,
  start,
  end,
  selected,
  todayOrBefore,
  daySelected,
  id,
  onDelete,
}) {
  
  const [expanded, setExpanded] = useState(false)
  const [editTitle, setEditedTitle] = useState(title)
  const [completed, setCompleted] = useState(status)
  const [showEdit, setShowEdit] = useState(false)
  const todayActivitiesStore = useSelector(todayActivities);
  const [activities, setActivities] = useState(todayActivitiesStore)
  
  const inputRef = useRef()
  const dispatch = useDispatch()

  const calculatePercentageEvent= (startMoment, endMoment) => {  
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

  const deleteEvent = () => {
    axios.delete(deleteSchedule(id)).then(({data}) => {
      if(data.success === false) {
        toastr.warning(data.message)
        return
      }
      refreshTetraminos(dispatch)
      refreshActivities(dispatch)
      onDelete()
    }).catch(err => toastr.error(err))
  }
  
  const showAndFocusEditInput = () => {
    setShowEdit(true)
    inputRef.current.value = editTitle
    setTimeout(() => inputRef.current.focus(), 20)
    
  }

  const createActivity = () => {
    axios.post(createTask(id),{
      title: 'Edit this title'
    }).then(({data}) => {
      if(data.errors) {
        toastr.warning(data.message)
        return
      }

      toastr.success("Tarea creada con exito!")
      getActivitiesOnExpand()
    }).catch(err => toastr.error(err))
  }

  const getActivitiesOnExpand = () => {
    axios.get(getTaskByTetramino(id)).then(({data}) => {
      setActivities(data)
      refreshActivities(dispatch)
    }).catch(err => toastr.error(err))
  }

  const updateTetramino = () => {
    setShowEdit(false)
    axios.put(editSchedule(id), {
      title: editTitle
    }).then(({data}) => {
      if(data.errors) {
        toastr.warning(data.message)
        return
      }
      refreshTetraminos(dispatch);
    }).catch(err => toastr.error(err))
  }

  useEffect(() => {
    const startMoment = moment(start, "HH:mm")
    const endMoment = moment(end, "HH:mm")
    setCompleted(todayOrBefore && calculatePercentageEvent(startMoment, endMoment))
  },[])


  return (
    <div className={`glass-container mini-schedule ${expanded && 'expanded' } ${(selected || expanded)  &&  'select'}`}>
      { !completed
        ? <AccessAlarm className="icon warning"/>
        : <CheckCircle className="icon success" />
      }
      <div className="title-section">
        <input
          ref={inputRef}
          type="text"
          className={`invisible-input fs-18 fc-white ${!showEdit ? 'invisible' : ''}`}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={() => updateTetramino()}
        />
        <p className={`title fc-white fs-18 ${showEdit ? 'invisible' : ''}`} >{editTitle}</p>
      </div>
      <div className="edit-options">
        <Edit className="icon warning" onClick={showAndFocusEditInput}/>
        <RemoveCircle className="icon error" onClick={deleteEvent}/>
        <AddBoxI onClick={createActivity}  className={`icon success ${!expanded && 'invisible' }`}/>
      </div>
      <div className="time">
        <p className="fs-18 fc-white">De <b className="fc-warning highlighted-hour">{start}</b> a <b className="fc-warning highlighted-hour">{end}</b></p>
      </div>
      { expanded 
        ? <ExpandLess className="icon white expando" onClick={() => setExpanded(false)}/>
        : <ExpandMore className="icon white expando" onClick={() => {
            setExpanded(true)
            getActivitiesOnExpand()
          }}/>
      }
      { expanded &&
          <div className="expanded-section">
            {
              daySelected !== moment().format('dddd').toLocaleLowerCase() 
                ? activities.map(({_id, title, status}) => 
                    <Activity
                      id={_id}
                      title={title}
                      status={status}
                      key={`${_id}_edit_form`}
                      onChange={() => {
                        refreshActivities(dispatch)
                      }}
                      expand
                    />)
                : todayActivitiesStore.filter((item) => item.tetramino === id).map(({_id, title, status}) => 
                    <Activity
                      id={_id}
                      title={title}
                      status={status}
                      key={`${_id}_edit_form`}
                      onChange={() => {
                        refreshActivities(dispatch)
                      }}
                      expand
                    />) 
            }
          </div>
      }
    </div>
  )
}