<template>
  <div class="form_wrapper">
    <div class="form">
      <h3 class="center">Регистрация</h3>
      <form @click.prevent="" class="form">
        <div class="form_section">
          <p>Email *</p>
          <input v-model="userEmail" type="email" placeholder="Enter your email">
        </div>
        <div class="form_section">
          <p>Пароль *</p>
          <input v-model="userPass" type="password" placeholder="Enter your password">
        </div>
        <div class="form_section btn">
          <button>Зарегистрироваться</button>
          <a href="#">У меня уже есть аакаунт</a>
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
