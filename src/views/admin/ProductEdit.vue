<template>
  <div>
    <Loader v-if="loading"/> <!-- Loader -->
    <button class="modal_btn admin_bg ml-auto"  @click="$router.push(`/admin/products`)"> <!-- Вернуться назад btn -->
      Вернуться назад
      <span class="material-icons">keyboard_return</span>
    </button>
    <form class="form">
      <div class="form_section"> <!-- Title -->
        <h2 v-if="$route.params.id">Редактирование продукта </h2>
        <h2 v-else>Создание продукта</h2>
      </div>
      <div class="form_section"> <!-- ID -->
        <p>ID: {{ id }}</p>
      </div>
      <div class="form_section"> <!-- Name -->
        <input id='name' class="form_input" v-model.trim="$v.title.$model" type="text" required="">
        <label for='name' class="form_label">Название товара</label>
        <small
          class="form_helper invalid"
          v-if="$v.title.$dirty && !$v.title.required"
        >Введите Название товара
        </small>
        <small
          class="form_helper invalid"
          v-if="$v.title.$dirty && !$v.title.minLength"
        >Поле должно содержать не меньше {{ this.$v.title.$params.minLength.min }} символов
        </small>
      </div>
      <div class="form_section flex"> <!-- Price & Category -->
        <div class="form_cell"> <!-- Price -->
          <input id='price' class="form_input" v-model.trim="$v.price.$model" type="number" required="">
          <label for='price' class="form_label">Укажите цену</label>
          <small
            class="form_helper invalid"
            v-if="$v.price.$dirty && !$v.price.required"
          >Введите Название товара
          </small>
          <small
            class="form_helper invalid"
            v-if="$v.price.$dirty && !$v.price.minValue"
          >Цена не может быть меньше <strong>{{ this.$v.price.$params.minValue.min }}</strong>, или отрицательной
          </small>
        </div>
        <div class="form_cell"> <!-- Category -->
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
            v-if="$v.categoryName.$dirty && !$v.categoryName.required"
          >Выберите категорию
          </small>
        </div>
      </div>
      <div class="form_section flex"> <!-- Photo -->
        <button class="modal_btn admin_bg" @click.prevent="click1">Выберите фото <span class="material-icons">image</span></button>
        <button class="modal_btn admin_bg ml-auto" @click.prevent="cleareAllImagesOnServer">Удалить все фото <span class="material-icons">delete</span></button>
        <input
          multiple
          type="file"
          ref="input1"
          @change="previewImage" accept="image/*"
          :style="'display: none'"
        >
      </div>
      <div class="form_section"> <!-- Progress -line -->
        <div class="form_progress" >
          <div class="form_progress-line" :style="'width: ' + progress + '%'"></div>
        </div>
        <div class="form_preview">
          <transition-group name="table" mode="list">
          <div class="form_preview-body" v-for="(image, index) in img" :key="index" >
            <span
              class="material-icons form_preview-btn"
              @click.prevent="deleteImage(index)"
            >clear
            </span>
            <img class="form_preview-img" :src="image">
          </div>
          </transition-group>
        </div>
      </div>
      <div class="form_section"> <!-- Description -->
        <EditorForVue :content="description" @update:content="getUpdatedContent"/>
      </div>
      <div class="form_section flex"> <!-- Botton section -->
        <button class="modal_btn admin_bg"  @click.prevent="createProduct">
          Сохранить карту товара
          <span class="material-icons">save</span>
        </button>
        <button class="modal_btn admin_bg ml-auto"  @click.prevent="clearForm">
          Очистить форму
          <span class="material-icons">backspace</span>
        </button>
      </div>
    </form>
    <Modal v-show="showModal" @close="showModal = !showModal"> <!-- Модальное окно -->
      <template v-slot:content>
        <h4 class="center">Заполните все обязательные поля формы</h4>
      </template>
      <template v-slot:footer>
        <button class="modal_btn admin_bg admin_bg" @click="showModal = !showModal">Ок</button>
      </template>
    </Modal>
  </div>
</template>


<script>
import firebase from 'firebase'
import "firebase/storage"
import {required, minLength, minValue } from 'vuelidate/lib/validators'

import EditorForVue from '@/components/Admin/EditorForVue'

export default {
  data () {
    return {
      id: '',
      title : '',
      price: '',
      description: '',
      categoryName: '',
      categoryId: '',
      category: '',
      categories: [],

      imgCounter: 0,
      img: [],
      imageData: null,
      imageDataArr: [],

      product: null,

      progress: 0,

      currentCategory: null,
      currentColor: null,

      showModal: false,
      loading: true,
    }
  },
  validations: {
    title: {required, minLength: minLength(4)},
    price: {required, minValue: minValue(1)},
    categoryName: {required}
  },
  methods: {
    generateId() {
      this.id = 'p-' + Date.now()
    },
    clearForm() {
      this.generateId()
      this.title = ''
      this.price = ''
      this.img = []
      this.description = ''
      this.currentCategory = ''
    },

    async cleareAllImagesOnServer() {
      await this.$store.dispatch('DELETE_ALL_ITEMS_IN_FOLDER', this.id)
      this.imageDataArr = []
      this.imageData = null
      this.img = []
    },
    deleteImage(imageIndex) { // показать инфо
      console.log(imageIndex, 'imageIndex');
      const tempArr = this.img[imageIndex].split('%2F')
      const imgName = tempArr[tempArr.length - 1].split('?alt=media')
      console.log(imgName, 'tempArr');

      const fileForDelete = {
        pathToFile: 'products/'+tempArr[1],
        fileName: imgName[0],
      }
      this.img.splice(imageIndex, 1)
      this.$store.dispatch('DELETE_ITEM', fileForDelete)
    },

    createProduct () { // создать продукт
      if (this.$v.$invalid) { // проверка на валидность формы
        this.$v.$touch()
        this.showModal = true
        return
      }

      try {
        const product = {
          id: this.id,
          img: this.img,
          title: this.title,
          price: this.price,
          description: this.description,
          categoryId: this.categoryId,
          categoryName: this.categoryName,
        }
        this.$store.dispatch('CREATE_PRODUCT', product)

        if (this.$route.params.id) {
          this.$showMessage(`Продукт ${this.title} успешно изменен`, 'success')
        } else {
          this.$showMessage(`Продукт ${this.title} успешно создан`, 'success')
          this.clearForm()
        }

      } catch (error) {
        this.$showMessage(error.message, 'error')
        throw error
      }
    },
    click1() { // выбрать инпут для загрузки файлов
      this.$refs.input1.click()
    },
    previewImage(event) { // предпоказ фото
      this.imageData = null
      this.uploadValue=0;
      this.imageData = event.target.files;
      this.imageDataArr.push(...event.target.files)
      this.onUpload()
    },
    async onUpload(){ // загрузка на сервер и ипрогресс бар
      this.imageData.forEach((image, imgIndex) => {
        this.imgCounter ++
        const extension = image.name.split('.')
        // даем имя файлу - как ID продукта + порядковый номер
        const storageRef=firebase.storage().ref(`products/${this.id}/${this.id}-img-${this.imgCounter}.${extension[extension.length - 1]}`).put(image);
        storageRef.on(`state_changed`,
          snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            this.progress = this.uploadValue
          },
          error=>{console.log(error.message, 'error.message')},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    this.img.push(url)
                  });
                }
          )
        }
      )
    },
    getUpdatedContent(content) {
      this.description = content
    }
  },
  watch: {
    currentCategory(catId) { // следим за обновлениями - выбранная категория
      const {title} = this.categories.find(c => c.id === catId)
      this.categoryName = title
      this.categoryId = catId
    },
    currentColor(catId) { // следим за обновлениями - выбранный цвет
      const {colorName, colorHex} = this.colorNames.find(c => c.colorHex === catId)
      this.colorName = colorName
      this.colorHex = colorHex
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
    const id = this.$route.params.id
    if (id) {
      this.product = await this.$store.dispatch('FETCH_PRODUCT_BY_ID', id)
    }
    if (this.product) {
      this.id = this.product.id || 'this product do not have ID'
      this.title = this.product.title || ''
      this.price = this.product.price || ''
      this.img = this.product.img || []
      this.description = this.product.description || ''
      this.currentCategory = this.product.categoryId
    }

    this.id = id ||'p-' + Date.now()

    this.loading = false
  },
  components: {
    EditorForVue,
  }
}
</script>

