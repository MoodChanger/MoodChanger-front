<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card max-width="400" width="100%" elevation="10">
      <v-toolbar>{{ title }} </v-toolbar>

      <v-tabs v-model="tabs">
        <v-tab v-for="(item, index) in items" :key="index" style="flex: 1">{{
          item
        }}</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <ModifyUserInfo @updateUser="updateUser($event)" />
          </v-tab-item>
          <v-tab-item>
            <RemoveUser @removeUser="removeUser($event)" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModifyUserInfo from '@/components/auth/ModifyUserInfo'
import RemoveUser from '@/components/auth/RemoveUser'

export default {
  name: 'ModifiedUserInfo',
  components: {
    ModifyUserInfo,
    RemoveUser,
  },
  data() {
    return {
      tabs: 0,
      items: ['회원정보 수정', '회원 탈퇴'],
    }
  },
  computed: {
    ...mapState({
      title: (state) => state.state.title,
    }),
  },
  methods: {
    ...mapActions('modules/user', ['updateUser']),
    ...mapActions('modules/user', ['removeUser']),
  },
}
</script>

<style>
</style>