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
        <a v-if="!currentUser" @click="$router.push('/login')">Login | </a> 
        <a v-if="currentUser" @click="$store.dispatch('LOGOUT')">Logout | </a>
        <a @click="$router.push('/cabinet')">Cabinet</a>
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
  computed: {
    currentUser () {
      const uid = this.$store.state
      console.log(this.$store.state, 'this.$store.state');
      return uid ? true : false
    }
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
    }
  }
</style>
