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
export default {
  name: 'InputId',
  data() {
    return {
      isCheck: false,
      loading: false,
      errMsg: '',
      successMsg: '',
    }
  },
  props: {
    value: String,
    cbCheck: {
      type: Function,
      default: null,
    },
    origin: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  methods: {
    onInput(val) {
      this.isCheck = this.origin ? this.origin === val : !this.cbCheck
      this.errMsg = ''
      this.successMsg = ''
      this.$emit('input', val)
    },
    async check() {
      if (!this.isSend) return

      this.loading = true
      this.errMsg = ''
      this.successMsg = ''
      const data = await this.cbCheck(this.value)

      if (data.cnt === 0) {
        this.successMsg = `사용가능한 ${this.$attrs.label} 입니다.`
        this.isCheck = true
      } else {
        this.errMsg = `중복된 ${this.$attrs.label} 입니다.`
        this.isCheck = false
      }

      this.loading = false
    },
    validate() {
      if (!this.isCheck) {
        this.errMsg = `${this.$attrs.label} 중복검사를 해주세요.`
        this.$refs.field.focus()
      }
      return this.isCheck
    },
  },
  computed: {
    isSend() {
      return !!this.cbCheck && this.$refs.field.errorBucket.length === 0
    },
  },
}
</script>

<style>
</style>