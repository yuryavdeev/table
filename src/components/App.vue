<template>
  <div class="app">
    <h1>Таблица</h1>
    <hr />
    <Table />
  </div>
</template>

<script>
import Table from './Table'

export default {
  components: { Table },
}
</script>

<style scoped>
@import '~materialize-css/dist/css/materialize.min.css';

.app {
  width: 90% !important;
  margin: auto !important;
}
</style>
