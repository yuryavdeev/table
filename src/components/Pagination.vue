<template>
  <!-- sortedArray - true/false - после сортировки массива -->
  <ul v-if="sortedArray" class="pagination">
    <li
      class="waves-effect"
      :class="{ disabled: activePage === 1 }"
      @click="activePage !== 1 && $emit('change-page', activePage - 1)"
    >
      <a href="#!">Назад</a>
    </li>

    <!-- allItems: [], // - массив массивов -->
    <li
      v-for="(item, idx) in allItems"
      :key="idx"
      class="waves-effect"
      :class="{ active: activePage === idx + 1 }"
      @click="$emit('change-page', idx + 1)"
    >
      <a href="#!">{{ idx + 1 }}</a>
    </li>

    <!-- allPages - всего страниц для отрисовки -->
    <li
      class="waves-effect"
      :class="{ disabled: activePage === allPages }"
      @click="activePage !== allPages && $emit('change-page', activePage + 1)"
    >
      <a href="#!">Вперед</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['activePage', 'allPages', 'allItems', 'sortedArray'],
  emits: ['change-page'],
}
</script>

<style scoped></style>
