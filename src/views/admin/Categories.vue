<template>
  <div>
    <div class="flex flex-wrap mb-10">
      <button class="modal_btn admin_bg" @click="btnCreate">Create new category</button>
      <button class="modal_btn admin_bg" @click="btnEdit">Edit Category</button>
      <button class="modal_btn admin_bg ml-auto" v-if="showCreateCategory || showEditCategory" @click="btnCloseForm">Close form</button>
    </div>
    <form class="form" v-if="showEditCategory">
      <div class="form_section">
        <h2>Редактирование категории</h2>
      </div>
      <div class="form_section flex"> <!-- Category name & Category select -->
        <div class="form_cell"> <!-- Category name -->
          <input id='name' class="form_input" v-model.trim="$v.selectedTitle.$model" type="text" required="">
          <label for='name' class="form_label">Название категории</label>
          <small
            class="form_helper invalid"
            v-if="$v.selectedTitle.$dirty && !$v.selectedTitle.required"
          >Введите Название категории
          </small>
        </div>
        <div class="form_cell"> <!-- Category select -->
          <select id="form_category" class="form_select" v-model="currentCategory" required="">
            <option class="form_option"
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.title }}
            </option>
          </select>
          <label for='form_category' class="form_label">Выберите категорию товара</label>
          <small
            class="form_helper invalid"
            v-if="$v.selectedTitle.$dirty && !$v.selectedTitle.required"
          >Выберите категорию
          </small>
        </div>
      </div>
      <div class="form_section flex"> <!-- Photo download -->
        <button class="modal_btn admin_bg" @click.prevent="click1">Выберите фото <span class="material-icons">image</span></button>
        <button class="modal_btn admin_bg ml-auto" @click.prevent="cleareAllImagesOnServer">Удалить фото <span class="material-icons">delete</span></button>
        <input
          type="file"
          ref="input1"
          @change="previewImage" accept="image/*"
          :style="'display: none'"
        >
      </div>
      <div class="form_section"> <!-- Photo preview -->
        <div class="form_preview">
          <Loader v-if="loadingImg"/>
          <div class="form_preview-body">
            <img class="form_preview-img mw-100" :src="img">
            <small
              class="form_helper invalid"
              v-if="$v.img.$dirty && !$v.img.required"
            >Выберите фото
            </small>

          </div>
        </div>
      </div>
      <div class="form_section"> <!-- Category description -->
        <input id='description' class="form_input" v-model.trim="$v.description.$model" type="text" required="">
        <label for='description' class="form_label">Краткое описание категории</label>
        <small
          class="form_helper invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Введите описание
        </small>
      </div>
      <div class="form_section flex"> <!-- buttons section -->
        <button class="modal_btn admin_bg" @click.prevent="editCategory">Сохранить</button>
        <button class="modal_btn admin_bg ml-auto" @click.prevent="deleteCategory">Удалить</button>
        <button class="modal_btn admin_bg" type="reset">Очистить форму</button>
      </div>
    </form>
    <form class="form" v-if="showCreateCategory">
      <div class="form_section"> <!-- Category ID -->
        <h2>Создание новой категории</h2>
      <h4>ID: {{ categoryId }}</h4>
      </div>
      <div class="form_section flex"> <!-- Category name & Category select -->
        <input id='name' class="form_input" v-model.trim="$v.selectedTitle.$model" type="text" required="">
        <label for='name' class="form_label">Название категории</label>
        <small
          class="form_helper invalid"
          v-if="$v.selectedTitle.$dirty && !$v.selectedTitle.required"
        >Введите Название категории
        </small>
      </div>
      <div class="form_section flex"> <!-- Photo download -->
        <button class="modal_btn admin_bg" @click.prevent="click1">Выберите фото <span class="material-icons">image</span></button>
        <button class="modal_btn admin_bg ml-auto" @click.prevent="cleareAllImagesOnServer">Удалить фото <span class="material-icons">delete</span></button>
        <input
          type="file"
          ref="input1"
          @change="previewImage" accept="image/*"
          :style="'display: none'"
        >
      </div>
      <div class="form_section"> <!-- Photo preview -->
        <div class="form_preview">
          <Loader v-if="loadingImg"/>
          <div class="form_preview-body">
            <img class="form_preview-img mw-100" :src="img">
            <small
              class="form_helper invalid"
              v-if="$v.img.$dirty && !$v.img.required"
            >Выберите фото
            </small>

          </div>
        </div>
      </div>
      <div class="form_section"> <!-- Category description -->
        <input id='description' class="form_input" v-model.trim="$v.description.$model" type="text" required="">
        <label for='description' class="form_label">Краткое описание категории</label>
        <small
          class="form_helper invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Введите описание
        </small>
      </div>
      <div class="form_section flex"> <!-- buttons section -->
        <button class="modal_btn admin_bg" @click.prevent="createCategory">Создать</button>
        <button class="modal_btn admin_bg ml-auto" type="reset">Очистить форму</button>
      </div>
    </form>
      <h4>Categoty list</h4>

    <div class="flex-wrap">
      <div class="category mb-10" v-tooltip="'Редактировать'" v-for="cat in categories" :key="cat.id" @click="startEditCategory(cat)">
        <p>{{ cat.title }}</p>
        <p>{{ cat.id }}</p>
        <img :src="cat.img" :alt="cat.title">
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

import messages from '@/utils/messages'
import {required} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      description: '',
      selectedTitle: '',
      categoryId: '',
      categories: [],
      img: null,
      imageData: null,
      progress: 0,
      currentCategory: null,


      showModal: false,
      loading: true,
      loadingImg: false,
      showCreateCategory: false,
      showEditCategory: false,
    }
  },

  methods: {
    btnCreate() { // показать форму создния новой категории
      this.clearForm()
      this.showEditCategory = false
      this.showCreateCategory = true
      this.categoryId = 'cat-' + Date.now()
    },
    btnEdit() { // показать форму редактирования
      this.clearForm()
      this.showCreateCategory = false
      this.showEditCategory = true
    },
    btnCloseForm() { // закрыть форму
      this.clearForm()
      this.showCreateCategory = false
      this.showEditCategory = false
    },


    async createCategory() { // вызываем создание категории
      if (this.$v.$invalid) { // проверка на валидность формы
        this.$v.$touch()
        return
      }
      const data = {
        id: 'cat-' + Date.now(),
        title: this.selectedTitle,
        description: this.description || '',
        img: this.img || '',
      }
      try {
        await this.$store.dispatch('CREATE_CATEGORY', data)
        await this.fetchCategories()
        this.$success(`Категория "${this.selectedTitle}" - была создана`)
        this.fetchCategories()
        this.clearForm()
      } catch (error) {
        if (messages[error.code]) {
          this.$error(messages[error.code])
        }
        if (messages[error.message]) {
          this.$error(messages[error.message])
        }
        throw error
      }
    },
    async editCategory() { // вызываем редактирование категории
      if (this.$v.$invalid) { // проверка на валидность формы
        this.$v.$touch()
        return
      }
      const editedCategory = {
        id: this.categoryId,
        title: this.selectedTitle,
        description: this.description || '',
        img: this.img || '',
      }
      try {
        await this.$store.dispatch('EDIT_CATEGORY', editedCategory)
        await this.fetchCategories()
        this.$success(`Категория '${this.selectedTitle}' - успешно изменена `)
      } catch (error) {
        if (messages[error.code]) {
          this.$error(messages[error.code])
        }
        if (messages[error.message]) {
          this.$error(messages[error.message])
        }
        throw error
      }
    },
    async fetchCategories() { // запрашиваем категории
      this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
    },
    async deleteCategory() { // запрашиваем удаление категории
      if (this.$v.$invalid) { // проверка на валидность формы
        this.$v.$touch()
        return
      }
      const categoryForDelete = {
        id: this.selectedId,
      }
      try {
        await this.$store.dispatch('DELETE_CATEGORY', categoryForDelete)
        await this.fetchCategories()
        this.$success(`Категория '${this.selectedTitle}' - успешно удалена `)
        this.selectedTitle = ''
        this.description = ''
        this.selectedId = ''
      } catch (error) {
        if (messages[error.code]) {
          this.$error(messages[error.code])
        }
        if (messages[error.message]) {
          this.$error(messages[error.message])
        }
        throw error
      }
    },
    startEditCategory (cat) {
      this.btnEdit()
      console.log(cat, 'cat');
      this.img = cat.img
      this.selectedTitle = cat.title
      this.description = cat.description
      this.currentCategory = cat.id
    },


    async cleareAllImagesOnServer() {
      await this.$store.dispatch('DELETE_ALL_ITEMS_IN_FOLDER', this.categoryId)
      this.imageDataArr = []
      this.imageData = null
      this.img = []
    },

    click1() { // выбрать инпут для загрузки файлов
      this.$refs.input1.click()
    },
    previewImage(event) { // предпоказ фото
      this.imageData = null
      this.uploadValue=0;
      this.imageData = event.target.files;
      this.onUpload()
    },
    async onUpload(){ // загрузка на сервер и ипрогресс бар
      this.imageData.forEach((image, imgIndex) => {
        const extension = image.name.split('.')
        // даем имя файлу - как ID продукта + порядковый номер
        console.log(this.categoryId, 'this.categoryId');
        const storageRef=firebase.storage().ref(`categories/${this.categoryId}/${this.categoryId}-img.${extension[extension.length - 1]}`).put(image);
        storageRef.on(`state_changed`,
          snapshot=>{
            this.loadingImg = true
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            this.progress = this.uploadValue
          },
          error=>{console.log(error.message, 'error.message')},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    this.loadingImg = false
                    this.img = url
                    console.log(this.img, 'this.img');
                  });
                }
          )
        }
      )
    },

    clearForm() { // очистить форму
      this.title = ''
      this.description = ''
      this.selectedTitle = ''
      this.description = ''
      this.categoryId = ''
      this.img = ''
      this.imageData = null
      this.progress = 0
    }
  },

  watch: {  // следим за обновлениями в данном объекте
    currentCategory(catId) {
      const {title, img, description} = this.categories.find(c => c.id === catId)
      this.selectedTitle = title
      this.categoryId = catId
      this.description = description
      this.img = img
    }
  },

  validations: {
    selectedTitle: {required},
    description: {required},
    img: {required}
  },

  async mounted() { // запрашиваем категории при загрузке страницы
      this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
  },

}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.category {
  padding: 5px;
  border: 1px solid black;
  transition: all .5s ease;
  border-radius: 5px;
  max-width: 40%;
  margin: 5px;
  overflow: hidden;
  
  &:hover {
    transition: all .5s ease;
    box-shadow: $box_shadow_main;
  }
  img {
    max-width: 200px;
    max-height: 200px;
  }
}
</style>
