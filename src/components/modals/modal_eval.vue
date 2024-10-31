<template>
  <div :class="['modal fade show', { 'modal-win-open': show }]" ref="modalWin">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLiveLabel">
            <i class="bi bi-clipboard-check"></i>
            {{ $t('Evaluaciones') }}&nbsp;{{ $t('Ofertas') }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <img v-show="waiting" src="@/assets/img/loading.gif" class="floating_gif" />
          <div class="row">
            <div class="col-4">
              <select class="form-select" v-model="selectedmodel">
                <option value="2" selected>{{ $t('ModLogico') }}</option>
                <option value="1">{{ $t('ModCreativo') }}</option>
                <!-- <option value="3">MODELO OPEN</option> -->
              </select> 
            </div>
            <div class="col-8">
              <button type="button" class="btn btn-sm btn-warning float-end" @click="evalRun">
                <i class="bi bi-pen"></i>&nbsp;{{ $t('Evaluar') }}
              </button>
              <button @click="$emit('saveEval')" v-if="ia_response!=''" type="button" style="margin-left:10px;margin-right: 10px;" class="btn btn-sm btn-danger float-end">
                <i class="bi bi-floppy"></i>&nbsp;{{ $t('Guardar') }}
              </button>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-9">
              <h4 v-if="ia_response!=''"><i class="bi bi-trophy"></i>&nbsp;Puntuacion : <span class="text-secondary" style="font-size: 1.5em;">{{ puntuacion }}</span></h4>
              <hr v-if="ia_response!=''">
              <label class="form-label">{{ $t('Evaluaciones') }} IA</label>
              <button v-if="ia_response!=''" type="button" class="btn btn-sm btn-info" style="margin-left:10px;" @click="copycontent(ia_response)">
                <i class="bi bi-clipboard-check"></i>&nbsp;{{ $t('Copiar') }}
              </button>
              <textarea v-model="ia_response" disabled  rows="25" class="form-control is-valid"></textarea>
            </div>
            <div class="col-3">
              <label class="form-label">{{ $t('Ofertas') }}</label>
              <OFSelector :data="ofertas" @selOF="$emit('selOF',$event)" :selectonly="true"  />
            </div>
          </div>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {ref} from 'vue';
import OFSelector from '@/components/controls/of_selector.vue';

export default {
  name: 'ModalEval',
  emits: ['evalRun','saveEval','selOF'],
  props: ['ofertas'],
  components: { OFSelector },
  setup(props,{emit}) {
    const show = ref(false)
    const licitaAlias = ref("")
    const ia_response = ref("")
    const puntuacion  = ref(0)
    const selectedmodel = ref(2)

    const showModal = (msg) => {
      licitaAlias.value = msg
      ia_response.value = ""
      show.value= true
    }

    const closeModal = () => {
      licitaAlias.value = ""
      ia_response.value = ""
      show.value = false
    }

    const evalRun = () => {
      ia_response.value = ""
      emit('evalRun',selectedmodel.value)
    }

    const evalShow = (response,points) => {
      
      ia_response.value = response
      puntuacion.value = points
    }

    const copycontent =(txt)=>{
      //copy variable data to clipboard
      navigator.clipboard.writeText(
        txt
      )
      alert("Copiado!!")
    }

    return { 
      show, 
      licitaAlias,
      ia_response,
      puntuacion,
      selectedmodel,
      showModal,
      closeModal,
      evalRun,
      evalShow,
      copycontent
    }
  },

    // evalRun() {
    //   this.waiting = true
    //   axios
    //     .post(
    //       import.meta.env.VITE__APP_DOMAIN + '/api/evalua',
    //       {
    //         "id": this.id[0],
    //         "seccion": this.id[1],
    //         "oferta": this.id[2],
    //         "net": this.net,
    //         "temp": this.tempratura
    //       },
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization:
    //             'Bearer ' + 'ZecmY'
    //         }
    //       }
    //     )
    //     .then((response) => {
    //       this.waiting = false
    //       console.log(response.data)
    //       this.evalia = response.data[0].text
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // }

}
</script>