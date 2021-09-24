<template>
  <div class="container">
    <div class="form">
      <h3>Вход в личный кабинет</h3>
      <form @click.prevent="">
        <div class="form_section">
          <p>Email</p>
          <input v-model="userEmail" type="email" placeholder="Enter your email">
        </div>
        <div class="form_section">
          <p>Password</p>
          <input v-model="userPass" type="password" placeholder="Enter your password">
        </div>
        <div class="form_section btn">
          <button>Войти</button>
          <a href="#">Восстановить пароль</a>
          <a href="#">Зарегитрироваться</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userEmail: '',
      userPass: '',
    }
  },
}
</script>

<style lang="scss">
  .login {
    &_form {
      display: flex;
      flex-direction: row;
    }

    &_section {
      display: flex;
    }

  }
</style>