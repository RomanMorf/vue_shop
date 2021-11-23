<template>
  <div class="window">
    <div class="window_inner" @click="catchEvent">
      <div class="window_container">


        <section class="window_header header">
          <slot name="header"></slot>
        </section>

        <section class="window_content content">
          <slot name="content"></slot>
        </section>

        <section class="window_bottom">
          <slot name="bottom"></slot>
        </section>

        <section class="window_footer footer">
            <slot name="footer"></slot>
        </section>

        <section>
          <slot name="closeBtn">
            <span class="window_close" @click="close">
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
  name: 'Modal',
  props: {
    windowData: {
      type: Object,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    catchEvent(event) {
      if (event.target.className === 'window_inner') this.$emit('close')
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.window {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .4);

  &_inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &_container {
    min-width: 230px;
    max-width: 90vw;
    min-height: 150px;
    max-height: 90vh;
    padding: 20px;
    margin: 15px;
    position: relative;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;

  }

  &_header, &_footer {
    display: flex;
    justify-content: space-around;
  }

  &_header, &_content, &_bottom {
    margin-bottom: 20px;
  }

  &_content {
    max-height: 500px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
      background-color: #f9f9fd;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: $bg_color_main;
    }
  }

  &_close {
    cursor: pointer;
    font-size: 16px;
    position: absolute;
    right: -10px;
    top: -10px;
    transition: all .5s;
    background-color: $bg_color_main;
    border-radius: 10px;
    padding: 10px 10px 0 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    &:active,
    &:hover {
      background-color: $hover_color_main;
      box-shadow: -5px 6px 9px 3px rgb(122 122 122 / 48%);
    }
  }
}

@media (max-width: 580px){
  .window {
    &_container {
      padding: 5px;
      margin: 5px;
    }
  }
}
</style>
