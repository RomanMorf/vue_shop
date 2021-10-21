
<template>
  <div class="tiptap">
    <div v-if="editor" class="btn unselectable ">
      <button @click="editor.commands.toggleBold()" :class="{ 'is-active': editor.isActive('bold') }">
        <span class="material-icons-outlined">
          format_bold
        </span>
      </button>
      <button @click="editor.commands.toggleItalic()" :class="{ 'is-active': editor.isActive('italic') }">
        <span class="material-icons-outlined">
          format_italic
        </span>
      </button>
      <button @click="editor.commands.toggleStrike()" :class="{ 'is-active': editor.isActive('strike') }">
        <span class="material-icons-outlined">
          format_strikethrough
        </span>
      </button>
      <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        <span class="material-icons-outlined">
          code
        </span>
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editor.commands.setBold()">
        clear nodes
      </button>
      <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        bullet list
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        blockquote
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button @click="editor.chain().focus().undo().run()">
        <span class="material-icons-outlined">
          undo
        </span>
      </button>
      <button @click="editor.chain().focus().redo().run()">
        <span class="material-icons-outlined">
          redo
        </span>
      </button>
      <button @click="sendNewContent">
        <span class="material-icons-outlined">
          save_as
        </span>
      </button>
      <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
        left
      </button>
      <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
        center
      </button>
      <button @click="editor.commands.setTextAlign('right')" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
        right
      </button>


      <input
        type="color"
        @input="editor.chain().focus().setColor($event.target.value).run()"
        :value="editor.getAttributes('textStyle').color"
      >
      <button @click="editor.chain().focus().setColor('#958DF1').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' })}">
        purple
      </button>
      <button @click="editor.chain().focus().setColor('#F98181').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#F98181' })}">
        red
      </button>
      <button @click="editor.chain().focus().setColor('#FBBC88').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#FBBC88' })}">
        orange
      </button>
      <button @click="editor.chain().focus().setColor('#FAF594').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#FAF594' })}">
        yellow
      </button>
      <button @click="editor.chain().focus().setColor('#70CFF8').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#70CFF8' })}">
        blue
      </button>
      <button @click="editor.chain().focus().setColor('#94FADB').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#94FADB' })}">
        teal
      </button>
      <button @click="editor.chain().focus().setColor('#B9F18D').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#B9F18D' })}">
        green
      </button>
      <button @click="editor.chain().focus().unsetColor().run()">
        unsetColor
      </button>

      </div>
    <div class="content">
      <editor-content :editor="editor" v-model="content"/>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'

export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      content: null
    }
  },

  methods: {
    sendNewContent() {
      this.$emit('newContent', this.content)
    }
  },

  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value
      if (isSame) {
        return
      }
      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.content = this.placeholder || `Write some text here...`

    this.editor = new Editor({
      content: this.modelValue ,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Color,
      ],
      onUpdate: () => {
        this.$emit('update', this.editor.getHTML())
      },
    })
    console.log(this.editor.commands);
    // this.editor.commands.forEach((item) => {
    //   console.log(item, 'item')
    // })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
<style lang="scss">
button {
  padding: 0;
  outline: none;
  background-color: none;
  margin: 2px;
}
.tiptap {
  padding: 0 5px;
}
.btn {
  padding: 3px;
  border: 1px solid #000;
  border-radius: 3px;
  margin-bottom: 10px;
}
.content {
  padding: 3px;
  border: 1px solid #000;
  border-radius: 3px;
}
</style>
