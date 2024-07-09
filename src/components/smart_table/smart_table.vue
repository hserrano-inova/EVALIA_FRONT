<template>
  <div class="row">
    <div class="col-2" v-for="f in filters" :key="f.head">
      <TxtFilter :filter="f" />
    </div>
  </div>
  <div v-if="data">
    <VTable :data="data" :filters="filters" class="table table-hover table-striped td-border">
      <template #head>
        <tr>
          <th scope="col" v-for="c in columns" :key="c">{{ c }}</th>
          <th scope="col" v-if="crud"></th>
          <th scope="col" v-if="crud"></th>
        </tr>
      </template>
      <template #body="{ rows }">
        <tr v-for="row,i in rows" :key="i" @click="$emit('rowClick', {row:row,pos:i})">
          <td  v-for="(v, k) in filteredItems(row)" :key="k">{{ v }}</td>
          <td v-if="crud" style="width:20px">
            <button class="btn btn-sm btn-success" @click="$emit('row_update_push', row)">
              <i class="bi bi-arrow-clockwise"></i></button>
          </td>
          <td v-if="crud" style="width:20px">
            <button class="btn btn-sm btn-danger" @click="$emit('row_del_push', row)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </template>
    </VTable>
  </div>
</template>

<script>
import TxtFilter from '@/components/smart_table/txt_filter.vue';
//import { computed } from 'vue'

export default {
  components: { TxtFilter },
  props: {
    data: Array,
    columns: Array,
    filters: Object,
    crud: Object
  },
  setup(props) {
    const filteredItems = (row) => {
      return Object.fromEntries(
        Object.entries(row).filter(([key]) => {
          return key !== '_id' && props.columns.includes(key);
        })
      );
    };

    return {
      filteredItems,
    };
  },
}
</script>

<style scoped>
table.td-border td {
  border-right: 1px solid rgb(196, 196, 196);
}
</style>