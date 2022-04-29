import { required, email, max, regex, min, confirmed } from 'vee-validate/dist/rules'
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
  message: '비밀번호는 영문,숫자,특수문자의 조합으로 이루어져야 합니다.',
})
extend('confirmed', {
  ...confirmed,
  message: '비밀번호가 일치하지 않습니다.',
})

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: '비밀번호가 일치하지 않습니다.'
});

