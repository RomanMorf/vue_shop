<template>
  <div class="form_wrapper">
    <div class="form">
      <h3 class="center">Сброс пароля</h3>
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
        <div class="form_section btn">
          <button @click.prevent="resetPassWithEmail">Сбросить пароль</button>
          <a @click="$router.push('/register')">Зарегиcтрироваться</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  name: 'ResetPasswpod',
  data() {
    return {
      userEmail: '',
    }
  },
  validations: {
    userEmail: {required},
  },
  methods: {
    async resetPassWithEmail() {
      if (this.$v.$invalid) { // проверка на валидность формы
        this.$v.$touch()
        return
      }
      try {
        await this.$store.dispatch('RESET_PASSWORD', this.userEmail)
        this.$router.push('/login')
        this.$showMessage('Письмо с инструкциями было выслано Вам на почту...', 'success')
      } catch (error) {
        if (messages[error.code]) {
          this.$showMessage(messages[error.code], 'error')
        }
        throw error
      }
    }
  },
}
</script>

