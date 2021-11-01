<template>
  <div>
    <form >
      <div class="form_section">
        <h2>Создание продукта</h2>
      </div>
      <div class="form_section">
        <h4>ID: {{ id }}</h4>
      </div>
      <div class="form_section">
        <input id='name' class="form_input" v-model.trim="$v.title.$model" type="text" required="">
        <label for='name' class="form_label">Введите Название товара</label>
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
      <div class="form_section">
        <input id='price' class="form_input" v-model.trim="$v.price.$model" type="number" required="">
        <label for='price' class="form_label">Введите Цену товара</label>
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
      <div class="form_section">
        <select class="form_select" v-model="currentCategory">
          <!-- <option value="" selected>Выберите категоию</option> -->
          <option class="form_option"
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.title }}
          </option>
        </select>
        <small
          class="form_helper invalid"
          v-if="$v.category.$dirty && !$v.category.required"
        >Выберите категорию
        </small>
      </div>
      <div class="form_section">
        <input id='description' class="form_input" v-model.trim="$v.description.$model" type="text" required="">
        <label for='description' class="form_label">Введите описание товара</label>
        <small
          class="form_helper invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Введите описание товара
        </small>
        <small
          class="form_helper invalid"
          v-if="$v.description.$dirty && !$v.description.minLength"
        >Поле должно содержать не меньше {{ this.$v.description.$params.minLength.min }} символов, сейчас {{ description.length }}
        </small>
      </div>
      <div class="form_section">
        <button class="modal_btn" @click.prevent="click1">Выберите фото</button>
        <input
          multiple
          type="file"
          ref="input1"
          @change="previewImage" accept="image/*"
          :style="'display: none'"
        >
      </div>
      <div class="form_section">
        <img
          v-for="(image, index) in img"
          :key="index"
          class="preview"
          :src="image"
          @click.prevent="showIndex(index)"
        >
        <div class="progress" >
          <div class="progress_line" :style="'width: ' + progress + '%'"></div>
        </div>
      </div>
      <div class="form_section">
        <button class="modal_btn"  @click.prevent="create">Загрузить на сервер</button>
      </div>


    </form>
  </div>
</template>


<script>
import firebase from 'firebase'
import "firebase/storage"
import {required, minLength, minValue } from 'vuelidate/lib/validators'

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

      img: [],
      imageData: null,
      progress: 0,
      photoData: null,
      photoDataList: null,

      currentCategory: null,
      currentColor: null,

    }
  },
  validations: {
    title: {required, minLength: minLength(4)},
    price: {required, minValue: minValue(1)},
    description: {required, minLength: minLength(20)},
    category: {required}
  },
  methods: {
    // async download() {
    //   console.log('download');
    //   const storageRef = firebase.storage().ref();

    //     // [START storage_list_all]
    //     // Create a reference under which you want to list
    //     var listRef = storageRef.child('products/'+this.id);

    //     // Find all the prefixes and items.
    //     listRef.listAll()
    //       .then((res) => {
    //         console.log(res, 'res');
    //         console.log(res.items, 'res.items');
    //         res.prefixes.forEach((folderRef) => {
    //           console.log(folderRef, 'folderRef');
    //           // All the prefixes under listRef.
    //           // You may call listAll() recursively on them.
    //         });
    //         res.items.forEach((itemRef) => {
    //           console.log(itemRef.fullPath, 'itemRef');
    //           // All the items under listRef.
    //         });
    //       }).catch((error) => {
    //         // Uh-oh, an error occurred!
    //       });
    //     // [END storage_list_all]


    // },
    showIndex(imageIndex) { // показать инфо
      console.log(imageIndex, 'imageIndex');
      console.log(this.imageData[imageIndex].name, 'this.imageData[imageIndex].name');
      this.deleteImage(this.imageData[imageIndex].name)
      this.img.splice(imageIndex, 1)
    },
    async deleteImage(name) {
      await firebase.storage().ref(`products/${this.id}/`).child(`${name}`).delete()
    },

    create () { // создать продукт
      if (this.$v.$invalid) { // проверка на валидность формы
        this.$v.$touch()
        return
      }

      const product = {
        id: this.id,
        img: this.img,
        title: this.title,
        price: this.price,
        description: this.description,

        categoryId: this.categoryId,
        categoryName: this.categoryName,
      }
      firebase.database().ref(`products/${this.id}`).set(product)
      .then((response) => {
        // console.log(response, 'response')
      })
      .catch(err => {
        // console.log(err, 'err')
      })
    },
    click1() { // выбрать инпут для загрузки файлов
      this.$refs.input1.click()
    },
    previewImage(event) { // предпоказ фото
      this.uploadValue=0;
      this.imageData = event.target.files;
      console.log(event.target.files, 'event.target.files');
      this.onUpload()
    },
    async onUpload(){ // загрузка на сервер и ипрогресс бар
      this.imageData.forEach(image => {
        const storageRef=firebase.storage().ref(`products/${this.id}/${image.name}`).put(image);
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
  },
  watch: {
    currentCategory(catId) { // следим за обновлениями - выбранная категория
      const {title} = this.categories.find(c => c.id === catId)
      this.category = title
      this.categoryId = catId
    },
    currentColor(catId) { // следим за обновлениями - выбранный цвет
      const {colorName, colorHex} = this.colorNames.find(c => c.colorHex === catId)
      this.colorName = colorName
      this.colorHex = colorHex
    }
  },

  async mounted() {
    // создать ID
    this.id = 'p-' + Date.now()
    this.categories = await this.$store.dispatch('FETCH_CATEGORIES')

  },
}
</script>

<style scoped lang="scss">
.progress {
  width: 100%;
  height: 5px;

  &_line {
    background-color: green;
    width: 0;
    height: 5px;
  }
}
.preview {
  max-width: 200px;
  max-height: 200px;
  margin-right: 10px;
}

</style>
