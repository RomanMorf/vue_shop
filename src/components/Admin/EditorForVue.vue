<template>
  <div class="editor-wrapper">
    <vue-editor v-model="editorContent"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  name: "Editor",
  props: {
    content: String
  },
  computed: {
    editorContent: {
      get() { return this.content},
      set(updatedContent) { this.$emit('update:content', updatedContent) }
    },
  },
  components: {
    VueEditor
  }
};
</script>
