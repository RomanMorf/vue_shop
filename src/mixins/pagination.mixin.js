
export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageCount: 0,
      allItems: [],
      items: [],
      pageSize: 2,
    }
  },
  methods: {
    setupPagination(allItems, size) {
      this.pageSize = size

      function arrSlice (array, size) { // функция деления на массивы
        if (typeof size === 'string') { // проверка на строку. если строка - привести к числу
          size = +size
        }

        let subarray = []
        for (let i = 0; i < Math.ceil(array.length/size); i++){ // деление на массивы
            subarray[i] = array.slice((i*size), (i*size) + size);
        }
        return subarray
      }
      
      this.allItems = arrSlice(allItems, this.pageSize)
      this.pageCount = this.allItems.length
      this.items = this.allItems[this.page - 1] || this.allItems[0]

    },
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}&of=${this.allItems.length}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    },
  },
}
