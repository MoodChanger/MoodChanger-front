<template>
  <v-app-bar white hide-on-scroll>
    <v-btn to="/" text color="#43A047">{{ title }}</v-btn>
    <v-spacer></v-spacer>
    <MoodUser />
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import MoodUser from '@/components/layout/MoodUser'

export default {
  name: 'MoodTitle',
  components: { MoodUser },
  computed: {
    ...mapState({
      title: (state) => state.state.title,
    }),
  },
}
</script>

<style>
</style>