<template>
  <div v-if="filter.type == 'txt'">
    <label class="col-form-label mt-2">{{ filter.head }}</label>
    <input type="text" v-model="filter.value" class="form-control form-control-sm"/>
  </div>

  <div v-else-if="filter.type == 'ddown'">
    <label class="col-form-label mt-2">{{ filter.head }}</label>
    <select class="form-control form-control-sm" v-model="filter.value">
      <option v-for="v in filter.options" :key="v">{{ v }}</option>
    </select>
  </div>

  <div v-else-if="filter.type == 'date'">
    <label class="col-form-label mt-2">{{ filter.head }}</label>
    <input class="form-control form-control-sm" type="datetime-local"
      v-model="filter.value" />
  </div>

</template>

<script>
//https://vue-smart-table.netlify.app/filtering.html#value
//https://bootswatch.com/flatly/

export default {
  name:"TxtFilter",
  props:['filter'],
  methods: {

  }
}
</script>

<style scoped>
  .m20 {
    margin-bottom: 20px;
  }
</style>