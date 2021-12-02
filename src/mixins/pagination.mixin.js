export default {
  data() {
    return {
      activePage: 1, // - выбранная страница
      pageLength: 5, // - кол. записей на странице
      allPages: 0, // - всего страниц для отрисовки
      allItems: [], // - массив массивов
      pageItems: [], // - массив - элемент allItems (для одной страницы)
    }
  },

  methods: {
    setupPagination(array) {
      if (this.allItems.length) {
        this.allItems = []
      }

      while (array.length) {
        this.allItems.push(array.splice(0, this.pageLength))
      }
      this.allPages = this.allItems.length

      if (this.activePage > this.allItems.length) {
        this.renderPage(this.allItems.length)
      } else {
        this.renderPage(this.activePage)
      }
    },

    renderPage(page) {
      this.pageItems = this.allItems[page - 1]
      page ? this.activePage = page : this.activePage = 1
      // if (page) {this.activePage = page}
    }
  }
}
