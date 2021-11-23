<template>
  <div>
    <h1>Profiles page</h1>
    <button class="modal_btn admin_bg" @click="updateUsers">Обновить список пользователей</button>
    <p>Выбеирте поля таблицы:</p>
    <input v-model="showName" type="checkbox">Name
    <input v-model="showTel" type="checkbox">Tel
    <input v-model="showEmail" type="checkbox">Email
    <input v-model="showRole" type="checkbox">Role
    <div>
      <input type="text" v-model="search" placeholder="Search title.."/>
      <label>Search title:</label> <span>{{ search }}</span>
    </div>

    <table class="admin">
      <tbody>
        <tr>
          <td>#</td>
          <td v-show="showName">Name</td>
          <td v-show="showTel">Tel</td>
          <td v-show="showEmail">Email</td>
          <td v-show="showRole">Role</td>
        </tr>
        <tr v-for="(user, index) in USERS" :key="index" @click="userEdit(user)">
          <td >{{ index + 1 }}</td>
          <td v-show="showName" v-tooltip="user.userInfo.name">{{ user.userInfo.name }}</td>
          <td v-show="showTel" v-tooltip="user.userInfo.tel">{{ user.userInfo.tel }}</td>
          <td v-show="showEmail" v-tooltip="user.userInfo.email">{{ user.userInfo.email }}</td>
          <td v-show="showRole" v-tooltip="user.userInfo.role" class="capitalize">{{ user.userInfo.role }}
          </td>
        </tr>
      </tbody>
    </table>
    <Modal v-show="showModal" @close="showModal = !showModal"> <!-- Модальное окно -->
      <template v-slot:header>
        <h3 class="center">Редактировани епользователя</h3>
      </template>
      <template v-slot:content>
        <p>ID - {{ userForEdit.id }}</p>
        <p v-if="userForEdit.userInfo.name">ФИО - {{ userForEdit.userInfo.name }}</p>
        <p>Тел. {{ userForEdit.userInfo.tel }}</p>
        <p>Email - {{ userForEdit.userInfo.email }}</p>
        <br>
        <p>Уровень доступа - {{ userForEdit.userInfo.role }}</p>
        <p>Изменить уровень доступа:</p>
        <span v-for="(role, index) in roles" :key="index">
          <label >
            <input v-model="userForEditRole" type="radio" :value="role">
            <span class="capitalize">{{ role }}</span>
          </label>
        </span>
      </template>
      <template v-slot:bottom>
        <button class="modal_btn admin_bg admin_bg" >Сбросить пароль</button>
      </template>
      <template v-slot:footer>
        <button class="modal_btn admin_bg admin_bg" @click="saveChanges">Сохранить изменения</button>
        <button class="modal_btn admin_bg admin_bg" @click="showModal = false">Отмена</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      search: '',
      roles: ['user', 'moderator', 'admin'],
      showName: true,
      showTel: false,
      showEmail: true,
      showRole: true,
      usersList: null,

      showModal: true,
      userForEdit: {},
      userForEditRole: null,
      sorting: '',
    }
  },
  methods: {
    async updateUsers() {
      this.users = await this.$store.dispatch('FETCH_USERS')
    },
    userEdit(user) {
      this.userForEdit = user
      this.userForEditRole = user.userInfo.role
      this.showModal = true
    },
    async saveChanges() {
      try {
        const newInfo = {...this.userForEdit}
        newInfo.userInfo.role = this.userForEditRole
        await this.$store.dispatch('UPDATE_USER_INFO', newInfo)
        this.$showMessage(`Данные пользователя ${newInfo.userInfo.name} успешно изменены`, 'success')
        this.closeModal()
      } catch (error) {
        if (messages[error.code]) {
          this.$showMessage(messages[error.code], 'error')
        }
        throw error
      }
    },
    closeModal () {
      this.showModal = false

      this.userForEditRole = null
      this.userForEdit = {}
    },
  },
  computed: {
    ...mapGetters(['USERS']),
    filteredUsers() {
      return this.USERS.filter(user => {
        return user.userInfo.name.toLowerCase().includes(this.search.toLowerCase()) ||
                user.userInfo.tel.toLowerCase().includes(this.search.toLowerCase()) ||
                user.userInfo.role.toLowerCase().includes(this.search.toLowerCase()) ||
                user.userInfo.email.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  async mounted() {
    this.usersList = await this.$store.dispatch('FETCH_USERS')
  },
}
</script>

<style lang="scss">
  .capitalize {
    text-transform: capitalize;
  }
</style>
