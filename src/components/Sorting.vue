<template>
  <h4>Сортировка данных таблицы</h4>

  <div class="select__container" :class="{ divBottom: !message }">
    <label class="select__label">
      Выберите колонку
      <select class="select__list" v-model="selectColumn">
        <option value="" disabled selected>---</option>
        <option value="name">Название</option>
        <option value="amount">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
    </label>

    <label class="select__label">
      Условие сортировки
      <select class="select__list" v-model="selectСondition">
        <option value="" disabled selected>---</option>
        <option value="equals">Равно</option>
        <option value="contains">Содержит</option>
        <option v-if="selectColumn !== 'name'" value="more">Больше</option>
        <option v-if="selectColumn !== 'name'" value="less">Меньше</option>
      </select>
    </label>

    <label class="select__label">
      Введите данные
      <input
        class="input"
        :class="{ input__disabled: !selectColumn || !selectСondition }"
        :type="!selectColumn || selectColumn === 'name' ? 'text' : 'number'"
        minlength="2"
        maxlength="25"
        :value="inputValue"
        :disabled="!selectColumn || !selectСondition"
        v-model="inputValue"
        placeholder="Введите данные"
      />
      <span v-if="message">{{ message }}</span>
    </label>
  </div>
</template>


<script>
import dataArray from '../assets/data'

export default {
  // 'sort' - при всех выбранных селектах и валидном инпуте - срабатывает на каждое изменение состояния (без кнопки)
  emits: ['sort'],

  data() {
    return {
      valid: true,
      inputValue: '',
      selectColumn: '',
      selectСondition: '',
      initialArray: [],
      sortedArray: [],
      message: '',
    }
  },

  methods: {
    sort(arr) {
      this.selectColumn === 'amount'
        ? arr.sort((a, b) => a.amount - b.amount)
        : arr.sort((a, b) => a.distance - b.distance)
    },

    handleSort(oldValueInput) {
      if (this.selectColumn && this.selectСondition && !this.message) {
        this.sortedArray = [...this.initialArray]

        switch (this.selectColumn) {
          case 'name':
            if (this.selectСondition === 'equals') {
              this.sortedArray = this.sortedArray.filter(
                (item) => item.name.toLowerCase() === String(this.inputValue).toLowerCase()
              )
            } else if (this.selectСondition === 'contains') {
              this.sortedArray = this.sortedArray.filter(
                (item) => item.name.toLowerCase().indexOf(String(this.inputValue).toLowerCase()) > -1
              )
            }
            break

          case 'amount':
            if (this.selectСondition === 'equals') {
              this.sortedArray = this.sortedArray.filter((item) => +item.amount === +this.inputValue)
            } else if (this.selectСondition === 'contains') {
              this.sortedArray = this.sortedArray.filter(
                (item) => String(item.amount).indexOf(String(this.inputValue)) > -1
              )
            } else if (this.selectСondition === 'more') {
              this.sortedArray = this.sortedArray.filter((item) => item.amount > this.inputValue)
              this.sort(this.sortedArray)
            } else if (this.selectСondition === 'less') {
              this.sortedArray = this.sortedArray.filter((item) => item.amount < this.inputValue)
              this.sort(this.sortedArray)
            }
            break

          case 'distance':
            if (this.selectСondition === 'equals') {
              this.sortedArray = this.sortedArray.filter((item) => +item.distance === +this.inputValue)
            } else if (this.selectСondition === 'contains') {
              this.sortedArray = this.sortedArray.filter(
                (item) => String(item.distance).indexOf(String(this.inputValue)) > -1
              )
            } else if (this.selectСondition === 'more') {
              this.sortedArray = this.sortedArray.filter((item) => item.distance > this.inputValue)
              this.sort(this.sortedArray)
            } else if (this.selectСondition === 'less') {
              this.sortedArray = this.sortedArray.filter((item) => item.distance < this.inputValue)
              this.sort(this.sortedArray)
            }
            break
        }
      } else if (this.selectColumn && this.selectСondition && oldValueInput) {
        // при удалении ранее введенных символов в инпут (=> oldValueInput) - отрисует начальный массив
        this.sortedArray = [...this.initialArray]
      }
    },
  },

  mounted() {
    this.initialArray = [...dataArray]
  },

  watch: {
    inputValue(value, oldValue) {
      // валидация по колич. введенных символов
      if (this.selectColumn === 'name') {
        if (value.trim().length > 0 && value.trim().length < 3) {
          this.message = 'Минимум 3 и максимум 25 символов'
        } else {
          this.message = ''
        }
      } else {
        if (String(value.length) > 0 && String(value.length) < 2) {
          this.message = 'Минимум 2 и максимум 25 символов'
        } else {
          this.message = ''
        }
      }
      this.handleSort(oldValue)
    },

    selectColumn() {
      this.handleSort()
    },

    selectСondition() {
      this.handleSort()
    },

    sortedArray(value) {
      this.$emit('sort', value)
    },
  },
}
</script>


<style scoped>
.select__container {
  display: flex;
  align-items: flex-start;
  margin: 30px auto 0;
}

.divBottom {
  margin-bottom: 33px;
}

.select__label {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  width: 25%;
  color: black;
  margin-right: 20px;
  font-size: 14px;
  line-height: 1.8;
}

.select__label:last-of-type {
  flex-grow: 2;
}

.select__list {
  display: block;
  height: fit-content;
  border: solid 1px rgb(190, 190, 190);
  border-radius: 3px;
  font-size: 16px;
  outline: none;
  padding: 3px 10px;
}

.input {
  height: 31px !important;
  margin: 0 !important;
  border: 1px solid rgb(190, 190, 190) !important;
  border-radius: 3px !important;
  padding: 3px 10px !important;
  box-sizing: border-box !important;
}

.input__disabled {
  background-color: rgb(223, 223, 223) !important;
}

.input:focus {
  border: 1px solid rgb(0, 153, 133) !important;
}

span {
  color: rgb(185, 0, 0);
}
</style>
