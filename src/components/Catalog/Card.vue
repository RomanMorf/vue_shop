<template>
  <div class="card">
    <div class="card_img">
      <p class="card_category">Category</p>
      <div class="card_category_favorite">
      </div>
      <div class="card_category_check"></div>
    </div>  
    <div class="card_info">
      <h3 class="card_title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi non sunt recusandae alias omnis qui?</h3>
      <div>
        <p class="card_info_color">Color</p>
        <span class="card_info_btn white">Firs</span>
        <span class="card_info_btn black">Second</span>
      </div>
      <p class="card_info_price">1200 UAH</p>
      <div class="card_busket">Busket</div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cardItem: [
        {id: 1, name: 'title'}
      ]
    }
  },
}
</script>

<style scoped lang='scss'>
  p {
    padding: 0;
    margin: 0;
  }
  .card {
    margin: 10px;
    width: 330px;
    min-height: 550px;
    border-radius: 5px;
    transition: all .1s ease-in-out;
    position: relative;
    &:hover {
      box-shadow: 0 0 2px 3px rgba(206, 201, 201, 0.425);
      transition: all .1s ease-in-out;
    }

    &_category{
      position: absolute;
      padding: 5px 10px;
      border-radius: 3px;
      background-color: #fff;
      top: 10px;
      left: 10px;

      &_favorite {
        position: absolute;
        background-image: url(../../assets/favorite_border_black_24dp.svg);
        background-size: cover;
        height: 30px;
        width: 30px;
        right: 10px;
        top: 10px;
        transition: all .3s ease-in;
        
        &:hover {
          transform:scale(1.2);
          transition: all .3s ease-in;

        }
      }

      &_check {
        position: absolute;
        background-image: url(../../assets/sync_alt_black_24dp.svg);
        background-size: cover;
        height: 30px;
        width: 30px;
        right: 10px;
        top: 50px;
        transition: all .3s ease-in;
        
        &:hover {
          transform:scale(1.2);
          transition: all .3s ease-in;

        }
      }
    }

    &_img {
      background-image: url(https://static-sl.insales.ru/images/products/1/4151/301322295/large_13748509-1-blackleather.jpeg);
      background-position: center;
      height: 350px;
      background-size: cover;
      transition: all 300ms;


      &:hover {
        background-image: url(	https://static-sl.insales.ru/images/products/1/4153/301322297/large_13748509-3.jpeg);
        transition: all 300ms;

      }
    }
    
    &_title {
      
    }
    &_info {
      padding: 10px;

      &_color {
        font-weight: 300;
        font-size: 13px;
      }

      &_btn {
        border: 1px solid gray;
        margin-right: 5px;
        padding: 5px 10px;
        display: inline-block;
        border-radius: 3px;


        &.white {
          background-color: white;
          color: black;
        }

        &.black {
          background-color: black;
          color: white;
        }

        &.brown {
          background-color: rgb(131, 64, 1);
          color: black;
        }

        &:hover {
          box-shadow: 0 0 3px 5px rgba(206, 201, 201, 0.425);
          
        }
      }

      &_price {
        font-weight: bold;
        margin-top: 15px;

      }
    }

    &_busket {
      border-bottom: 2px solid rgb(165, 165, 165);
      width: 50px;
      margin: 10px 0;
      padding: 5px 0;
      font-weight: bold;
      transition: all .2s ease-in;

      &:hover {
        color: rgb(165, 165, 165);
        transition: all .2s ease-in;
      }
    }
  }
</style> 