<template>
  <v-dialog v-model="modal" persistent max-width="290">
    <template v-slot:activator="{ attrs }">
      <ValidationProvider name="생년월일" :rules="rules" v-slot="{ errors }">
        <v-text-field
          @input="onInput"
          :value="value"
          v-bind="{ ...$attrs, ...attrs }"
          :maxlength="$attrs.counter"
          :error-messages="errors"
        >
          <template v-slot:append>
            <v-btn icon small tabindex="-1" @click="open">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </ValidationProvider>
    </template>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ $attrs.label }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon plain @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-date-picker
        v-model="date"
        no-title
        @input="picker"
        :day-format="dayFormat"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'InputDate',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: String,
    rules: {
      type: [Object, String],
      default: '',
    },
  },
  components: {
    ValidationProvider,
  },
  data() {
    return {
      modal: false,
      date: '',
    }
  },
  methods: {
    onInput(val) {
      this.$emit('input', val)
    },
    open() {
      const pattern = /^\d{4}-\d{2}-\d{2}$/
      this.date = pattern.test(this.value) ? this.value : this.date
      this.modal = true
    },
    close() {
      this.modal = false
    },
    picker() {
      this.onInput(this.date)
      this.close()
    },
    dayFormat(day) {
      if (!this.modal) return
      const arr = day.split('-')
      return Number(arr[arr.length - 1])
    },
  },
}
</script>

<style>
</style>