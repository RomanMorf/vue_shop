<template>
  <div class="center">

    <Loader v-if="loading"/>

    <div v-if="!loading">
      <h1>This is an a parsonal cabinet page</h1>
      <h2>Under development</h2>
      <p>{{ INFO.name }}</p>
      <p>{{ INFO.email }}</p>
      <p>{{ INFO.tel }}</p>
      <p>Role: {{ INFO.role }}</p>
      <br>

      <div class="center" v-if="INFO.role === 'admin'" >
        <p>Вашу ровень доступа {{ INFO.role  }}</p>
        <button @click="$router.push('/admin')">Войти в дамин панель</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Cabinet',
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'INFO',
    ]),
  },
  async mounted() {
    await this.$store.dispatch('FETCH_INFO')
    this.loading = false
  },
}
</script>
