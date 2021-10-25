<template>
  <div class="home">
    <h1 class="center">This is an home page</h1>
    <Loader v-if="isLoading"></Loader>
    <div class="section">

      <CaruselLarge
        :caruselData="carusel"
        :caruselWidth="1100"
        :caruselHeiht="400"
      />
    </div>
    <div class="section">
      <CatalogBlock></CatalogBlock>
    </div>
    <div class="section">
      <CategoryBlock></CategoryBlock>
      <CategoryBlock></CategoryBlock>
      <CategoryBlock></CategoryBlock>
    </div>
    <div class="section colum">
      <h2 class="title">ПОЧЕМУ НАС ВЫБИРАЮТ</h2>
      <div class="cards">
        <div class="card">
          <span class="material-icons-outlined md-48">ring_volume</span>
          <h3 class="card_title">САМАЯ ЛУЧШАЯ РАССЫЛКА</h3>
          <p class="card_description">Всё подскажем и расскажем. Звоните нам в любое время</p>
          <BTN></BTN>
        </div>
        <div class="card">
          <span class="material-icons-outlined md-48">airport_shuttle</span>
          <h3 class="card_title">ДОСТАВКА БЫСТРАЯ КАК КОМЕТА</h3>
          <p class="card_description">Доставим в рекордное время</p>
          <BTN></BTN>
        </div>
        <div class="card">
          <span class="material-icons-outlined md-48">accessibility_new</span>
          <h3 class="card_title">САМЫЕ ПОСЛЕДНИЕ НОВИНКИ</h3>
          <p class="card_description">Мы еще те модники. Одевайтесь с нами</p>
          <BTN></BTN>
        </div>
        <div class="card">
          <span class="material-icons-outlined md-48">account_balance_wallet</span>
          <h3 class="card_title">УДОБНЫЕ СПОСОБЫ ОПЛАТЫ</h3>
          <p class="card_description">Твои кроссы долетят даже до Антарктиды</p>
          <BTN></BTN>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBlock from '@/components/CategoryBlock/CategoryBlock.vue'
import CatalogBlock from '@/components/CatalogBlock/CatalogBlock.vue'
import BTN from '@/components/Buttons/ButtonBorderHiden.vue'
import CaruselLarge from '@/components/CaruselLarge/CaruselLarge.vue'

export default {
  name: 'Home',
  data() {
    return {
      isLoading: false,
      carusel:[
        { img:'https://static-sl.insales.ru/files/1/7093/11598773/original/slide1_2048x800_crop_top.webp',
          title: 'Title for post',
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minima aspernatur ducimus suscipit nesciunt laborum consequuntur repudiandae nemo? Doloremque nulla totam iusto corrupti voluptas adipisci sunt consequuntur, et inventore vero!',
          btnTitle: 'В каталог',
          btnUrl: '/catalog',
        },
        { img:'https://static-sl.insales.ru/files/1/7101/11598781/original/slide2_2048x800_crop_top.webp',
          title: 'Title for post',
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minima aspernatur ducimus suscipit nesciunt laborum consequuntur repudiandae nemo? Doloremque nulla totam iusto corrupti voluptas adipisci sunt consequuntur, et inventore vero!',
          btnTitle: 'В каталог',
          btnUrl: '/catalog',
        },
        { img:'https://static-sl.insales.ru/files/1/7231/11598911/original/slide3_2048x800_crop_top.webp',
          title: 'Title for post',
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minima aspernatur ducimus suscipit nesciunt laborum consequuntur repudiandae nemo? Doloremque nulla totam iusto corrupti voluptas adipisci sunt consequuntur, et inventore vero!',
          btnTitle: 'В каталог',
          btnUrl: '/catalog',
        },
      ],
    }
  },
  components: {
    CategoryBlock,
    BTN,
    CatalogBlock,
    CaruselLarge,
  }
}


</script>

<style scoped lang="scss">
  .section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &.colum {
      flex-direction: column;
    }
  }

  .material-icons-outlined.md-48 {
    font-size: 48px;
  }

  .cards {
    display: flex;
    justify-content: space-between;
  }

  .card {
    width: 100%;
    margin: 10px;
  }

</style>
