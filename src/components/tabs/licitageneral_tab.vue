<template>
  <div class="row" style="margin-top: 30px;" v-if="data">
    <!-- -----------------------------PROMOTOR----------------------------- -->
    <div class="col-lg-4 right-border">
      <legend>{{$t('Promotor')}}</legend>
      <hr />

      <div class="row">
        <div class="mb-3">
          <label for="rsocial" class="form-label">{{ $t('NLicitacion') }}</label>
          <textarea class="form-control form-control-sm" v-model="data.nombre">{{ data.nombre }}</textarea>
        </div>
      </div>

      <div class="row">

        <div class="col-6">
          <fieldset disabled="">
            <label class="form-label" for="disabledInput">{{$t('Actualizada')}}</label>
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
        <hr/>
      </div>

      <div class="row" v-if="data.id!=null">
        <legend>{{$t('Pliego')}}
        <button  v-if="choosed_pliego_file" @click="uploadPliegoFile" class="btn btn-secondary btn-sm" style="float:right">
          <i class="bi bi-upload"></i>
        </button>
        </legend>
        <hr />
        <div >
          <input ref="inputUploadPliego" @change="selectedFilePliegoChange" class="form-control" type="file" id="formFile">
          <br/>
          <!-- <a :href="'https://evalia.inovalabs.es/api/static/pliegos/' + data.licitacion_fname" type="application/pdf" width="100%" height="600px" target="_blank">{{data.licitacion_fname}}</a> -->
          <FileGroup :data="data.licitacion_fname" :selpdf="selpdf" @selDoc="selPliego" @delDoc="delPliego"/>
          <!-- [{'alias':'jerbas','filename':'FTC823460_0.pdf','tipo':'pdf'}] -->
        </div>
        <hr />

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
      <legend>{{$t('Ofertas')}}
        <button v-if="choosed_file" @click="uploadFile" class="btn btn-secondary btn-sm" style="float:right">
          <i class="bi bi-upload"></i>
        </button>
      </legend>
      <hr />
      <div v-if="data.id!=null">
        <input ref="inputUpload" @change="selectedFileChange" class="form-control" type="file" id="formFile">
      </div>
      <hr />
      <OFSelector :data="data.ofertas" @delOF="$emit('delOF',$event)" :selectonly="false"  />
    </div>

    <!-- -----------------------------EVALUACIONES----------------------------- -->
    <div class="col-lg-5">
      <legend>{{$t('Evaluaciones')}}</legend>
      <hr />
      <STable v-if="dataEval.length>0" :data="dataEval" :columns="eval_columns" :filters="filters" @rowClick="$emit('evalRowClick', $event)" />
      <hr>
      <div v-if="dataComp.length>0">
        <legend>Comparaciones</legend>
        <hr />
        <STable :data="dataComp" :columns="comp_columns" :filters="filters" @rowClick="$emit('compRowClick', $event)" />
      </div>
    </div>

  </div>
</template>

<script>
import { ref, inject } from 'vue' //watch
import STable from '@/components/smart_table/smart_table.vue';
import FileGroup from '@/components/controls/list_file_group.vue';
import OFSelector from '@/components/controls/of_selector.vue';

export default {
  name: 'LGeneral',
  props: ['data', 'dataEval', 'dataComp' ,'selpdf'],
  emits: ['rowClick','selPliego', 'delPliego', 'selDoc', 'delDoc', 'uploadFile', 'uploadPliegoFile', 'evalRowClick', 'compRowClick'],
  components: { STable, FileGroup, OFSelector },

  setup(props, { emit }) {
    const settings = inject('settings');
    const choosed_file = ref("")
    const selectedFile = ref(null)
    const inputUpload = ref(null)
    const selectedPliegoFile  = ref(null)
    const choosed_pliego_file = ref(null)

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

    const selPliego = (fname) => {
      emit('selPliego', fname)
    }

    const delPliego = (fname) => {
      emit('delPliego', fname)
    }

    const uploadFile = () => {
      emit('uploadFile', selectedFile.value)
      inputUpload.value.value = ''
    }

    const uploadPliegoFile = () => {
      emit('uploadPliegoFile', selectedPliegoFile.value)
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

    const selectedFilePliegoChange = (e) => {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        selectedPliegoFile.value = e.target.files[0];
        choosed_pliego_file.value = true
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
      eval_columns: ['oferta', 'actualizada'],
      comp_columns: ['ofA', 'ofB', 'actualizada'],
      choosed_file,
      inputUpload,
      linkClick,
      selPliego,
      delPliego,
      uploadFile,
      selectedFileChange,
      choosed_pliego_file,
      selectedFilePliegoChange,
      formattedDate,
      uploadPliegoFile
    }
  }
}
</script>