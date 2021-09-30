<template>
  <div class="home">
    <h1 class="center">This is an home page</h1>
    <Loader v-if="isLoading"></Loader>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBlock from '@/components/CategoryBlock/CategoryBlock.vue'
import CatalogBlock from '@/components/CatalogBlock/CatalogBlock.vue'
import BTN from '@/components/Buttons/ButtonBorderHiden.vue'

export default {
  name: 'Home',
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    CategoryBlock,
    BTN,
    CatalogBlock,
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
