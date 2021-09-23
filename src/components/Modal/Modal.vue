<template>
  <div class="window">
    <div class="window_inner">
      <div class="window_container">
        <div class="window_header">Header</div>
        <div class="window_content">Content</div>
        <div class="window_footer">Footer</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

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

		&_inner {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
		}

		&_container {
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
    @keyframes bounce {
      0%   { transform: scale(1,1)    translateY(0); }
      10%  { transform: scale(1.1,.9) translateY(0); }
      30%  { transform: scale(.9,1.1) translateY(-100px); }
      50%  { transform: scale(1,1)    translateY(0); }
      100% { transform: scale(1,1)    translateY(0); }
    }
}


</style>