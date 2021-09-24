<template>
  <div class="form_wrapper">
    <div class="form">
      <h3 class="center">Вход в личный кабинет</h3>
      <form class="form">
        <div class="form_section">
          <input id="email" class="form_input" v-model.trim="$v.userEmail.$model" type="text"  required="">
          <label for="email" class="form_label">Введите ваш Email</label>
          <small 
            class="form_helper invalid"
            v-if="($v.userEmail.$dirty && !$v.userEmail.required)"
            >Введите Email
          </small>
        </div>
        <div class="form_section">
          <input id="tel" class="form_input" v-model.trim="$v.userPass.$model" type="password"  required="">
          <label for="tel" class="form_label">Введите ваш пароль</label>
          <small 
            class="form_helper invalid"
            v-if="($v.userPass.$dirty && !$v.userPass.required)"
            >Введите пароль
          </small>

        </div>
        <div class="form_section btn">
          <button @click.prevent="authUserWithEmailPass">Войти</button>
          <a @click="$router.push('/restore_password')">Восстановить пароль</a>
          <a @click="$router.push('/register')">Зарегитрироваться</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data() {
    return {
      userEmail: '',
      userPass: '',
    }
  },
  validations: {
    userEmail: {required},
    userPass: {required},
  },
  methods: {
    async authUserWithEmailPass() {
      const userInfo = {
        email: this.userEmail,
        password: this.userPass,
      }

      if (this.$v.$invalid) { // проверка на валидность формы
        this.$v.$touch()
        return
      }
      await this.$store.dispatch('LOGIN', userInfo)
      this.$router.push('/cabinet')
    }
  },
}
</script>

<style lang="scss">
</style>
