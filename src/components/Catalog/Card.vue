<template>
  <div class="card">
    <div class="card-header">
      <h3>title</h3>
    </div>
    <div class="card-main">
      description
    </div>
    <div class="card-footer">
      <button>press me !</button>
    </div>
  </div>
</template>

<script>

export default {
  
}
</script>

<style scoped lang='scss'>
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    border: 1px solid black;
    width: 250px;
    height: 300px;
    padding: 10px;
    margin-bottom: 10px;
  }
</style> 