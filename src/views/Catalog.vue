<template>
  <div>
    <h1 class="center">Каталог</h1>

    <Loader class="center" v-if="isLoding"></Loader>
    <div v-else>
      <ToTop />
      <div class="catalog_bar">
        <div class="filter">
          Filter
        </div>

        <div class="sorting">
          Сортировка
          <select name="sorting" class="sorting_select" id="sorting" v-model="sorting">
            <option disabled value="default">по умолчанию</option>
            <option value="minToMax">по возростанию цены</option>
            <option value="maxToMin">по убыванию цены</option>
            <option value="name">по названию</option>
          </select>
        </div>

        <div class="number">
          Показывать по
          <select name="number" id="number" v-model="maxProdOnPage">
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
          </select>
        </div>
        <div class="views">
          <div class="cards mr-5" :class="{active: showAsCards}" @click="showAsCards = true">
            <span class="cards_icon"></span>
            <span class="cards_icon vertical"></span>
          </div>
          <div class="list" :class="{active: !showAsCards}" @click="showAsCards = false">
            <span class="list_icon"></span>
          </div>
        </div>
      </div>

      <transition name="translate">
        <div v-if="showAsCards" class="card-wrapper" :class="{list: !showAsCards}">
          <Card
            v-for="product in items"
            :key="product.id"
            :product="product"
            class="margin-5"
          />
        </div>
      </transition>
      <transition name="translate">
        <div v-if="!showAsCards" class="card-wrapper" :class="{list: !showAsCards}">
          <CardWide
            v-for="product in items"
            :key="product.id"
            :product="product"
          />
        </div>
      </transition>

      <div v-if="products.length < 1" class="center">
        <h3>В даной категории пока нет товаров</h3>
        <p>Вернуться в <a @click="toCatalog" class="pointer">Каталог</a> </p>
      </div>

      <Paginate
        v-if="pageCount > 1"
        v-model="page"
        :page-range="30"
        :margin-pages="20"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="prevBtn"
        :next-text="nextBtn"
        :container-class="'pagination unselectable'"
        :page-class="'pagination_btn'"
      />

    </div>
  </div>
</template>

<script>
import paginationMixins from '@/mixins/pagination.mixin'

import Card from '@/components/Catalog/Card'
import CardWide from '@/components/Catalog/CardWide'
import { mapGetters } from 'vuex'

export default {
  name: 'Catalog',
  data() {
    return {
      products: [],
      isLoding: true,
      showAsCards: true,
      sorting: 'default',
      maxProdOnPage: 8,
    }
  },
  mixins: [paginationMixins],
  methods: {
    async toCatalog() {
      this.$router.push('/catalog-redirect')
      this.products = await this.$store.dispatch('FETCH_PRODUCTS')
      this.setupPagination(this.products, this.maxProdOnPage)
    },
  },
  async mounted() {
    this.products = await this.$store.dispatch('FETCH_PRODUCTS')
    this.categories = await this.$store.dispatch('FETCH_CATEGORIES')

    const id = this.$route.params.id
    if (id) {
      this.products = this.PRODUCTS.filter(prod => {
        return prod.categoryId === id
      })
    }

    if (localStorage.getItem('maxProdOnPage')) this.maxProdOnPage = JSON.parse(localStorage.getItem('maxProdOnPage'))
    this.isLoding = false
  },
  components: {
    Card,
    CardWide,
  },
  computed: {
    ...mapGetters(['PRODUCTS']),
    prevBtn() {
      return 'Предыдущая '
    },
    nextBtn() {
      return 'Следующая'
    },
  },
  watch: {
    sorting(type) {
      if (type === 'name') {
        this.items.sort((a,b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
      }
      if (type === 'minToMax') {
        this.items.sort((a,b) => {
          if (+a.price < +b.price) {
            return -1;
          }
          if (+a.price > +b.price) {
            return 1;
          }
          return 0;
        })
      }
      if (type === 'maxToMin') {
        this.items.sort((a,b) => {
          if (+a.price > +b.price) {
            return -1;
          }
          if (+a.price < +b.price) {
            return 1;
          }
          return 0;
        })
      }
    },
    maxProdOnPage(value){
      localStorage.setItem('maxProdOnPage', JSON.stringify(value))
      this.setupPagination(this.products, this.maxProdOnPage)
    },

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.card-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  &.list {
    flex-direction: column;
    align-items: center;
  }
  .margin-5 {
    margin: 5px;
  }
}

.catalog_bar {
  display: flex;
  justify-content: center;
  align-items: center;

  & .filter {
    margin-right: auto;
  }

  &
  .sorting,
  .number {
    margin-right: 10px;
  }

  select {
    border: none;
    border-bottom: 1px solid #000;
  }
}

.views {
  display: flex;

  &
  .cards,
  .list {
    width: 30px;
    height: 30px;
    position: relative;
    padding: 3px;
    &:hover {
      box-shadow: $box_shadow_main;
    }


    &.active {
      background-color:$bg_color_main;
      & .cards_icon {
        &.vertical {
          &::before {
            background-color: $bg_color_main;
          }
          &::after {
            background-color: $bg_color_main;
          }
        }
      }
    }
  }

  & .list_icon {
    position: absolute;
    top: 14px;
    width: 80%;
    height: 2px;
    background-color: black;
    margin: 0 auto;


    &::before {
      content: '';
      position: absolute;
      top: 5px;
      width: 100%;
      height: 2px;
      background-color: black;
    }
    &::after {
      content: '';
      position: absolute;
      top: -5px;
      width: 100%;
      height: 2px;
      background-color: black;
    }
  }

  & .cards_icon {
    position: absolute;
    top: 14px;
    width: 80%;
    height: 2px;
    background-color: black;
    margin: 0 auto;

    &.vertical {
      position: absolute;
      top: 14px;
      width: 80%;
      height: 2px;
      background-color: transparent;
      margin: 0 auto;
      transform: rotate(90deg);

      &::before {
        content: '';
        position: absolute;
        top: 4px;
        width: 100%;
        height: 3px;
        background-color: rgb(255, 255, 255);
      }
      &::after {
        content: '';
        position: absolute;
        top: -5px;
        width: 100%;
        height: 3px;
        background-color: rgb(255, 255, 255);
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 5px;
      width: 100%;
      height: 2px;
      background-color: black;
    }
    &::after {
      content: '';
      position: absolute;
      top: -5px;
      width: 100%;
      height: 2px;
      background-color: black;
    }
  }
}

.pointer {
  cursor: pointer;
}


</style>
