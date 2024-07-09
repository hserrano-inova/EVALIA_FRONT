<template>
  
  <div class="row alert_mtop" v-if="errshow">
    <div :class="['alert alert-dismissible',{'alert-success': errtype == 0, 'alert-danger': errtype == 1}]">
      <button type="button" class="btn-close" data-bs-dismiss="alert" @click="closeaviso"></button>
      <p class="mb-0">{{ errtxt }}</p>
    </div>
  </div>

  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">


    <h3><i :class=[data.icon]></i>&nbsp;{{ data.title }}</h3>
    <div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group me-2">
        <button v-if="data.btn.includes('new')" type="button" class="btn btn-sm btn-primary"
          @click="$emit('new')">New</button>
        <button v-if="data.btn.includes('save')" type="button" class="btn btn-sm btn-success"
          @click="$emit('save')">Save</button>
        <button v-if="data.btn.includes('del')" type="button" class="btn btn-sm btn-danger"
          @click="deleteConfirm">Delete</button>
        <button v-if="data.btn.includes('print')" type="button" class="btn btn-sm btn-info"
          @click="$emit('printBnt')"><i class="bi bi-printer">&nbsp;Imprimir</i></button>
        <!-- <button v-if="data.btn.includes('export')" type="button" class="btn btn-sm btn-info"
          @click="$emit('export')">Export</button> -->
        <!-- <input v-if="data.btn.includes('date')" class="btn btn-sm btn-secondary" type="datetime-local" id="meeting-time"
          name="meeting-time" value="2018-06-12T19:30" min="2018-06-07T00:00" max="2018-06-14T00:00"
          @change="$emit('datechange')" /> -->
      </div>
    </div>


  </div>
</template>

<script>
import {ref, defineComponent} from 'vue';

export default defineComponent({
  name: 'VHead',
  props: ['data'],
  emits: ['new','save','del'],
  setup(props,{emit}) {
    const errshow = ref(false)
    const errtype = ref(1)
    const errtxt = ref('uno dos tres cuatro cinco y seis')

    const closeaviso = () => {
      errshow.value = false
    }
    const showaviso = (tipo, txt) => {
      errshow.value = true
      errtype.value = tipo
      errtxt.value = txt
      //setTimeout(closeaviso, 3000)
    }

    const deleteConfirm = () => {
      if (confirm('Estas segur@?')) {
        if (confirm('Se va a proceder a eliminar este registro')) {
          emit('del')
          //emit in vuejs3?

        }
      }
    }
    return {
      errshow,
      errtype,
      errtxt,
      closeaviso,
      showaviso,
      deleteConfirm
    }
  },
})
</script>

<style scoped>
.alert_mtop {
  margin-top: 20px;
}
</style>