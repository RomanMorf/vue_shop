<template>
  <div class="form_wrapper">
    <div class="form">
      <h3 class="center">Вход в личный кабинет</h3>
      <form @click.prevent="">
        <div class="form_section">
          <p>Email *</p>
          <input v-model="userEmail" type="email" placeholder="Enter your email">
        </div>
        <div class="form_section">
          <p>Телефон</p>
          <input v-model="userTel" type="tel" placeholder="Enter your phone number">
        </div>
        <div class="form_section">
          <p>ФИО</p>
          <input v-model="userName" type="text" placeholder="Enter your name">
        </div>
        <div class="form_section">
          <p>Пароль *</p>
          <input v-model="userPass" type="password" placeholder="Enter your password">
        </div>
        <div class="form_section">
          <p>Повторите пароль *</p>
          <input v-model="userPassRepeat" type="password" placeholder="Repeat your password">
        </div>
        <div class="form_section btn">
          <button @click="registerUser">Войти</button>
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
      userTel: '',
      userName: '',
      userPass: '',
      userPassRepeat: '',
    }
  },
  methods: {
    registerUser() {
      const userInfo = {
        email: this.userEmail,
        password: this.userPass,
        name: this.userName,
      }

      if (this.userPass.trim() && this.userPass === this.userPassRepeat) {
        console.log('пароли совпадают');
        if (this.userName.trim() && this.userPass.trim() && this.userEmail.trim()) {
          console.log('Можно создавать пользователя');
        }
      } else {
        console.log('пароли не совпадают !!! ');
      }

      // console.log(userInfo, 'userInfo');
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