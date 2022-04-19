<template>
  <ValidationProvider name="이메일" :rules="rules" v-slot="{ errors }">
    <v-text-field
      @input="onInput"
      :value="value"
      v-bind="$attrs"
      :maxlength="$attrs.counter"
      :error-messages="errors"
      :success-messages="successMsg"
    >
      <template v-slot:append>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              icon
              small
              tabindex="-1"
              @click="check"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
          ID 중복검사
        </v-tooltip>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'InputId',
  data() {
    return {
      errMsg: '',
      successMsg: '',
      checkForm: {
        email: '',
      },
    }
  },
  components: {
    ValidationProvider,
  },
  props: {
    value: String,
    rules: {
      type: [Object, String],
      default: '',
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  methods: {
    ...mapActions('modules/user', ['duplicateCheck']),
    ...mapMutations('modules/user', ['VALIDATE_TRUE', 'VALIDATE_FALSE']),
    onInput(val) {
      this.errMsg = ''
      this.successMsg = ''
      this.checkForm.email = val
      this.$emit('input', val)
    },
    async check() {
      const checkId = await this.duplicateCheck(this.checkForm)
      console.log('InputId ', checkId)

      // false : 중복 O, true : 중복 X
      if (checkId) {
        this.successMsg = `사용가능한 ${this.$attrs.label} 입니다.`

        console.log('사용 가능한 아이디')

        this.VALIDATE_TRUE()
      } else {
        // :error-messages="errors"에 에러 담거나 Toast로 바꾸기
        alert('중복 아이디 입니다.')

        console.log('중복 아이디')

        this.VALIDATE_FALSE()
      }
    },
  },
}
</script>

<style>
</style>