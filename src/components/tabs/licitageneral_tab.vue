<template>
  <div class="row" style="margin-top: 30px;" v-if="data">
    <!-- -----------------------------PROMOTOR----------------------------- -->
    <div class="col-lg-4 right-border">
      <legend>Promotor</legend>
      <hr />

      <div class="row">
        <div class="mb-3">
          <label for="rsocial" class="form-label">Nombre Licitacion</label>
          <textarea class="form-control form-control-sm" v-model="data.nombre">{{ data.nombre }}</textarea>
        </div>
      </div>

      <div class="row">

        <div class="col-6">
          <fieldset disabled="">
            <label class="form-label" for="disabledInput">Actualizada</label>
            <input class="form-control form-control-sm" type="text" :placeholder="data.actualizada" disabled="">
          </fieldset>
        </div>
        <div class="col-3"></div>
        <div class="col-3">
          <fieldset>
            <label class="form-label" for="disabledInput">MAX</label>
            <input class="form-control form-control-sm bold-inputbox" type="number" v-model="data.pmax">
          </fieldset>
        </div>

      </div>

      <div class="row">
        <div class="col-12">
        <br/>
        <fieldset>
          <div class="input-group mb-3">
            <span class="input-group-text" @click="linkClick">Link</span>
            <input type="text" class="form-control form-control-sm" :value="data.enlace">
          </div>
        </fieldset>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="mb-3">
            <label class="form-label mt-4">Observaciones</label>
            <textarea rows=5 class="form-control is-valid"
              v-model="data.observaciones">{{ data.observaciones }}</textarea>
          </div>
        </div>
      </div>

    </div>

    <!-- -----------------------------OFERTAS----------------------------- -->
    <div class="col-lg-3 right-border">
      <legend>Ofertas
        <button v-if="choosed_file" @click="uploadFile" class="btn btn-secondary btn-sm" style="float:right">
          <i class="bi bi-upload"></i>
        </button>
      </legend>
      <hr />
      <div v-if="data.id!=null">
        <input ref="inputUpload" @change="selectedFileChange" class="form-control" type="file" id="formFile">
      </div>
      <hr />
      <div class="list-group">
        <a href="#" v-for="of, i in data.ofertas" :key="i"
          :class="['list-group-item list-group-item-action', { 'active': seldoc == of.id }]">
          <p @click="selDoc(of.id)">
            <i class="bi bi-arrow-down-right-square"></i> &nbsp; {{ of.alias }}
          </p>
          <i class="bi bi-trash" style="float:right" @click="delDoc(of.id)"></i>
          {{ formattedDate(of.fecha) }}
        </a>
      </div>
    </div>

    <!-- -----------------------------EVALUACIONES----------------------------- -->
    <div class="col-lg-5">
      <legend>Evaluaciones
        <!-- <button v-if="seldoc!=''" @click="uploadFile" class="btn btn-warning btn-sm" style="float:right">
          <i class="bi bi-pen"></i>&nbsp;Iniciar evaluacion completa
        </button> -->
      </legend>
      <hr />
      <STable :data="dataEval" :columns="eval_columns" :filters="filters" @rowClick="$emit('evalRowClick', $event)" />
    </div>

  </div>
</template>

<script>
import { ref, inject } from 'vue' //watch
import STable from '@/components/smart_table/smart_table.vue';

export default {
  name: 'LGeneral',
  props: ['data', 'dataEval'],
  emits: ['rowClick', 'selDoc', 'delDoc', 'uploadFile'],
  components: { STable },
  setup(props, { emit }) {
    const settings = inject('settings');
    const seldoc = ref("")
    const choosed_file = ref("")
    const selectedFile = ref(null)
    const inputUpload = ref(null)

    const formattedDate = (dateStr) => {
      const dateObj = new Date(dateStr);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const linkClick = () => {
      window.open("", '_blank');
    }
    const selDoc = (ofid) => {
      let c = confirm("Desea cargar la oferta?")
      if (c) {
        seldoc.value = ofid
        emit('selDoc', ofid)
      } else {
        seldoc.value = ""
      }
    }

    const delDoc = (id) => {
      seldoc.value = id
      emit('delDoc', id)
    }

    const uploadFile = () => {
      emit('uploadFile', selectedFile.value)
      inputUpload.value.value = ''
    }

    const selectedFileChange = (e) => {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        selectedFile.value = e.target.files[0];
        choosed_file.value = true
      } else {
        alert('Solo se aceptan archivos PDF')
      }
    }

    // watch(
    //   () => props.data,
    //   (newValue, oldValue) => {
    //     console.log('Data changed from', oldValue, 'to', newValue);
    //     // Perform any other logic when props.data changes
    //   }
    // );

    return {
      settings,
      seldoc,
      eval_columns: ['oferta', 'actualizada'],
      choosed_file,
      inputUpload,
      linkClick,
      selDoc,
      delDoc,
      uploadFile,
      selectedFileChange,
      formattedDate
    }
  }
}
</script>