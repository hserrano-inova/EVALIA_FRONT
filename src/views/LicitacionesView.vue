<template>
  <div class="row">
    <VHead :data="header_data" @new="newreg" />
    <div class="col-12">
      <STable :data="data" :columns="columns" :filters="filters" @rowClick="tb_row_click" />
    </div>
  </div>
</template>

<script>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from '@/authreq/axios';
import VHead from '@/components/navbar/viewheader.vue'
import STable from '@/components/smart_table/smart_table.vue'

export default {
  name: 'LicitacionesView',
  components: { VHead, STable },
  setup() {
    const router = useRouter();
    const data = ref([]);
    const filters = ref([
      { type: 'date', value: '', keys: ['nombre_subvencion'], head: 'Licitacion' },
      { type: 'txt', value: '', keys: ['estado'], head: 'Estado' },
      { type: 'txt', value: '', keys: ['areas'], head: 'Areas' },
    ]);

    const queryData = async () => {
        await axios.get('/licitaciones/')
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
        name: 'ldata',
        query: { id: dat.row.id }
      })
    }

    const newreg = () => {
      router.push({
        name: 'ldata',
        query: { id: 0 }
      })
    }

    onMounted(() => {
      queryData();
    })

    return {
      header_data: { title: "Licitaciones", icon: "bi-bank", btn: ['new'] },
      columns: ['nombre',
        'actualizada',
        'estado'],
      data,
      filters,
      queryData,
      newreg,
      tb_row_click
    };

  }
};
</script>