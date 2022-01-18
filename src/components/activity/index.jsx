import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  RadioButtonUnchecked,
  Edit,
  RemoveCircle,
} from 'icons'

import './activity.scss'
import axios from "utils/axios";
import toastr from "utils/toastr";
import { editTask } from "routes";
import { useDispatch } from "react-redux";
import {  refreshActivities, setTodayActivities } from "utils/store/slices/activities-slice"


export default function Activity({status, title, expand, id, onChange}) {
  const [completed, setComplete] = useState(status)
  const [edit, setEdit] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const inputRef = useRef()
  const dispatch = useDispatch()

  const toggleComplete = () => {
    setComplete(!completed)
    editActivity({status: !completed})
  }

  const editTitleEvent = () => {
    editActivity({title: editedTitle})
  }
  const showAndFocusEditInput = () => {
    setEdit(true)
    inputRef.current.value = editedTitle
    setTimeout(() => inputRef.current.focus(), 20)
  }

  const editActivity = ({title, status}) => {
    setEdit(false)
    axios.put(editTask(id), {new_title: title, new_status: status}).then(({data}) => {
      if(data.errors) {
        toastr.warning(data.message)
        return
      }
      dispatch(setTodayActivities([]))
      refreshActivities(dispatch)
    }).catch(err => {
      console.error(err)
      toastr.error(err)
    })
  }

  return(
    <div className={`glass-container activity-todo ${expand && 'expand'}`}>
      { completed ?
          <CheckCircle className="success check" onClick={toggleComplete} /> :
          <RadioButtonUnchecked className="warning check" onClick={toggleComplete} />
      }
      <div className="title-section">
        <input
          ref={inputRef}
          type="text"
          className={`invisible-input fs-18 fc-white ${!edit && 'invisible'}`}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={() => editTitleEvent()}
        />
        <p className={`title fs-18 fc-white ${edit && 'invisible'}`}>{editedTitle}</p>
      </div>
      { expand &&
          <div className="edit-section">
            <Edit className="icon warning" onClick={showAndFocusEditInput} />
            <RemoveCircle className="icon error"/>
          </div>
      }
    </div>
  )
}