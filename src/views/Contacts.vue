<template>
  <div>
    <div v-if="PAGES.contacts.html" v-html="PAGES.contacts.html"></div>
    
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
