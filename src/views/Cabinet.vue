<template>
  <div class="center">
    <h1>This is an a parsonal cabinet page</h1>
    <h2>Under development</h2>

    <button @click="getUserData">GetUserData</button>

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
      console.log(userInfo, 'userInfo');
    }
  },
}
</script>

<style scoped lang='scss'>
  
</style> 