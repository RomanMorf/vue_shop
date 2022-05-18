<template>
  <div class="footer">
    <div class="container content">
      <div class="section">
        <h2>Shoes</h2>
        <p>
          Если вы ищете изысканную обувь,
          которая бы нравилась вам по дизайну
          и отвечала функциональным требованиям,
          и в то же время вы готовы сэкономить
          свое время, то наш интернет-магазин -
          это идеальный вариант для вас.
        </p>
      </div>
      <div class="section">
        <h2>КАТАЛОГ </h2>
        <ul>
          <li><a href="Ботинки">Ботинки</a></li>
          <li><a href="Кроссовки">Кроссовки</a></li>
          <li><a href="Туфли">Туфли</a></li>
          <li><a href="Сандалии">Сандалии</a></li>
          <li><a href="Лоферы">Лоферы</a></li>
        </ul>
      </div>
      <div class="section">
        <h2>ИНФОРМАЦИЯ</h2>
        <ul>
          <li><a class="link" @click="$router.push('/catalog')">Каталог</a></li>
          <li><a href="/delivery">Доставка</a></li>
          <li><a href="/contacts">Обратная связь</a></li>
          <li><a href="Блог">Блог</a></li>
          <li><a href="Обмен и возврат">Обмен и возврат</a></li>
          <li><a href="Пользовательское соглашение">Пользовательское соглашение</a></li>
          <li><a href="Политика конфиденциальности и оферта">Политика конфиденциальности и оферта</a></li>
        </ul>
      </div>
      <div class="section">
        <h2>+380 44 123-45-67</h2>
        <a href="">Обратный звонок</a>
      </div>
    </div>
    <div class="footer_wrapper">
      <div class="container">
        <div class="logo" @click="$router.push('/')">
          <img class="logo_img" src="../../assets/img/logo4.png" alt="">
        </div>
        <div class="social">
          <img class="social-img" src="@/assets/img/social/001-twitter.svg" alt="twitter">
          <img class="social-img" src="@/assets/img/social/002-facebook.svg" alt="facebook">
          <img class="social-img" src="@/assets/img/social/003-linkedin.svg" alt="linkedin">
          <img class="social-img" src="@/assets/img/social/004-instagram.svg" alt="instagram">
          <img class="social-img" src="@/assets/img/social/005-telegram.svg" alt="telegram">
        </div>
        <div class="copiright">
          <a href="http://www.copyright.ru/ru/documents/zashita_avtorskih_prav/znak_ohrani_avtorskih_i_smegnih_prav/">Copiright © Romario inc. 2021</a>
        </div>
      </div>
      <div class="footer_wrapper_line"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'footer',
}
</script>

<style scoped lang='scss'>
  @import 'Footer.scss';
</style>
