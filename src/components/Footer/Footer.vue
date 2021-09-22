<template>
  <div class="footer">
    <div class="conteiner content">
      <div>
        <h2>Shoes</h2>
        <ul>
          <li>Если вы ищете изысканную обувь,</li>
          <li>которая бы нравилась вам по дизайну</li>
          <li>и отвечала функциональным</li>
          <li>требованиям,</li>
          <li>и в то же время вы готовы сэкономить</li>
          <li>свое время, то наш интернет-магазин</li>
          <li>- это идеальный вариант для вас.</li>
        </ul>
      </div>
      <div>
        <h2>КАТАЛОГ </h2>
        <ul>
          <li><a href="Ботинки">Ботинки</a></li>
          <li><a href="Кроссовки">Кроссовки</a></li>
          <li><a href="Туфли">Туфли</a></li>
          <li><a href="Сандалии">Сандалии</a></li>
          <li><a href="Лоферы">Лоферы</a></li>
        </ul>
      </div>
      <div>
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
      <div>
        <h2>+7 (495) 123-45-67</h2>
        <a href="">Обратный звонок</a>
      </div>
    </div>
    <div class="container">
      <div class="logo" @click="$router.push('/')">
        Logo
      </div>
      <div class="social">
        <img class="social-img" src="@/assets/img/social/001-twitter.svg" alt="twitter">
        <img class="social-img" src="@/assets/img/social/002-facebook.svg" alt="facebook">
        <img class="social-img" src="@/assets/img/social/003-linkedin.svg" alt="linkedin">
        <img class="social-img" src="@/assets/img/social/004-instagram.svg" alt="instagram">
        <img class="social-img" src="@/assets/img/social/005-telegram.svg" alt="telegram">
      </div>

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