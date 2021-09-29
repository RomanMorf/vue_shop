<template>
  <div class="bar">
    <div class="bar_logo">
      LOGO
    </div>

    <div class="bar_categories">
      CATEGORIES
    </div>

    <div class="bar_buttons">
      <div class="bar_btn">
        <span class="material-icons-outlined md-40">compare_arrows</span>
        <span class="bar_btn_number">0</span>
      </div>
      <div class="bar_btn">
        <span class="material-icons md-40">favorite_border</span>
        <span class="bar_btn_number">1</span>
      </div>
      <div class="bar_btn" @click="showModal = !showModal">
        <span class="material-icons-outlined md-40 btn">shopping_bag</span>
        <span class="bar_btn_number">{{ BASKET.length }}</span>
      </div>
    </div>
    <Modal v-show="showModal" @close="closeModal">
      <template v-slot:content>
        <div class="content" v-for="(product, index) in BASKET" :key="product.id">
          <h3>{{ index + 1 }} {{ product.title }} кол-во "{{ product.count }} "</h3>
          <!-- <p v-if="product.img">{{ product.img[0] }}</p>   кидало адресс ссылки, решил убрать! -->
          <img v-if="product.img" :src="product.img[0]" alt="product.title">
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
  },
  computed: {
    ...mapGetters(['BASKET']),
  },
}
</script>

<style scoped lang="scss">
.bar {
  border-bottom: 1px solid rgba(146, 146, 146, 0.5);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &_buttons {
    width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &_btn {
    width: 30px;
    height: 30px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &_number {
      position: absolute;
      min-width: 20px;
      min-height: 20px;
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      bottom: -15px;
      left: -10px;
      border-radius: 50%;
      background-color: rgb(230, 230, 230);
    }
  }
}
.material-icons.md-40 {
  font-size: 40px;
}
.material-icons-outlined.md-40 {
  font-size: 40px;
}
</style>
