<template>
  <div>
    <h1>Orders page</h1>
    <button>Показать новые заказы</button>
    <button>Показать обработанные заказы</button>
    <Loader v-if="loading"/>
    <div v-else>
      <div class="field">
        <h3>Новые заказы</h3>
        <p v-for="item in NEW_ORDERS" :key="item.id">{{ item.id }}</p>
      </div>
      <div class="field">
        <h3>Отбработанные заказы</h3>
        <p v-for="item in ORDERS" :key="item.id">{{ item.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters(['ORDERS', 'NEW_ORDERS']),
  },
  async mounted() {
    await this.$store.dispatch('FETCH_ORDERS')
    await this.$store.dispatch('FETCH_NEW_ORDERS')
    this.loading = false
  },
}
</script>

