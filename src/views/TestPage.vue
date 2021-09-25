<template>
	<div>

    <FormAddProduct></FormAddProduct>
    
    <FormAddCategory></FormAddCategory>


    <button @click="getUserData">GetUserData</button>
    <button @click="getUserDataFromState">getUserDataFromState</button>

	</div>
</template>

<script>
import FormAddProduct from '@/components/Admin/FormAddProduct'
import FormAddCategory from '@/components/Admin/FormAddCategory'

export default {
	components: {
		FormAddProduct,
		FormAddCategory,
	},
	methods: {
    async getUserData() {
      const userInfo = await this.$store.dispatch('GET_USER_DATA')
      if (userInfo) {
        console.log(userInfo.uid, 'getUserData');
      } else {
        console.log(userInfo, 'no user getUserData');
      }
    },
    async getUserDataFromState() {
    
      await this.$store.dispatch('GET_UID')
      console.log(this.userInfoData, 'userInfoData');
    //   const userInfo = this.$store.getters.USER_INFO
    //   if (userInfo) {
    //     console.log(userInfo, 'getUserData');
    //   } else {
    //     console.log('no user getUserData');
    //   }
    }
	},
  computed: {
    userInfoData() {
      return this.$store.getters.USER_INFO
    }
  }
}
</script>