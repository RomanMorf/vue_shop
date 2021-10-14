<template>
  <div>
    <div class="product_container">
      <h2 class="product_title">Товары</h2>
      <button class="product_btn" @click="fetchProducts">
        Загрузить список товаров
      </button>
      <button class="product_btn" @click="showModal = !showModal">
        Открыть модалку
      </button>
      <div
        class="product_card"
        v-for="(pruduct, index) in PRODUCTS"
        :key="index"
        >
        <section>
          <img class="card_img" v-if="pruduct.img" :src="pruduct.img[0]" />
          <img
            class="card_img"
            v-if="!pruduct.img"
            src="@/assets/img/no-image.jpg"
          />
        </section>
        <section>
          <p class="card_text">Title: {{ pruduct.title }}</p>
          <p class="card_text">Price: {{ pruduct.price }}</p>
          <p class="card_text">Category: {{ pruduct.categoryName }}</p>
        </section>
        <div class="card_buttons">
          <button @click.prevent="$router.push(`/edit/${pruduct.id}`)">Edit</button>
          <button @click.prevent="confirmDelete(pruduct.id, pruduct.title)">Delete</button>
        </div>
      </div>
    </div>

    <Modal 
      v-show="showModal"
      @close="closeModal"
    >
      <template v-slot:header>
        <h5 class="center">ВНИМАНИЕ !!!</h5>
        <p class="big_title">Вы уверенны, что хотите удалить товар - {{ titleForDel }} ?!</p>
      </template>
      <template v-slot:footer>
        <button @click="Confirm">Confirm</button>
        <button @click="closeModal">Decline</button>
      </template>
    </Modal>

    <FormAddProduct></FormAddProduct>

    <FormAddCategory></FormAddCategory>
  </div>
</template>

<script>
import FormAddProduct from '@/components/Admin/FormAddProduct'
import FormAddCategory from '@/components/Admin/FormAddCategory'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showModal: false,
      idForDel: '',
      titleForDel: '',
    }
  },
  components: {
    FormAddProduct,
    FormAddCategory,
  },
  methods: {
    Confirm() {
      console.log(this.idForDel, '... удален ');
      this.showModal = false

    },
    confirmDelete(id, title) {
      this.idForDel = id
      this.titleForDel = title
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    fetchProducts() {
      this.$store.dispatch('FETCH_PRODUCTS')
    },
    productEdit(id) {
      console.log(id, 'id for edit')
    },
    productDelete(id) {
      console.log(id, 'id for delete')
    },
  },
  computed: {
    ...mapGetters(['INFO', 'PRODUCTS']),
  },
  mounted() {
    this.$store.dispatch('FETCH_PRODUCTS')
  },
}
</script>

<style scoped lang="scss">
.product {
  &_container {
    padding: 5px;
    margin: 10px;
  }
  &_card {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
.card {
  &_img {
    width: 200px;
    margin-right: 20px;
  }
  &_buttons {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}

</style>
