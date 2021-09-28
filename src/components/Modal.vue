<template>
  <div class="window">
    <div class="window__inner">
      <div class="window__container">

        <section class="window__header header">
          <slot name="header"></slot>
        </section>
        
        <section class="window__content content">
          <slot name="content"></slot>
        </section>

        <section class="window__footer footer">
          <slot name="footer"></slot>
        </section>

        <section>
          <slot name="closeBtn">
            <span class="window__close" @click="close">
              <i class="material-icons">close</i>
            </span>
          </slot>
        </section>
        
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    windowData: {
      type: Object,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirmed');
    },
    decline() {
      this.$emit('declined');
    },

  },

}
</script>

<style lang="scss">
  .window {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .4);

    &__inner {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__container {
      min-width: 230px;
      max-width: 600px;
      min-height: 150px;
      padding: 20px;
      margin: 25px;
      position: relative;
      background-color: white;
      border-radius: 10px;

      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;

      animation-name: bounce;
      animation-timing-function: ease;
    }


    &__footer {
      display: flex;
      justify-content: space-around;

    }

    &__header, &__content {
      margin-bottom: 20px;
    }

    &__close {
      cursor: pointer;
      font-size: 16px;
      position: absolute;
      right: -10px;
      top: -10px;
      transition: all .5s;

      &:active{
          transform: scale(.8);
      }
    }
  }

</style>