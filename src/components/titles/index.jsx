import React from "react"
import { selectType } from "./events"
import './titles.scss'

export default function Title(props) {
  const {type, large} = props
  const {title, highlight} = selectType(props)
  return (
    <div className="title-conatainer">
      {
        type !== 'onProgress' ?
          <p className="fs-18">{title} <b className="highlight">{highlight}</b></p>:
          <div className={`${large ? 'fs-24' : 'fs-18'} progress`}>
            <p className="title">{title}</p>
            <p><b className="highlight">{highlight}</b></p>
          </div>
      }
    </div>
  )
}