<template>
<div>
  <VHead :data="header_data" ref="vhead" 
    @printBnt="printBnt"
    @del="delEval"
  />
  <div class="accordion">
    <div class="row" style="text-align: center;">
      <h2>{{ data['licitacion'] }} / <span class="text-info">{{ data['ofA'] }}</span>&nbsp; - vs - &nbsp; <span class="text-info">{{ data['ofB'] }}</span></h2>
      <hr/>
    </div>
    <div class="row">
      <div class="accordion-item" v-for="r,i in data['sections']" :key="i">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+i" aria-expanded="false" :aria-controls="i">
            <strong style="margin-right:10px">{{ r['seccion']}}</strong>
          </button>
        </h2>
        <div :id="i" class="accordion-collapse collapse" aria-labelledby="headingOne" :data-bs-parent="'#'+i" style="">
          <div class="accordion-body" >
            <button class="btn btn-sm btn-info" @click="copycontent(r['comparacion'][0])">
              <i class="bi bi-clipboard-check"></i>&nbsp;Copiar
            </button>
            <br/><br/>
            <textarea  disabled  rows="25" class="form-control is-valid">{{r['comparacion'][0]}}</textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {ref, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from '@/authreq/axios';
import VHead from '@/components/navbar/viewheader.vue'

export default{
    name: 'ComparacionesDataView',  
    components: { VHead },
    setup() {
      const route = useRoute()
      const router = useRouter()
      const idComp = ref(0)
      const vhead = ref(null)
      const data = ref([])
      const puntos = ref(0)

      const queryData = async () => {
        await axios.get('/comparaciones/' + idComp.value  )
        .then((response) => {
          data.value=response.data
          let sum =0
          for (let i = 0; i < data.value.sections.length; i++) {
            sum += parseFloat(data.value['sections'][i]['puntos'])
          }
          puntos.value = sum
        })
        .catch((error) => {
          vhead.value.showaviso(1, error)
        })
      };

      const printBnt = async () => {
        try {
          const response = await axios.get('/printeval/' + idComp.value, {
                  responseType: 'blob'
              });
              const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
              const pdfUrl = URL.createObjectURL(pdfBlob);
              
              // Abrir el PDF en una nueva ventana
              const newWindow = window.open(pdfUrl, '_blank');
              if (!newWindow) {
                  alert('Por favor, permite las ventanas emergentes para este sitio.');
              }
          } catch (error) {
            vhead.value.showaviso(1, error)
          }
      }

      const delEval = async ()=>{
        await axios.delete('/comparaciones/' + idComp.value  )
          .then(() => {
            router.push('/cview' )
          })
          .catch((error) => {
            vhead.value.showaviso(1, error)
          })
      }

      const copycontent =(txt)=>{
        //copy variable data to clipboard
        navigator.clipboard.writeText(
          txt
        )
        alert("Copiado!!")
      }

      onMounted(() => {
        const p = route.query
        if (Object.prototype.hasOwnProperty.call(p, 'id')) {
          idComp.value = p.id
          queryData()
        }
      })

    return {
      vhead,
      header_data: { title: "Comparacion", icon: "bi-bank", btn: ['del'] },
      data,
      puntos,
      queryData,
      printBnt,
      delEval,
      copycontent
    }
  }

}
</script>
