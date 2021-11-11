<template>
  <div class="nav-bar">
    <div class="container">
      <div class="logo" @click="$router.push('/')">
        <img class="logo_img" src="https://svgsilh.com/svg_v2/311825.svg" alt="">
      </div>
      <div @click="showBurgerMenu = !showBurgerMenu" class="burger_btn"><span class="material-icons">menu</span></div>

      <burger-menu :class="{active: showBurgerMenu}" @closeBurgerMenu="closeBurgerMenu" :links="links" />

      <nav class="nav unselectable">
        <ul class="nav-list">
          <router-link
            v-for="(link, index) in links"
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
      <div class="tests_btn">
        <a @click="$router.push('/login')">Login</a>
        <a @click="$store.dispatch('LOGOUT')">Logout</a>
        <a @click="$router.push('/cabinet')">Cabinet</a>
        <a @click="$router.push('/admin')">ADMIN</a>
      </div>
    </div>
  </div>
</template>

<script>
import BurgerMenu from '@/components/NavBar/BurgerMenu'

export default {
  name: 'nav-bar',
  data() {
    return {
      links: [
        { title: 'Главная', url: '/', exact: true }, //исключить "/"
        { title: 'Каталог', url: '/catalog' },
        { title: 'Доставка', url: '/delivery' },
        { title: 'О нас', url: '/about' },
        { title: 'Контакты', url: '/contacts' },
      ],
      showBurgerMenu: false,
    }
  },
  methods: {
    async checkAuth() {
      const uid = await this.$store.dispatch('GET_UID')
      return uid ? true : false
    },
    closeBurgerMenu() {
      this.showBurgerMenu = false
    }
  },
  computed: {
    async authUser() {
      const uid = await this.$store.dispatch('GET_UID')
      return uid ? true : false
    }
  },
  components: {
    BurgerMenu
  }
}
</script>

<style scoped lang="scss">
@import "NavBar.scss";

.tests_btn {
  border: 1px solid black;
  padding: 5px;
  & a {
    cursor: pointer;
    &:not(:last-child)::after {
      content:' | ';
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
