<template>
  <div class="center">
    <h1>This is an a parsonal cabinet page</h1>
    <h2>Under development</h2>

    <button @click="getUserData">GetUserData</button>
    <button @click="getUserDataFromState">getUserDataFromState</button>

  </div>
</template>

<script>

export default {
  name: 'Cabinet',
  data() {
    return {
      userInfo: null
    }
  },
  methods: {
    async getUserData() {
      const userInfo = await this.$store.dispatch('GET_USER_DATA')
      console.log(userInfo, 'getUserData');
    },
    getUserDataFromState() {
      const userInfo = this.$store.getters.USER_INFO
      console.log(userInfo, 'getUserDataFromState');
    }
  },
}
</script>

<style scoped lang='scss'>
  
</style> 