<template>
  <div class="nav-bar">
    <div class="container">
      <div class="logo" @click="$router.push('/')">
        Logo
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
        { title: 'Contacts', url: '/contacts' },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
  @import "NavBar.scss"
</style>
