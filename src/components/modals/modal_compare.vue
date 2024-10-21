<template>
  <div :class="['modal fade show', { 'modal-win-open': show }]" ref="modalWin">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLiveLabel">
            <i class="bi bi-arrow-left-right"></i>
            COMPARACION OFERTAS
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <img v-show="waiting" src="@/assets/img/loading.gif" class="floating_gif" />

          <div class="row">
            <div class="col-4">
              <h5>OFERTA A</h5>
              <select class="form-select" v-model="ofA">
                <option value="0">SELECCIONA UNA OFERTA</option>
                <option v-for="of,i in ofertas" :key="i" :value="of['id']">{{of['alias']}}</option>
                <!-- <option value="3">MODELO OPEN</option> -->
              </select> 
            </div>
            <div class="col-4">
              <h5>OFERTA B</h5>
              <select class="form-select" v-model="ofB">
                <option value="0">SELECCIONA UNA OFERTA</option>
                <option v-for="of,i in ofertas" :key="i" :value="of['id']">{{of['alias']}}</option>
                <!-- <option value="3">MODELO OPEN</option> -->
              </select> 
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-sm btn-warning float-end" @click="evalRun">
                <i class="bi bi-pen"></i>&nbsp;EVALUAR
              </button>
              <button @click="saveEval" v-if="ia_response!=''" type="button" style="margin-left:10px;margin-right: 10px;" class="btn btn-sm btn-danger float-end">
                <i class="bi bi-floppy"></i>&nbsp;GUARDAR
              </button>
            </div>
            <hr style="margin-top: 10px;">
          </div>

          <div class="row">
            <div class="col-12">
              <hr v-if="ia_response!=''">
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
  props: ['ofertas'],
  setup(props,{emit}) {
    const show = ref(false)
    const waiting = ref(false)
    const ia_response = ref("")
    const selectedmodel = ref(2)
    const ofA = ref("0")
    const ofB = ref("0")

    const showModal = () => {
      waiting.value = false
      ia_response.value = ""
      show.value= true
    }

    const closeModal = () => {
      waiting.value = false
      ia_response.value = ""
      show.value = false
    }

    const evalRun = () => {
      if(ofA.value==0 || ofB.value==0){
        alert("SELECCIONA OFERTAS")
        return
      }
      ia_response.value = ""
      waiting.value = true
      emit('evalRun',[ofA.value, ofB.value])
    }

    const saveEval = () => {
      if(ia_response.value == ""){
        alert("COMARATIVa EN BLANCO")
        return
      }
      waiting.value = true
      emit('saveEval',[ofA.value, ofB.value])
    }

    const evalShow = (response) => {
      waiting.value = false
      ia_response.value = response
    }

    return { 
      show, 
      waiting, 
      ia_response,
      selectedmodel,
      ofA,
      ofB,
      showModal,
      closeModal,
      evalRun,
      evalShow,
      saveEval
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