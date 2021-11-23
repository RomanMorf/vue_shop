<template>
  <div class="orders">
    <h3 class="center">Заполните форму заказ</h3>
    <form @submit.prevent="createOrder">
      <div class="form_section">
        <transition-group name="translate">
          <div class="content" v-for="product in BASKET" :key="product.id">
            <img v-if="product.img" :src="product.img[0]" alt="product.title" @click="goToProduct(product.id)">
            <img v-if="!product.img" :src="'https://i.stack.imgur.com/y9DpT.jpg'" alt="product.title" @click="goToProduct(product.id)">
              <p class="text">{{ product.title }} </p>
              <p >{{ product.price }} UAH</p>
              <p class="unselectable nowrap">
                <span class="btn" @click="productDecrement(product.id)">-</span>
                  {{ product.count }}
                <span class="btn" @click="productIncrement(product.id)">+</span>
              </p>
            <button class="unselectable" @click="deleteProductFromBasket(product.id)">
              <span class="material-icons-outlined md-30">delete</span>
            </button>
          </div>
        </transition-group>
      </div>
      <div class="form_section">
        <p>Итого: <strong>{{ totalSum }}</strong> UAH</p>
      </div>
      <div class="form_section">
        <input @keyup.enter="createOrder" id="email" class="form_input" v-model.trim="userEmail" type="text"  required="">
        <label for="email" class="form_label">Введите ваш Email</label>
        <small
          class="form_helper invalid"
          v-if="($v.userEmail.$dirty && !$v.userEmail.required) || ($v.userEmail.$dirty && !$v.userEmail.email) "
          >Введите корректный Email
        </small>
      </div>
      <div class="form_section">
        <input @keyup.enter="createOrder" id="tel" class="form_input" v-model.trim="userTel" type="tel"  required="">
        <label for="tel" class="form_label">Введите ваш номер телефона</label>
      </div>
      <div class="form_section">
        <input @keyup.enter="createOrder" id='name' class="form_input" v-model.trim="$v.userName.$model" type="text" required="">
        <label for='name' class="form_label">Введите имя</label>
        <small
          class="form_helper invalid"
          v-if="$v.userName.$dirty && !$v.userName.required"
        >Введите имя пользователя
        </small>
        <small
          class="form_helper invalid"
          v-if="$v.userName.$dirty && !$v.userName.minLength"
        >Имя должно содержать не меньше {{ this.$v.userName.$params.minLength.min }} символов
        </small>
      </div>
      <div class="form_section">
        <input @keyup.enter="createOrder" id="comment" class="form_input" v-model.trim="userComment" type="text"  required="">
        <label for="comment" class="form_label">Оставьте комментарий, если необходимо</label>
      </div>
      <div class="form_section btn">
        <button class="modal_btn" @click.prevent="createOrder">Создать заказ</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {email, required, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      loading: true,
      userEmail: '',
      userTel: '',
      userName: '',
      userComment: '',
    }
  },
  methods: {
    deleteProductFromBasket(id) {
      this.$store.dispatch('DELETE_FROM_BASKET', id)
    },
    productIncrement(id) {
      this.$store.dispatch('BASKET_PRODUCT_INCREMENT', id)
    },
    productDecrement(id) {
      this.$store.dispatch('BASKET_PRODUCT_DECREMENT', id)
    },
    async createOrder() {
      if (this.$v.$invalid) { // проверка на валидность формы
        this.$v.$touch()
        return
      }
      try {
        if (this.BASKET.length > 0) {
          const newOrder = {
            userEmail: this.userEmail,
            userTel: this.userTel,
            userName: this.userName,
            userComment: this.userComment,
            orderList: this.BASKET,
            dateCreated: Date.now()
          }
          await this.$store.dispatch('CREATE_NEW_ORDER', newOrder)
          await this.$store.dispatch('CLEARE_BASKET')
          console.log('new order created', newOrder);
          this.$router.push('/thanks')
          this.$showMessage('Заказ успешно создан.')  
        } else {
          this.$showMessage('Список пуст... Добавьте товар в корзину и вопторите попытку...', 'error')  
        }
      } catch (error) {
        throw error
      }
    },

  },
  validations: {
    userName: {required, minLength: minLength(4)},
    userEmail: {required, email},
  },
  computed: {
    ...mapGetters(['BASKET']),
    totalSum() {
      let sum = 0
      this.BASKET.forEach(item => {
        sum += (+item.price * +item.count)
      })
      return sum
    }

  }
}
</script>

<style scoped lang="scss">
.content {
  min-width: 40vw;
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
  margin-bottom: 10px;

  & img {
    max-width: 100px;
    max-height: 200px;
    border-radius: 20px;
    margin-right: 15px;
  }
  & button {
    background-color: transparent;
    border: none;
    outline: none;
    margin-left: 15px;
    cursor: pointer;
  }
  & .btn {
    margin: 0 10px;
  }
  & .text {
    width: 150px;
    margin-right: 20px;
  }
}

@media (max-width: 580px){
  .material-icons.md-40 {
    font-size: 30px;
  }
  .material-icons-outlined.md-40 {
    font-size: 30px;
  }
  .material-icons-outlined.md-30 {
    font-size: 30px;
  }

  .content {
    & img {
      max-width: 50px;
    }
  }
}
</style>
