<template>
  <div class="list-group" v-for="file, i in data" :key="i" style="margin-bottom:5px;">
    <a href="#" :class="['list-group-item list-group-item-action', { 'active': file['filename']==selpdf }]">
      <p @click="$emit('selDoc',file['filename'] )">
        <i class="bi bi-arrow-down-right-square"></i> &nbsp;{{ file['alias'] }}
      </p>
      <i class="bi bi-trash" style="float:right" @click="$emit('delDoc',file['filename'] )"></i>

      <a v-if="file['tipo'] == 'pdf'" 
      :href="'https://evalia.inovalabs.es/api/static/pliegos/' + file['filename'] " 
      type="application/pdf" width="100%" height="600px" target="_blank" 
      :class="[ { 'awhite': file['filename'] == selpdf }]">{{ file['filename'] }}</a>

      <span v-else>{{ file['filename'] }}</span>

    </a>
    <!-- <a href="#" v-for="of, i in data.ofertas" :key="i" :class="['list-group-item list-group-item-action', { 'active': seldoc == of.id }]"></a> -->
  </div>
</template>

<script>

export default {
  name: 'ListFileGroups',
  props: ['data','selpdf'],
  emits: ['selDoc','delDoc'],
}
</script>

<style scoped>
.awhite{
  color:white
}
</style>