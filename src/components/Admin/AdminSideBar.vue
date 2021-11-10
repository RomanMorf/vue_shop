<template>
  <div class="side-bar">
    <button v-tooltip="'Изменить размер меню'" class="side-bar_btn" @click="toggleSideBar">
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
        @click="goTo(item.path)"
      >
        <span class="menu_item-text">{{ item.title }}</span>
        <span v-tooltip="item.title" class="menu_item-btn material-icons-outlined">
          {{ item.icon }}
        </span>
      </li>
    </ul>
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
        {title: 'Товары', path: '/admin/products', icon: 'format_list_bulleted'},
        {title: 'Создать продутк', path: '/admin/create', icon: 'create_new_folder'},
        {title: 'Категории', path: '/admin/categories', icon: 'category'},
        {title: 'Редактор контента', path: '/admin/editor', icon: 'edit_note'},
        {title: 'Пользователи', path: '/admin/profiles', icon: 'account_circle'},
        {title: '!!! Test !!!', path: '/admin/testpage', icon: 'contacts'},
      ]
    }
  },
  methods: {
    toggleSideBar(){
      this.$store.dispatch('SIDE_BAR_INTERFACE_TOGGLE')
    },
    goTo(path) {
      if (window.innerWidth < 900) {
        this.$store.dispatch('SIDE_BAR_HIDE')
      }
      this.$router.push(path)
    }
  },
  props: ['sideBarIsOpen'],
  computed: {
    ...mapGetters(['INTERFACE'])
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/variables.scss';

.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  padding-top: 50px;

  width: 300px;
  min-height: 100vh;
  background-color: $bg_color_admin;
  transition: all ease 0.5s;

  &.close {
    width: 50px;
    transition: all ease 0.5s;
    .menu_item {
      border-bottom: none;
      margin: 10px 0;

      &-text{
        transition: all ease 0.5s;
        left: -250px;
      }
      &-btn {
        top: 10px;
        right: 15px;
      }
    }

  }

  &_btn{
    background-color: $bg_color_admin;
    border: none;
    position: absolute;
    top: 15px;
    left: 5px;
    cursor: pointer;
  }
}

.menu {
  padding: 0;
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
      background-color: $hover_color_admin;
    }
    &-btn {
      position: absolute;
      top: 10px;
      right: 5px;
      cursor: pointer;
    }

    &-text{
      position: absolute;
      top: 10px;
      left: 10px;
      transition: all ease 0.5s;
      width: 230px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@media (max-width: 580px){
  .side-bar {
    left: -50px;
    padding-left: 50px;
    width: 350px;

    &.close {
      .menu_item {
        &-btn {
          right: 50px;
        }
      }
    }
    &_btn{
      left: 60px;
    }
  }

  .menu {
    &_item {
      padding: 10px 0px;
    }
  }
}

</style>
