<template>
  <div>
    <AdminTopBar />

    <AdminSideBar
      :class="{close: !INTERFACE.sideBarIsOpen}"
    />

    <div class="content" :class="{full: !INTERFACE.sideBarIsOpen}">
      <transition name="translate" mode="out-in">
        <router-view />
      </transition>
    </div>

  </div>
</template>

<script>
import AdminSideBar from '@/components/Admin/AdminSideBar'
import AdminTopBar from '@/components/Admin/AdminTopBar'
import NavBar from '@/components/NavBar/NavBar'
import {mapGetters} from 'vuex'

export default {
  name: 'main-layout',
  components: {
    AdminTopBar,
    AdminSideBar,
    NavBar,
  },
  computed: {
    ...mapGetters(['INTERFACE'])
  }
}
</script>

<style scoped lang='scss'>
.content {
  margin-left: 300px;
  transition: all ease 0.5s;
  padding: 10px;
  min-height: calc(100vh - 70px);

  &.full {
    margin-left: 50px;
    transition: all ease 0.5s;
  }
}

@media (max-width: 580px){
  .content {
    margin-left: 0px;
    padding: 5px;
    min-height: calc(100vh - 70px);

    &.full {
      margin-left: 00px;
    }
  }
}
</style>
