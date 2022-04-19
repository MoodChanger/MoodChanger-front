import { required, email, max, regex, min } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

extend('required', {
  ...required,
  message: '{_field_}은 필수 입력사항입니다.',
})

extend('max', {
  ...max,
  message: '최대 {length}글자까지 적을 수 있습니다.',
})
extend('min', {
  ...min,
  message: '최소 8글자 이상 적으셔야 합니다.',
})

extend('email', {
  ...email,
  message: '잘못 입력된 이메일 주소 입니다',
})

extend('regex', {
  ...regex,
  message: '{_field_}에 적합하지 않습니다.',
})
