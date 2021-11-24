<template>
  <div class="orders">
    <h1>Orders page</h1>
    <Loader v-if="loading"/>
    <div v-else>
      <!-- Новые заказы -->
      <div class="orders_section">
        <h3 class="orders_title" @click="showNewOrders = !showNewOrders" :class="{active: showNewOrders}">Новые заказы</h3>
        <div class="table_wrapper" :class="{active: showNewOrders}">
          <table class="admin">
            <tbody>
              <tr>
                <td>#</td>
                <td >Date Create</td>
                <td >Email</td>
                <td >Tel</td>
              </tr>
              <tr v-for="(order, index) in ORDERS_NEW" :key="order.id" @click="getCurrentOrder('new', order.id)">
                <td >{{ index + 1 }}</td>
                <td >{{ order.dateCreated | date('date') }} <br>{{ order.dateCreated | date('time') }}</td>
                <td>{{ order.userEmail }}</td>
                <td>{{ order.userTel }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Заказы в обработке -->
      <div class="orders_section">
        <h3 class="orders_title" @click="showPrecessedOrders = !showPrecessedOrders" :class="{active: showPrecessedOrders}">Заказы в обработке</h3>
        <div class="table_wrapper" :class="{active: showPrecessedOrders}">
          <table class="admin">
            <tbody>
              <tr>
                <td>#</td>
                <td >Date Processed</td>
                <td >Email</td>
                <td >Tel</td>
              </tr>
              <tr v-for="(order, index) in ORDERS_IN_PROCESS" :key="order.id" @click="getCurrentOrder('processed', order.id)">
                <td >{{ index + 1 }}</td>
                <td >{{ order.dateProcessed | date('date') }}<br>{{ order.dateProcessed | date('time') }}</td>
                <td>{{ order.userEmail }}</td>
                <td>{{ order.userTel }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Выполненые заказы -->
      <div class="orders_section">
        <h3 class="orders_title" @click="showDoneOrders = !showDoneOrders" :class="{active: showDoneOrders}">Выполненые заказы</h3>
        <div class="table_wrapper" :class="{active: showDoneOrders}">
          <table class="admin">
            <tbody>
              <tr>
                <td>#</td>
                <td >Date Done</td>
                <td >Email</td>
                <td >Tel</td>
              </tr>
              <tr v-for="(order, index) in ORDERS_DONE" :key="order.id" @click="getCurrentOrder('done', order.id)">
                <td >{{ index + 1 }}</td>
                <td >{{ order.dateDone | date('date') }}<br>{{ order.dateDone | date('time') }}</td>
                <td>{{ order.userEmail }}</td>
                <td>{{ order.userTel }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Modal v-if="showModal" @close="showModal = !showModal"> <!-- Модальное окно -->
      <template v-slot:header>
        <h3 class="center">Карта заказа</h3>
      </template>
      <template v-slot:content v-if="currentOrder">
        <p>Заказ создан: {{ currentOrder.dateCreated | date('datetime') }}</p>
        <p v-if="currentOrder.dateLastModified">Последнее изменение: {{ currentOrder.dateLastModified | date('datetime') }}</p>
        <p v-if="currentOrder.dateProcessed">Принят в обработку: {{ currentOrder.dateProcessed | date('datetime') }}</p>
        <p v-if="currentOrder.dateDone">Выполнен: {{ currentOrder.dateDone | date('datetime') }}</p>
        <br>
        <p>{{ currentOrder.userEmail }}</p>
        <p>{{ currentOrder.userName }}</p>
        <p>{{ currentOrder.userTel }}</p>
        <p>{{ currentOrder.userComment }}</p>
        <br>
        <div class="flex-wrap">
          <div v-for="product in currentOrder.orderList" :key="product.id">
            <p>Название: {{ product.title }}</p>
            <p>Кол-во: {{ product.count }}</p>
            <p>Цена: {{ product.price }}</p>
            <p><img class="img" :src="product.img[0]" alt=""></p>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="modal_btn admin_bg admin_bg" v-if="currentStatus === 'new'" @click="switchOrderCategory('processed')" >Переместить на стадию в обработке</button>
        <button class="modal_btn admin_bg admin_bg" v-if="currentStatus === 'processed'" @click="switchOrderCategory('done')">Переместить на стадию в выполнен</button>
        <button class="modal_btn admin_bg admin_bg error" v-if="currentStatus === 'done'" @click="switchOrderCategory('new')" >Восстановить, как НОВЫЙ</button>
        <button class="modal_btn admin_bg admin_bg warning" @click="deleteOrder">Удалить</button>
        <button class="modal_btn admin_bg admin_bg" @click="showModal = false">Отмена</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: true,

      showNewOrders: false,
      showPrecessedOrders: false,
      showDoneOrders: false,

      showModal: false,
      currentOrder: null,
      currentOrderId: null,
      currentStatus: null,
    }
  },
  methods: {
    async getCurrentOrder(category, id) {
      this.loading = true
      this.currentStatus = null
      this.currentOrder = null
      this.currentOrderId = null

      try {
        const order = {category, id}
        this.currentOrderId = id
        this.currentStatus = category

        this.currentOrder = await this.$store.dispatch('FETCH_ORDER_BY_ID', order)
        this.showModal = true
        this.loading = false

      } catch (error) {
        if (messages[error.code]) {
          this.$showMessage(messages[error.code], 'error')
        }
        throw error
      }
    },
    async switchOrderCategory(newStatus) {
      const currentDate = Date()
      try {
        const orderForCange = {
          order: {
            ...this.currentOrder,
            dateLastModified: currentDate,
          },
          newStatus: newStatus,
          oldStatus: this.currentStatus,
        }
        switch (newStatus) {
          case 'processed':
            orderForCange.order.dateProcessed = currentDate;
            break;

          case 'done':
            orderForCange.order.dateDone = currentDate;
            break;

          default:
            break;
        }
        this.$store.dispatch('CHANGE_ORDER_STATUS', orderForCange)
        this.$showMessage('Статус заказа успешно изменен', 'success')
        this.$store.dispatch('DELETE_ORDER_BY_ID', {status: this.currentStatus, id: this.currentOrderId})
        this.showModal = false

      } catch (error) {
        if (messages[error.code]) {
          this.$showMessage(messages[error.code], 'error')
        }
        throw error
      }
    },
    async deleteOrder() {
      this.loading = true
      await this.$store.dispatch('DELETE_ORDER_BY_ID', {status: this.currentStatus, id: this.currentOrderId})
      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['ORDERS_NEW', 'ORDERS_IN_PROCESS', 'ORDERS_DONE']),
  },
  async mounted() {
    await this.$store.dispatch('FETCH_ORDERS_NEW')
    await this.$store.dispatch('FETCH_ORDERS_IN_PROCESSED')
    await this.$store.dispatch('FETCH_ORDERS_DONE')
    this.loading = false
  },
}
</script>

<style scoped lang="scss">

.img {
  max-width: 100px;
  max-height: 100px;
}
.table_wrapper{
  height: 0px;
  transition: all .5s ease;
  overflow-x: hidden;
  overflow-y: auto;

  &.active {
    height: 500px;
    transition: all .5s ease;
  }
}
.orders{
  &_title {
    cursor: pointer;
    position: relative;
    display: inline-block;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -25px;
      width: 24px;
      height: 24px;
      background-image: url(../../assets/img/expand_more_black_24dp.svg);
      transition: all .5s ease;
    }
    &.active::after {
      transform: rotate(180deg);
      transition: all .5s ease;
    }
  }
}
</style>
