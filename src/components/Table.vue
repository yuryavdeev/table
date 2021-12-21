<template>
  <div>
    <Sorting @sort="sortData" />
    <hr />

    <table v-if="sortedArray" class="highlight">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Расстояние</th>
        </tr>
      </thead>

      <tbody>
        <!-- pageItems - из миксины - массив записей на одну страницу -->
        <tr v-for="item in pageItems" :key="item.code">
          <td>
            {{ item.date }}
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.amount }}
          </td>
          <td>
            {{ item.distance }}
          </td>
        </tr>
      </tbody>
    </table>

    <h5 v-else>Ничего не найдено по заданным критериям поиска!</h5>

    <Pagination
      :activePage="activePage"
      :allItems="allItems"
      :allPages="allPages"
      :sortedArray="sortedArray"
      @changePage="renderPage"
    />
  </div>
</template>

<script>
  import dataArray from '../assets/data'
  import Sorting from './Sorting.vue'
  import Pagination from './Pagination.vue'
  import paginationMixin from '../mixins/pagination.mixin'

  export default {
    mixins: [paginationMixin],

    data() {
      return {
        sortedArray: true,
      }
    },

    methods: {
      sortData(sortedArray) {
        sortedArray.length ? (this.sortedArray = true) : (this.sortedArray = false)
        this.setupPagination(sortedArray)
      },
    },

    mounted() {
      this.setupPagination(dataArray)
    },

    components: {
      Sorting,
      Pagination,
    },
  }
</script>

<style scoped>
  th:first-of-type,
  th:last-of-type,
  th:nth-last-of-type(2) {
    width: 15%;
  }
</style>
