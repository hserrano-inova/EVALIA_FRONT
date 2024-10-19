<template>
  <div class="list-group" v-for="file, i in data" :key="i">
    <a href="#" class="list-group-item list-group-item-action">
      <p>
        <i class="bi bi-arrow-down-right-square"></i> &nbsp;{{ file['alias'] }}
      </p>
      <i class="bi bi-trash" style="float:right"></i>
      
      <a v-if="file['tipo'] == 'pdf'" :href="'https://evalia.inovalabs.es/api/static/pliegos/' + file['filename'] " type="application/pdf" width="100%" height="600px" target="_blank">{{ file['filename'] }}</a>

    </a>
    <!-- <a href="#" v-for="of, i in data.ofertas" :key="i"
      :class="['list-group-item list-group-item-action', { 'active': seldoc == of.id }]">
      <p @click="selDoc(of.id)">
        <i class="bi bi-arrow-down-right-square"></i> &nbsp; {{ of.alias }}
      </p>
      <i class="bi bi-trash" style="float:right" @click="delDoc(of.id)"></i>
      {{ formattedDate(of.fecha) }}
    </a> -->
  </div>
</template>

<script>

export default {
  name: 'ListFileGroups',
  props: ['data'],
  setup(props, { emit }) {

    return {
      
    }
  }
}
</script>