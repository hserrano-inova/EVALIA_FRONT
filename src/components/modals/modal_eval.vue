<template>
  <div :class="['modal fade show', { 'modal-win-open': show }]" ref="modalWin">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLiveLabel">
            <i class="bi bi-clipboard-check"></i>
            EVALUACION OFERTA: <strong class="text-secondary" style="margin-left:30px">{{ licitaAlias }}</strong>
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <img v-show="waiting" src="@/assets/img/loading.gif" class="floating_gif" />
          <div class="row">
            <div class="col-8">
              <h4 v-if="ia_response!=''"><i class="bi bi-trophy"></i>&nbsp;Puntuacion : <span class="text-secondary" style="font-size: 1.5em;">{{ puntuacion }}</span></h4>
            </div>

            <div class="col-4">
              <button type="button" class="btn btn-sm btn-warning float-end" @click="evalRun">
                <i class="bi bi-pen"></i>&nbsp;EVALUAR
              </button>
              <button @click="$emit('saveEval')" v-if="ia_response!=''" type="button" style="margin-left:10px;margin-right: 10px;" class="btn btn-sm btn-danger float-end">
                <i class="bi bi-floppy"></i>&nbsp;GUARDAR
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label class="form-label">Evaluacion IA</label>
              <textarea v-model="ia_response" disabled  rows="25" class="form-control is-valid"></textarea>
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

export default {
  name: 'ModalEval',
  emits: ['evalRun','saveEval'],
  setup(props,{emit}) {
    const show = ref(false)
    const waiting = ref(false)
    const licitaAlias = ref("")
    const ia_response = ref("")
    const puntuacion  = ref(0)

    const showModal = (msg) => {
      licitaAlias.value = msg
      waiting.value = false
      ia_response.value = ""
      show.value= true
    }

    const closeModal = () => {
      waiting.value = false
      licitaAlias.value = ""
      ia_response.value = ""
      show.value = false
    }

    const evalRun = () => {
      ia_response.value = ""
      waiting.value = true
      emit('evalRun')
    }

    const evalShow = (response,points) => {
      waiting.value = false
      ia_response.value = response
      puntuacion.value = points
    }

    return { 
      show, 
      waiting, 
      licitaAlias,
      ia_response,
      puntuacion,
      showModal,
      closeModal,
      evalRun,
      evalShow
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