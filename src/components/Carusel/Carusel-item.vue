<template>
  <div>
    <div class="img_wrapper" :style="{'height': + caruselHeiht + 'px', 'width': + caruselWidth + 'px'}">
      <img :src="itemData" :style="{'max-height': + caruselHeiht + 'px', 'max-width': + caruselWidth + 'px'}">
    </div>
  </div>
</template>

<script>

export default {
  name: 'CaruselItem',
  props: ['itemData', 'caruselHeiht', 'caruselWidth'],
}
</script>

<style scoped lang='scss'>
.img_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 