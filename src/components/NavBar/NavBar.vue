<template>
  <div class="nav-bar">
    <div class="container">
      <div class="logo" @click="$router.push('/')">
        <img class="logo_img" src="https://svgsilh.com/svg_v2/311825.svg" alt="">
      </div>
      <nav>
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
        <a v-if="!checkAuth" @click="$router.push('/login')">Login</a> 
        <a v-if="checkAuth" @click="$store.dispatch('LOGOUT')">Logout | </a>
        <a v-if="checkAuth" @click="$router.push('/cabinet')">Cabinet</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data() {
    return {
      links: [
        { title: 'Home', url: '/', exact: true }, //исключить "/"
        { title: 'About', url: '/about' },
        { title: 'Catalog', url: '/catalog' },
        { title: 'Delivery', url: '/delivery' },
        { title: 'Contacts', url: '/contacts' },
        { title: 'TestPage', url: '/testpage' },
      ],
    }
  },
  methods: {
    async checkAuth() {
      const uid = await this.$store.dispatch('GET_UID')
      console.log(uid, 'uid');
      return uid ? true : false
    }
  },
}
</script>

<style scoped lang="scss">
  @import "NavBar.scss";

  .tests_btn {
    border: 1px solid black;
    padding: 5px;
    & a {
      cursor: pointer;
    }
  }
</style>
