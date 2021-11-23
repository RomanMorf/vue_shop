<template>
  <div>
    <h1>Orders page</h1>
    <button>Показать новые заказы</button>
    <button>Показать обработанные заказы</button>
    <Loader v-if="loading"/>
    <div v-else>
      <div class="field">
        <h3>Новые заказы</h3>
      <table class="admin">
        <tbody>
          <tr>
            <td>#</td>
            <td >Date Create</td>
            <td >Email</td>
            <td >Tel</td>
          </tr>
          <tr v-for="(order, index) in ORDERS_NEW" :key="order.id">
            <td >{{ index + 1 }}</td>
            <td >{{ order.dateCreated }}</td>
            <td>{{ order.userEmail }}</td>
            <td>{{ order.userTel }}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="field">
        <h3>Заказы в обработке</h3>
        <table class="admin">
          <tbody>
            <tr>
              <td>#</td>
              <td >Date Create</td>
              <td >Email</td>
              <td >Tel</td>
            </tr>
            <tr v-for="(order, index) in ORDERS_IN_PROCESS" :key="order.id">
              <td >{{ index + 1 }}</td>
              <td >{{ order.dateCreated }}</td>
              <td>{{ order.userEmail }}</td>
              <td>{{ order.userTel }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="field">
        <h3>Выполненые заказы</h3>
        <table class="admin">
          <tbody>
            <tr>
              <td>#</td>
              <td >Date Create</td>
              <td >Email</td>
              <td >Tel</td>
            </tr>
            <tr v-for="(order, index) in ORDERS_DONE" :key="order.id">
              <td >{{ index + 1 }}</td>
              <td >{{ order.dateCreated }}</td>
              <td>{{ order.userEmail }}</td>
              <td>{{ order.userTel }}</td>
            </tr>
          </tbody>
        </table>
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
      newOrders: [],
    }
  },
  methods: {
    calcTotalSum(arr) {
      totaSum = 0
      arr.forEach(el => {
        console.log(el, 'el');
      });
      return totaSum
    }
  },
  computed: {
    ...mapGetters(['ORDERS_NEW', 'ORDERS_IN_PROCESS', 'ORDERS_DONE']),
  },
  async mounted() {
    await this.$store.dispatch('FETCH_ORDERS_NEW')
    await this.$store.dispatch('FETCH_ORDERS_IN_PROCESS')
    await this.$store.dispatch('FETCH_ORDERS_DONE')
    this.loading = false
  },
}
</script>

