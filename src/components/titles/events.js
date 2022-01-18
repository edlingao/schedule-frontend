import moment from "moment"

export const selectType = ({type, today = false, current = false, next = false, tetramineTitle}) => {
  let title = "", highlight = ""
  const todayMoment = moment().day(moment().day())
  const day = today || type === 'activity' ?  todayMoment : todayMoment.add(1, 'd')
  switch(type) {
    case 'schedule':
      title = 'Horario de '
      highlight = day.locale('es').format('dddd DD MMMM')
      break
    case 'onProgress':
      title = current ?
        'Tetramino en progreso ':
          next ? 
            'Tetramino siguiente' :
            'Tetramino anterior'
      highlight = tetramineTitle
      break
    case 'activity':
      title = 'Actividades de '
      highlight = todayMoment.locale('es').format('dddd DD MMMM')
      break
    default:
      title = "Esta demasiado tranquilo...( \"-.-)"
      highlight = ""
  }
  return {title, highlight}
}