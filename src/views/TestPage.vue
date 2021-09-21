<template>
	<div>

			<FormAddProduct></FormAddProduct>
			<FormAddCategory></FormAddCategory>

	</div>
</template>

<script>
import FormAddProduct from '@/components/Admin/FormAddProduct'
import FormAddCategory from '@/components/Admin/FormAddCategory'

export default {
	components: {
		FormAddProduct,
		FormAddCategory,
	}
}
</script>