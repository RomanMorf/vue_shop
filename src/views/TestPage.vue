<template>
	<div>

			<FormAddProduct></FormAddProduct>
			
			<FormAddCategory></FormAddCategory>

	</div>
</template>

<script>
import FormAddProduct from '@/components/admin/FormAddProduct'
import FormAddCategory from '@/components/admin/FormAddCategory'

export default {
	components: {
		FormAddProduct,
		FormAddCategory,
	}
}
</script>