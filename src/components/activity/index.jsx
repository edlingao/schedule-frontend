import React, { useState } from "react";
import {
  CheckCircle,
  RadioButtonUnchecked
} from 'icons'

import './activity.scss'

export default function Activity({checked, title}) {
  const [completed, setComplete] = useState(checked)

  const toggleComplete = () => setComplete(!completed)

  return(
    <div className="glass-container activity-todo">
      { completed ?
          <CheckCircle className="success check" onClick={toggleComplete} /> :
          <RadioButtonUnchecked className="warning check" onClick={toggleComplete} />
      }
      <p className="title fs-18 fc-white">{title}</p>
    </div>
  )
}