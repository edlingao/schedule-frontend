import axios from '../../utils/axios'
import { register } from '../../routes'
import toastr from '../../utils/toastr'

export const registerEvent = (e, formRef, change) => {
  e.preventDefault()
  const form = new FormData(formRef.current)
  const formData = Object.fromEntries(form.entries())
  axios.post(register, formData).then( data => {
    toastr.success("Succesfully registered!")
    change(false)
  }).catch(err => toastr.error(err))
}