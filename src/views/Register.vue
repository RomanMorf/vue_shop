<template>
  <div class="form_wrapper">
    <div class="form">
      <h3 class="center">Регистрация</h3>
      <form>
        <div class="form_section">
          <input id="email" class="form_input" v-model.trim="userEmail" type="text"  required="">
          <label for="email" class="form_label">Введите ваш Email</label>
          <small 
            class="form_helper invalid"
            v-if="($v.userEmail.$dirty && !$v.userEmail.required) || ($v.userEmail.$dirty && !$v.userEmail.email) "
            >Введите корректный Email
          </small>
        </div>
        <div class="form_section">
          <input id="tel" class="form_input" v-model.trim="userTel" type="tel"  required="">
          <label for="tel" class="form_label">Введите ваш номер телефона</label>
        </div>
        <div class="form_section">
          <input id='name' class="form_input" v-model.trim="$v.userName.$model" type="text" required="">
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
          <input id="pass" class="form_input" v-model.trim="$v.userPass.$model" type="password" required="" >
          <label for="pass" class="form_label">Введите пароль</label>
          <small 
            class="form_helper invalid"
            v-if="$v.userPass.$dirty && !$v.userPass.required"
          >Введите имя пользователя
          </small>
          <small 
            class="form_helper invalid"
            v-if="$v.userPass.$dirty && !$v.userPass.minLength"
          >Имя должно содержать не меньше {{ this.$v.userPass.$params.minLength.min }} символов
          </small>
        </div>
        <div class="form_section">
          <input id="pass2" class="form_input" v-model.trim="userPassRepeat" type="password" required="" >
          <label for="pass2" class="form_label">Введите пароль повторно</label>
          <small 
            class="form_helper invalid"
            v-if="userPass !== userPassRepeat"
          >Пароли должны совпадать
          </small>
        </div>
        <div class="form_section btn">
          <button class="btn" @click.prevent="registerUser">Регистрация</button>
          <a class="btn" @click.prevent="$router.push('/login')">У меня уже есть аккаунт</a>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import {email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data() {
    return {
      userEmail: '',
      userTel: '',
      userName: '',
      userPass: '',
      userPassRepeat: '',
    }
  },
  validations: {
    userName: {required, minLength: minLength(4)},
    userEmail: {required, email},
    userPass: {required, minLength: minLength(6)},
    userPassRepeat: {required},
  },
  methods: {
    async registerUser() {
      const userInfo = {
        name: this.userName,
        email: this.userEmail,
        tel: this.userTel,
        password: this.userPass,
      }

      if (this.$v.$invalid) { // проверка на валидность формы
        this.$v.$touch()
        return
      }
      
      await this.$store.dispatch('REGISTER', userInfo)
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss">
.btn {
  cursor: pointer;
}
</style>