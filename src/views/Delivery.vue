<template>
  <div class="page">
    <ToTop />

    <div v-if="PAGES.delivery.html" v-html="PAGES.delivery.html" class="content"></div>

    <div v-else class="center">
      <h2>Нет информации</h2>
      <p>Внесите данные через админ панель</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['PAGES'])
  }
}
</script>
