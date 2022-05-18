<template>
  <div class="nav-bar" @click="checkAuth">
    <div class="container">
      <div class="logo" @click="$router.push('/')">
        <img class="logo_img" src="../../assets/img/logo4.png" alt="">
      </div>

      <div @click="showBurgerMenu = !showBurgerMenu" class="burger_btn"><span class="material-icons">menu</span></div>

      <div class="burger_wrapper" v-show="showBurgerMenu" @click="showBurgerMenu = !showBurgerMenu"></div>
      <burger-menu :class="{active: showBurgerMenu}" @closeBurgerMenu="closeBurgerMenu" :links="menuLinks" />

      <nav class="nav unselectable">
        <ul class="nav-list">
          <router-link
            v-for="(link, index) in menuLinks"
            :key="index"
            tag="li"
            active-class="active"
            :to="link.url"
            :exact="link.exact"
            class="nav-link"
          >
            {{ link.title }}
          </router-link>
        </ul>
      </nav>

      <div class="select_body"  @click="showSelect = !showSelect">
        <span class="material-icons-outlined cursor">
          account_circle
        </span>
        <div class="select_container" v-show="showSelect"></div>
        <div class="select_wrapper" >
          <transition name="slide-top">
            <ul class="select_list" v-show="showSelect">
              <li class="select_item" @click="$router.push('/login')" v-if="!INFO.role">
                Login
                <span class="material-icons-outlined">login</span>
              </li>
              <li class="select_item" @click="$router.push('/cabinet')" v-show="INFO.role">
                Cabinet
                <span class="material-icons-outlined">settings</span>
              </li>
              <li class="select_item" @click="$router.push('/admin')" v-if="INFO.role" v-show="INFO.role === 'admin' || INFO.role === 'moderator'">
                Admin panel
                <span class="material-icons-outlined">settings</span>
              </li>
              <li class="select_item" @click="btnLogOut" v-show="INFO.role">
                Logout
                <span class="material-icons-outlined">logout</span>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BurgerMenu from '@/components/NavBar/BurgerMenu'
import { mapGetters } from 'vuex'

export default {
  name: 'nav-bar',
  data() {
    return {
      menuLinks: [
        { title: 'Главная', url: '/', exact: true }, //исключить "/"
        { title: 'Каталог', url: '/catalog' },
        { title: 'Доставка', url: '/delivery' },
        { title: 'О нас', url: '/about' },
        { title: 'Контакты', url: '/contacts' },
      ],
      showBurgerMenu: false,
      showSelect: false
    }
  },
  methods: {
    btnLogOut() {
      this.$showMessage('Вы вышли из системы', 'error')
      this.$store.dispatch('LOGOUT')
      this.$router.push('/login')
    },
    closeBurgerMenu() {
      this.showBurgerMenu = false
    },
    checkAuth() {
      if (Object.keys(this.INFO).length !== 0) {
        return
      } else {
        this.$store.dispatch('FETCH_INFO')
      }
    }
  },
  async mounted() {
    this.$store.dispatch('FETCH_INFO')
  },
  computed: {
    ...mapGetters(['INFO'])
  },
  components: {
    BurgerMenu
  },


}
</script>

<style scoped lang="scss">
@import "NavBar.scss";
@import '@/assets/scss/variables.scss';

.select {
  &_body {
    position: relative;
    margin-right: 20px;
  }

  &_wrapper {
    z-index: 300;
    position: absolute;
    top: 0px;
    right: 0px;
    overflow: hidden;
  }

  &_container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 200;
  }

  &_list {
    list-style: none;
    padding: 5px;
    margin: 0;
    background-color: $bg_color_main;
    border: 1px solid grey;


  }

  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid grey;
    padding: 10px;
    margin-bottom: 5px;
    transition: color ease-in .3s;


    span {
      margin-left: 15px;
    }

    &:hover {
      cursor: pointer;
      color: $hover_color_main;
      transition: color ease-in .3s;
      padding-bottom: 8px;
      border-bottom: 3px solid grey;
      box-sizing: border-box;
    }
  }
}

.burger {
  &_btn {
    display: none;
    cursor: pointer;
    margin-right: auto;
    margin-left: 10px;
  }
  &_wrapper{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

@media (max-width: 580px){
  .nav {
    display: none;
  }
  .burger_btn {
    display: block;
  }
}
</style>
