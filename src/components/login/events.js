import axios from '../../utils/axios'
import { login as loginRoute  } from '../../routes'
import toastr from '../../utils/toastr' 

export const loginEvent = (e, formRef, setToken) => {
  
  e.preventDefault()
  const form = new FormData(formRef.current)
  const formData = Object.fromEntries(form.entries())
  axios.post(loginRoute, formData).then( ({data}) => {
    if( data.token ) {
      setToken(data.token)
    }
  }).catch(err => toastr.error(err))
}