<template>
  <v-text-field
    ref="field"
    :value="value"
    @input="onInput"
    v-bind="$attrs"
    :maxlength="$attrs.counter"
    :error-messages="errMsg"
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
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

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
  props: {
    value: String,
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
        this.VALIDATE_TRUE()
      } else {
        this.errMsg = `중복된 ${this.$attrs.label} 입니다.`
        this.VALIDATE_FALSE()
      }
    },
  },
}
</script>

<style>
</style>