<template>
  <div class="list-group">
    <a href="#" v-for="of, i in data" :key="i"
      :class="['list-group-item list-group-item-action', { 'active': selof == of.id }]">
      <p @click="selOF(of.id)">
        <i class="bi bi-arrow-down-right-square"></i> &nbsp; {{ of.alias }}
      </p>
      <i v-if="!selectonly" class="bi bi-trash" style="float:right" @click="$emit('delOF',of.id)"></i>
      {{ formattedDate(of.fecha) }}
    </a>
      </div>
</template>

<script>
import {ref} from 'vue';

export default {
  name: 'OFSelector',
  props: ['data','selectonly'],
  emits: ['selOF','delOF'],

  setup(props, { emit }) {
    
    const selof = ref("")

    const formattedDate = (dateStr) => {
      const dateObj = new Date(dateStr);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const selOF = (ofid) => {
      if(props.selectonly){
        let c = confirm("Desea cargar la oferta?")
        if (c) {
          selof.value = ofid
          emit('selOF', ofid)
        } else {
          selof.value = ""
        }
      }
    }

    return { selof,formattedDate,selOF }
  } 
    
}
</script>