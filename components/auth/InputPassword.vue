<template>
  <ValidationProvider name="비밀번호" :rules="rules" v-slot="{ errors }">
    <v-text-field
      @input="onInput"
      :value="value"
      v-bind="$attrs"
      :maxlength="$attrs.counter"
      :error-messages="errors"
      :type="type ? 'password' : 'text'"
    >
      <template v-slot:append>
        <v-btn icon small tabindex="-1" @click="type = !type">
          <v-icon>{{ type ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'InputPassword',
  model: {
    prop: 'value',
    event: 'input',
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
    vid: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      type: true,
    }
  },
  methods: {
    onInput(val) {
      this.$emit('input', val)
    },
  },
}
</script>

<style>
</style>