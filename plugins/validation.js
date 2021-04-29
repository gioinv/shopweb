import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Mục bắt buộc'
})

extend('requiredSelect', {
  ...required,
  message: 'Mục bắt buộc'
})
