<template>
  <div>
    <div class="product_container">
      <div class="search">
        <div class="search-wrapper">
          <br>
          <input type="text" v-model="search" placeholder="Search title.."/>
              <label>Search title:</label> <span>{{ search }}</span>
              <br>
              <br>
        </div>
        <div class="wrapper flex flex-wrap">
          <div class="card" v-for="(product, index) in filteredList" :key="index">
            <p> {{ product.id }} </p>
            <p> {{ product.title }} </p>
            <img v-if="product.img" class="card_img" :src="product.img[0]" :alt="product.title">
          </div>
        </div>
      </div>
      <br><br><br>

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


// ------  --------------
.dropdown {
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: 28px;
  width: 150px;
  background: #f2f2f2;
  border: 1px solid;
  border-color: white #f7f7f7 whitesmoke;
  border-radius: 3px;
  background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.06));
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.dropdown:before, .dropdown:after {
  content: '';
  position: absolute;
  z-index: 2;
  top: 9px;
  right: 10px;
  width: 0;
  height: 0;
  border: 4px dashed;
  border-color: #888888 transparent;
  pointer-events: none;
}

.dropdown:before {
  border-bottom-style: solid;
  border-top: none;
}

.dropdown:after {
  margin-top: 7px;
  border-top-style: solid;
  border-bottom: none;
}

.dropdown-select {
  position: relative;
  width: 130%;
  margin: 0;
  padding: 6px 8px 6px 10px;
  height: 28px;
  line-height: 14px;
  font-size: 12px;
  color: #62717a;
  text-shadow: 0 1px white;
  background: #f2f2f2; /* Fallback for IE 8 */
  background: rgba(0, 0, 0, 0) !important; /* "transparent" doesn't work with Opera */
  border: 0;
  border-radius: 0;
  -webkit-appearance: none;
}

.dropdown-select:focus {
  z-index: 3;
  width: 100%;
  color: #394349;
  outline: 2px solid #49aff2;
  outline: 2px solid -webkit-focus-ring-color;
  outline-offset: -2px;
}

.dropdown-select > option {
  margin: 3px;
  padding: 6px 8px;
  text-shadow: none;
  background: #f2f2f2;
  border-radius: 3px;
  cursor: pointer;
}

/* Fix for IE 8 putting the arrows behind the select element. */

.lt-ie9 .dropdown {
  z-index: 1;
}

.lt-ie9 .dropdown-select {
  z-index: -1;
}

.lt-ie9 .dropdown-select:focus {
  z-index: 3;
}

/* Dirty fix for Firefox adding padding where it shouldn't. */

@-moz-document url-prefix() {
  .dropdown-select {
    padding-left: 6px;
  }
}

.dropdown-dark {
  background: #444;
  border-color: #111111 #0a0a0a black;
  background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
  background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
  background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
  background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));
  -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
}

.dropdown-dark:before {
  border-bottom-color: #aaa;
}

.dropdown-dark:after {
  border-top-color: #aaa;
}

.dropdown-dark .dropdown-select {
  color: #aaa;
  text-shadow: 0 1px black;
  background: #444;  /* Fallback for IE 8 */
}

.dropdown-dark .dropdown-select:focus {
  color: #ccc;
}

.dropdown-dark .dropdown-select > option {
  background: #444;
  text-shadow: 0 1px rgba(0, 0, 0, 0.4);
}
</style>
