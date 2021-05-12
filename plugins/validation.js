import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Mục bắt buộc'
})

extend('email', {
  ...email,
  message: 'Email không hợp lệ'
})

extend('requiredSelect', {
  ...required,
  message: 'Mục bắt buộc'
})
