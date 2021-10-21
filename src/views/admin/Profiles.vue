<template>
  <div>
    <h1>Profiles page</h1>
    <button @click="fetchUsers">FetchUsers</button>
    <table v-if="users">
      <tbody>
        <tr>
          <td>Name</td>
          <td>Tel</td>
          <td>Email</td>
          <td>Role</td>
        </tr>
        <tr v-for="(user, index) in users" :key="index">
          <td >{{ user.userInfo.name }}</td>
          <td >{{ user.userInfo.tel }}</td>
          <td >{{ user.userInfo.email }}</td>
          <td >{{ user.userInfo.role }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      users: null
    }
  },
  methods: {
    async fetchUsers() {
      this.users = await this.$store.dispatch('FETCH_USERS')
      console.log(this.users, 'this.users');
    }
  },
  computed: {
    ...mapGetters(['USERS']),
  },

}
</script>

<style scoped lang="scss">
table {
  width: 100%;
}

tr {
  margin-bottom: 10px;
  &:first-child {
    font-weight: 700;
  }
  td {
    padding: 10px;
    margin-right: 50px;
  }
}
tr {
  position: relative;
  background-color: rgba(194, 193, 193, 0.1);
  transition: all ease .5s
}
tr:nth-child(odd) {
  background-color: rgba(194, 193, 193, 0.25);
  transition: all ease .5s
}
tr:hover,
tr:nth-child(odd):hover {
  background-color: rgba(194, 193, 193, 0.55);
  transition: all ease .5s
}

</style>
