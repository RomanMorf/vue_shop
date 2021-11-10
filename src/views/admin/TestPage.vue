<template>
  <div>
    <div class="product_container">
      <div class="search">
        <p>{{ search }}</p> <br>
        <div class="search-wrapper">
          <input type="text" v-model="search" placeholder="Search title.."/>
              <label>Search title:</label>
        </div>
        <div class="wrapper flex flex-wrap">
          <div class="card" v-for="(product, index) in filteredList" :key="index">
            <p> {{ product.id }} </p>
            <p> {{ product.title }} </p>
            <img v-if="product.img" class="card_img" :src="product.img[0]" :alt="product.title">
            <!-- <p> {{ product.title }} </p> -->
          </div>
        </div>
      </div> <br><br><br>



      <!-- <FormAddProduct></FormAddProduct> -->

      <FormAddCategory></FormAddCategory>

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
  </div>
</template>

<script>
import FormAddProduct from '@/components/Admin/FormAddProduct'
import FormAddCategory from '@/components/Admin/FormAddCategory'
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'

export default {
  data() {
    return {
      showModal: false,
      idForDel: '',
      titleForDel: '',

      search: '',
    }
  },
  components: {
    FormAddProduct,
    FormAddCategory,
    firebase,
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
    async fetchUsersList() {
      const products =
          (
            await firebase
              .database()
              .ref(`/users/`)
              .once('value')
          ).val() || {}
          console.log(JSON.parse(products), 'users');
          this.usersList = products
    },
  },
  computed: {
    ...mapGetters(['INFO', 'PRODUCTS']),
    filteredList() {
      return this.PRODUCTS.filter(product => {
        return product.title.toLowerCase().includes(this.search.toLowerCase()) ||
                product.categoryName.toLowerCase().includes(this.search.toLowerCase()) ||
                product.id.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  async mounted() {
    await this.$store.dispatch('FETCH_PRODUCTS')
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
    z-index: 10;
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

.wrapper {
  img {
    max-height: 150px;
    max-width: 150px;
  }
}
</style>
