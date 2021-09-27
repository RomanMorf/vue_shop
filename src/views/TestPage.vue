<template>
	<div>

    <FormAddProduct></FormAddProduct>
    
    <FormAddCategory></FormAddCategory>


    <button @click="fetchUserInfo">fetch INFO</button>
    <button @click="getUserInfo">get INFO</button>
    <button @click="showUserInfo">show INFO</button>

	</div>
</template>

<script>
import FormAddProduct from '@/components/Admin/FormAddProduct'
import FormAddCategory from '@/components/Admin/FormAddCategory'
import {mapGetters} from 'vuex'

export default {
	components: {
		FormAddProduct,
		FormAddCategory,
	},
  computed: {
    userInfoData() {
      return this.$store.getters.USER_INFO
    },
    ...mapGetters([
      'INFO'
    ])
  }
}
</script>