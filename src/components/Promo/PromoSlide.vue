<template>
  <div>
    <div class="img" :style="{
        'height': + caruselHeiht + 'px',
        'width': + caruselWidth + 'px',
        'background-image': 'url(' + itemData.img + ')'
      }"
    >
      <div class="img_section">
        <h2 class="img_title">{{ itemData.title }}</h2>
        <p class="img_text">{{ itemData.text }}</p>
        <a class="img_btn" @click="$router.push('/catalog')">{{ itemData.btnTitle }}</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PromoSlide',
  props: ['itemData', 'caruselHeiht', 'caruselWidth'],
}
</script>

<style scoped lang='scss'>
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: 0 0;
  background-size: cover;
  position: relative;

  &_section {
    max-width: 45%;
    padding: 10px;
    position: absolute;
    top: 30%;
    left: 50%;
  }

  &_btn {
    margin-top: 20px;
    display: inline-block;
    padding-bottom: 5px;
    border-bottom: 2px solid rgb(224, 146, 132);
    transition: all ease .5s;

    &:hover {
      color: rgb(197, 109, 94);
      transition: all ease .5s;
    }
  }
}
</style>
