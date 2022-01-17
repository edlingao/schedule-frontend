import { DarkMode, Logout, LightMode, CheckCircle, DateRange, RemoveCircle } from "icons"

export default function selectType(type) {
  let textAndIconObject = {}
  switch(type) {
    case 'dark':
      textAndIconObject = {label: "Dark theme", Icon: DarkMode, color: 'dark'}
      break
    case 'light':
      textAndIconObject = {label: "Light theme", Icon: LightMode, color: 'warning'}
      break
    case 'add':
      textAndIconObject = {label: "Agregar actividad", Icon: CheckCircle, color: 'blue'}
      break
    case 'edit':
      textAndIconObject = {label: "Editar horario", Icon: DateRange, color: 'dark'}
      break
    case 'logout':
      textAndIconObject = {label: "Cerrar sesion", Icon: Logout, color: 'error'}
      break
    default:
      textAndIconObject = {label: "???", Icon: RemoveCircle, color: 'warning'}
  }
  return textAndIconObject
}