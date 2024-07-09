<template>
  <div>
    <br/>
    <div class="row">
      <div class="col-2">
        <label class="form-label">Puntuacion MAX</label>
        <input required type="number" class="form-control bold-inputbox" v-model="data.secciones[row].puntuacion" />
      </div>
      <div class="col-3"></div>
      <div class="col-3">
        <button v-if="data.secciones[row].puntuacion>0 && data.secciones[row].pliego!='' && data.secciones[row].criterio!=''"  
          @click="$emit('evalTab', row)" type="button" class="btn btn-sm btn-warning">
          <i class="bi bi-pen"></i>&nbsp;Evaluacion parcial
        </button>
      </div>
      <div class="col-3" style="text-align: right">
        <button @click="$emit('delTab', row)" type="button" class="btn btn-sm btn-danger">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <label class="form-label">Pliego</label>
        <textarea v-model="data.secciones[row].pliego" rows="10"
          class="form-control is-valid"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <label class="form-label">Criterio</label>
        <textarea v-model="data.secciones[row].criterio" rows="10"
          class="form-control is-valid"></textarea>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: 'TxtAreaTab',
  props: ['data', 'row']
}
</script>