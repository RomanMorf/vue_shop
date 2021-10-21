<template>
  <div class="side-bar">
    <button class="side-bar_btn" @click="toggleSideBar">
      <span class="material-icons-outlined" v-show="!INTERFACE.sideBarIsOpen">
        menu
      </span>
      <span class="material-icons-outlined" v-show="INTERFACE.sideBarIsOpen">
        menu_open
      </span>
    </button>
    <ul class="menu">
      <li v-for="(item, index) in menu"
        :key="index" class="menu_item"
        @click="$router.push(item.path)"
      >
        <span class="menu_item-text">{{ item.title }}</span>
        <span class="menu_item-btn material-icons-outlined">
          {{ item.icon }}
        </span>
      </li>
    </ul>
    <!-- <button @click="toggleSideBar" v-show="INTERFACE.sideBarIsOpen">close</button>
    <button @click="toggleSideBar" v-show="!INTERFACE.sideBarIsOpen">open</button> -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'side-bar',
  data() {
    return {
      menu: [
        {title: 'Главная', path: '/admin', icon: 'home'},
        {title: 'Заказы', path: '/admin/orders', icon: 'list_alt'},
        {title: 'Редактор', path: '/admin/editor', icon: 'edit_note'},
        {title: 'Профили', path: '/admin/profiles', icon: 'account_circle'},
        {title: '!!! Test !!!', path: '/admin/testpage', icon: 'contacts'},
      ]
    }
  },
  methods: {
    toggleSideBar(){
      this.$store.dispatch('SIDE_BAR_INTERFACE_TOGGLE')
    }
  },
  props: ['sideBarIsOpen'],
  computed: {
    ...mapGetters(['INTERFACE'])
  }

}
</script>

<style scoped lang='scss'>
  .side-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;

    padding-top: 50px;
    width: 300px;
    min-height: 100vh;
    background-color: rgb(201, 201, 201);
    transition: all ease 0.5s;

    &.close {
      width: 50px;
      transition: all ease 0.5s;
      .menu_item {
        margin: 10px 1px;
        padding: 0;
        border-bottom: none;

        &-text{
          display: none;
        }
        &-btn {
          top: -1px;
          right: 15px;
        }
      }

    }

    &_btn{
      background-color: transparent;
      border: none;
      position: absolute;
      top: 15px;
      left: 5px;
    }
  }

  .menu {
    padding: 0;
    margin: 10px 0;
    list-style: none;

    &_item {
      margin: 10px;
      padding: 10px 35px 10px 10px;
      cursor: pointer;
      transition: all ease .3s;
      position: relative;
      min-height: 40px;
      border-bottom: 1px solid grey;

      &:hover {
        background-color: grey;
      }
      &-btn {
        position: absolute;
        top: 10px;
        right: 5px;
      }
    }
  }

</style>
