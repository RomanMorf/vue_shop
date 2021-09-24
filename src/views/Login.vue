<template>
  <div class="form_wrapper">
    <div class="form">
      <h3 class="center">Вход в личный кабинет</h3>
      <form @click.prevent="" class="form">
        <div class="form_section">
          <input id="email" class="form_input" v-model.trim="userEmail" type="text"  required="">
          <label for="email" class="form_label">Введите ваш Email</label>
        </div>
        <div class="form_section">
          <input id="tel" class="form_input" v-model.trim="userPass" type="зфыыцщкв"  required="">
          <label for="tel" class="form_label">Введите ваш пароль</label>
        </div>
        <div class="form_section btn">
          <button>Войти</button>
          <a @click="$router.push('/restore_password')">Восстановить пароль</a>
          <a @click="$router.push('/register')">Зарегитрироваться</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      userEmail: '',
      userPass: '',
    }
  },
}
</script>

<style lang="scss">
// .form {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;

//   &_wrapper {
//     margin: 50px auto;
//     width: 70%;
//     border: 1px solid black;
//     padding: 10px;
//   }

//   &_section {
//     margin: 10px auto;
//     width: 80%;

//     & p {
//       font-weight: 300;
//       font-size: 14px;
//     }
    
//     & input {
//       height: 30px;
//       width: 100%;
//     }

//     &.btn {
//       display: flex;
//       justify-content: space-around;
//       & a {
//         font-size: 12px;
//       }
//     }

//   }
// }
</style>
