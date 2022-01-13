import axios from '../../utils/axios'
import { login } from '../../routes'

export const loginEvent = (e) => {
  e.preventDefault()
  const form = new FormData(e.target)
  const formData = Object.fromEntries(form.entries())
  console.log(login)
  axios.post(login, formData).then( data => {
    console.log(data)
  })
}