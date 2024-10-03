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
      <hr/>
      <div class="col-2">
        <button v-if="data.licitacion_fname!=''"  @click="loadPages" class="btn btn-info btn-sm" >
          <i class="bi bi-file-earmark-text"></i>&nbsp;Cargar Pliego
        </button>
      </div>
      
        <div class="col-9">
          <input type="text" class="form-control" placeholder="Consulta sobre pliego" v-model="pliegoQueryText">
        </div>
        <div class="col-1">
          <button type="submit" class="btn btn-primary mb-3" @click="$emit('pliegoQuery',[row, pliegoQueryText])">
            <i class="bi bi-search"></i>
          </button>
        </div>
      
    </div>
    <div class="row">
      <div class="col-12">
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
import { ref } from 'vue'
export default {
  name: 'TxtAreaTab',
  props: ['data', 'row'],
  emits: ['loadPages'],

  setup(props, { emit }) {

    const pliegoQueryText = ref('');

    const loadPages = () => {
      const pages = window.prompt('Ingresa el rango de paginas, ej: 4-6,7-9')
      if (pages != null) {
        let result = [];
        let parts = pages.split(',');

        // Iteramos sobre cada parte
        parts.forEach(part => {
            // Si el formato es de rango (ej. 4-6)
            if (part.includes('-')) {
                let [start, end] = part.split('-').map(Number); // Dividimos y convertimos a números
                // Añadimos todos los números del rango al array
                for (let i = start; i <= end; i++) {
                    result.push(i);
                }
            } else {
                // Si es un solo número, lo añadimos al array
                result.push(Number(part));
            }
        });

        // Ordenamos y eliminamos duplicados si es necesario
        result = [...new Set(result)].sort((a, b) => a - b);
        //check if result is an array of integers
        if (result.some(x => isNaN(x))) {
          alert('Ingresa un rango de paginas valido, ej: 2,4-6,8-9');
        }else{
          emit('loadPages', [props.row,result]);
        }
      }
    }

    return {
      pliegoQueryText,
      loadPages
    }
  }
}
</script>