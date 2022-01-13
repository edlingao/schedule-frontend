import axios from '../../utils/axios'
import { register } from '../../routes'

export const registerEvent = (e) => {
  e.preventDefault()
  const form = new FormData(e.target)
  const formData = Object.fromEntries(form.entries())
  console.log(register)
  axios.post(register, formData).then( data => {
    console.log(data)
  })
}