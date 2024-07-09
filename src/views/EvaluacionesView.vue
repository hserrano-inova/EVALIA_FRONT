<template>
  <div class="row">
    <VHead :data="header_data" />
    <div class="col-12">
      <STable :data="data" :columns="columns" :filters="filters" @rowClick="tb_row_click" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from '@/authreq/axios';
import STable from '@/components/smart_table/smart_table.vue'
import VHead from '@/components/navbar/viewheader.vue'

export default {
  name: 'EvaluacionesView',
  components: { VHead, STable },
  setup() {
    const router = useRouter();
    const data = ref([]);
    const filters = ref([
      { type: 'date', value: '', keys: ['nombre_subvencion'], head: 'Evaluacion' },
      { type: 'txt', value: '', keys: ['estado'], head: 'Estado' },
      { type: 'txt', value: '', keys: ['areas'], head: 'Areas' },
    ]);

    const queryData = async () => {
        await axios.get('/evaluaciones/')
        .then((response) => {
          //console.log(response.data)
          data.value=response.data
        })
        .catch((error) => {
          console.log(error)
        })
    };

    const tb_row_click = (dat) => {
      router.push({
        name: 'edata',
        query: { id: dat.row.id }
      })
    }

    onMounted(() => {
      queryData();
    })

    return {
      header_data: { title: "Evaluaciones", icon: "bi-pen", btn:[] },
      columns: ['oferta','licitacion', 'actualizada'],
      data,
      filters,
      queryData,
      tb_row_click
    };

  }
};
</script>