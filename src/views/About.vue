<template>
  <div>
      <div v-if="PAGES.about.html" v-html="PAGES.about.html" class="content"></div>
      <div v-else class="center">
        <h2>Нет информации</h2>
        <p>Внесите данные через админ панель</p>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters(['PAGES'])
  }
}
</script>
