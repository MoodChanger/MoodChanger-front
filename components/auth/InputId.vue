<template>
  <v-text-field
    :value="value"
    @input="onInput"
    v-bind="$attrs"
    :maxlength="$attrs.counter"
  />
</template>

<script>
export default {
  name: 'InputId',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: String,
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