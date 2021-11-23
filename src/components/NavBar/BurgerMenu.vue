<template>
  <div class="burger unselectable">
    <span @click="close" class="material-icons burger_btn">close</span>
    <ul class="burger_list" @click="close">
      <router-link
        v-for="(link, index) in links"
        :key="index"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
        class="burger_link"
      >
        {{ link.title }}
      </router-link>
    </ul>
  </div>
</template>

<script>

export default {
  props: ['links'],
  methods: {
    close() {
      this.$emit('closeBurgerMenu')
    },
  },
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/variables.scss';

.burger {
  position: absolute;
  min-width: 250px;
  max-width: 500px;
  min-height: 300px;
  top: 0;
  left: -100%;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.4);

  background-color: $bg_color_main;
  z-index: 110;
  transition: all .5s ease;

  &_list {
    margin-top: 50px;
    list-style: none;
    padding-inline-start: 20px;
  }

  &_link {
    padding: 10px;
    border: 1px solid black;
    max-width: 90%;
    margin-bottom: 10px;
    box-shadow: $box_shadow_main;
    transition: all .5s ease;
    cursor: pointer;
    background-color: $bg_color_main;

    &:hover {
      transition: all .5s ease;
      transform: translateY(-5px);
      box-shadow: $box_shadow_secondary;
    }
  }

  &_btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    opacity: 0;
  }


  &.active {
    left: 0;
    transition: all .5s ease;
    & .burger_btn {
      transition: 1.5s all .5s ease;
      opacity: 1;
    }
  }
}
</style>
