<template>
  <div>

    <div class="wrapper">Выберите текст для редактирования:
      <select v-model="currentSelect">
        <option v-for="(item, index) in PAGES" :key="index" :value="item.forselect">{{item.forselect}}</option>
      </select>

      <EditorForVue :content="content" @update:content="getUpdatedContent" class="mb-10"/>
      <div class="flex">
        <button class="modal_btn admin_bg" @click="seveChanges">Сохранить изменения</button>
        <button class="modal_btn admin_bg" @click="openPreview = !openPreview">Предварительный просмотр</button>
      </div>
      <transition name="scale">
        <div v-show="openPreview" class="preview">
          <h4 class="center">Preview</h4>
          <span v-html="content"></span>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import EditorForVue from '@/components/Admin/EditorForVue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      content: '',
      current: '',
      currentSelect: null,
      openPreview: false,
    }
  },

  methods: {
    seveChanges() {
      if (this.content.trim() && this.current.trim()) {
        const data = {...this.PAGES}
        const newData = {
          forselect: this.current,
          html: this.content
        }
        data[this.current] = newData
        this.$store.dispatch('UPDATE_PAGES', data)
      }
    },
    getUpdatedContent(content) {
      this.content = content
    },
  },

  computed: {
    ...mapGetters(['PAGES']),
  },

  watch: {
    currentSelect(current) {
      this.current = current
      this.content = this.PAGES[current].html
    }
  },

  components: {
    EditorForVue,
  },

  async mounted() {
    await this.$store.dispatch('FETCH_TEXTS')
  },
}
</script>

<style lang="scss">
.wrapper {
  padding: 5px;
  margin: 5px;
  border-bottom: 1xp solid black;
}
.preview {
  padding: 5px;
  margin: 5px;
  border: 1px solid grey;
  border-radius: 3px;
}
</style>

