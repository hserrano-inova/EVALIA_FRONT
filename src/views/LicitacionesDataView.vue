<template>
  <div>
    <ModalE ref="modal_evalua" title="Evaluacion" @evalRun="evalRun" @saveEval="saveEval"/>
    <div class="row">
      <VHead :data="header_data" ref="vhead" @new="newreg" @save="saveData" @del="delData" />
      <div class="col-12">
        <img v-show="waiting" src="@/assets/img/loading.gif" class="floating_gif" />
        
        <LTabs :data="data" :tabs="tabs" :dataEval="dataEval"
        @selTab="selTab"
        @addTab="addTab" 
        @delTab="delTab"
        @evalTab="evalmodal" 
        @selDoc="selDoc" 
        @delDoc="delDoc" 
        @uploadFile="uploadFile"
        @evalRowClick="evalRowClick"
        />
      </div>
    </div>
  </div>
  </template>

<script>
import {ref, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from '@/authreq/axios';
import VHead from '@/components/navbar/viewheader.vue'
import LTabs from '@/components/tabs/tabcontrol.vue'
import ModalE from '@/components/modals/modal_eval.vue'

export default {
  name: 'LicitacionesDataView',
  components: { VHead ,LTabs, ModalE},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const data = ref([])
    const dataEval = ref({})
    const tabs = ref([])
    const idLicita = ref(0)
    const selectedTab = ref(0)
    const selectedOf = ref("")
    const selectedOfAlias = ref("")
    const waiting = ref(false)
    const vhead = ref(null)
    const modal_evalua = ref(null)
    const ia_response = ref("")
    const ia_section_points = ref(0)

    const renderTabs = () => {
      tabs.value = [{ 'header': 'general', 'tipo': 'lgeneral','badge':data.value['pmax'], 'fields': [] , "selindex":selectedTab.value}]
      for (let i = 0; i < data.value.secciones.length; i++) {
        const s = data.value.secciones[i]
        tabs.value.push({ 'header': s['tabtxt'], 'tipo': 'seccion', 'badge': s['puntuacion'], 'fields': [] , "selindex":selectedTab.value})
      }
    }

    const check_points = ()=>{
      let max = data.value['pmax']
      let sum = 0
      for (let i = 0; i < data.value.secciones.length; i++) {
        sum += data.value.secciones[i]['puntuacion']
      }
      if(sum != max)
        vhead.value.showaviso(1, `Las puntuaciones no coinciden ${sum} de ${max}`)
      else if(max>0)
        vhead.value.showaviso(0, "Puntuaciones y secciones correctas")
    }

    const queryData = async () => {
        await axios.get('/licitaciones/' + idLicita.value  )
        .then((response) => {
          //console.log(response.data)
          data.value=response.data
          queryEvaluacionesData()
          renderTabs()
          check_points()
        })
        .catch((error) => {
          vhead.value.showaviso(1, error)
        })
    };

    const queryEvaluacionesData = async () => {
        await axios.get('/evaluaciones/licita/' + idLicita.value )
        .then((response) => {
          //console.log(response.data)
          dataEval.value=response.data
        })
        .catch((error) => {
          console.log(error)
        })
    };
  
    const saveData = async () => {
      //const method = id.value == '0' ? 'createlicita' : 'updatelicita'
      data.value.actualizada = new Date()

      if(data.value.nombre !=''){
        if(idLicita.value == '0'){
          await axios.post('/licitaciones/',
          JSON.stringify(data.value),
          {headers: {'Content-Type': 'application/json'}}
        )
          .then(() => {
            router.push('/lview')
          })
          .catch((error) => {
            vhead.value.showaviso(1, error)
          })
        }else{
          await axios.put('/licitaciones/' + idLicita.value ,
          JSON.stringify(data.value),
          {headers: {'Content-Type': 'application/json'}}
         )
          .then(() => {
            queryData()
            vhead.value.showaviso(0, "OK")
          })
          .catch((error) => {
            vhead.value.showaviso(1, error)
          })
        }
      }else{
        vhead.value.showaviso(1, "Falta el nombre de la licitación")
      }
    }

    const delData = async () => {
      await axios.delete('/licitaciones/' + idLicita.value  )
        .then(() => {
          //console.log(response.data)
          router.push('/lview')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const selTab = (indx) => {
      selectedTab.value=indx+1
      renderTabs()
    }

    const addTab = () => {
      //if(idLicita.value == '0'){
      // vhead.value.showaviso(1, 'Debes guardar primero la licitación antes de generar las secciones.')
      //  return
      //}
      const t = prompt("Nombre de la sección?")
      if (t != '') {
        data.value.secciones.push({ 'tabtxt': t.replace(/ /g, "_"), 'header': '', 'pliego': '', 'criterio': '', 'puntuacion': 0 })
        selectedTab.value = data.value.secciones.length
        renderTabs()
      }
    }

    const delTab = (indx) => {
      let c = confirm("Desea borrar esta seccion?")
      if (c) {
        //remove from this.data.secciones at possition indx
        data.value.secciones.splice(indx, 1)
        renderTabs()
      }
    }

    const selDoc = (ofid) => {
      selectedOf.value=ofid
      const al = (data.value.ofertas.find((obj) => obj['id'] === ofid))
      selectedOfAlias.value=al['alias']
      vhead.value.showaviso(0, `Evaluando oferta --> ${al['alias']}`)

    }

    const delDoc = async (idof) => {
      let c = confirm("Desea elimiar la oferta?")
      if (c) {
        let c2 = confirm("Seguro?")
        if(c2){
          waiting.value = true
          await axios.delete('/oferta/' + idof+ '/' + idLicita.value)
            .then(() => {
              waiting.value = false
              queryData()
            })
            .catch((error) => {
              vhead.value.showaviso(1, error)
            }) 
        }
        selectedOf.value = ""
      }
    }

    const uploadFile = async (e) => {
      const t = prompt("Escribe un nombre para la oferta")
      if (t != '') {
        const formData = new FormData();
  
        formData.append('file', e);
        formData.append('id', idLicita.value);
        formData.append('alias', t);
  
        waiting.value = true;
        let url ='https://evalia.inovalabs.es/api/uploadfile/'
        if(import.meta.env.VITE_APP_DEBUG == 1){
          url='http://localhost:8000/uploadfile/'
        }
        await axios.post(url,
          formData,
          {headers: {'Content-Type': 'multipart/form-data'}}
        )
        .then(() => {
          waiting.value = false;
          queryData()
        })
        .catch((error) => {
          vhead.value.showaviso(1, error)
        })
        selectedOf.value = ""
      }
    }

    const evalmodal = () => {  
      if(selectedOf.value != ''){
        ia_response.value = ""
        ia_section_points.value = 0
        modal_evalua.value.showModal(selectedOfAlias.value)
      }else{
        vhead.value.showaviso(1, "Primero debes cargar una oferta")
      }
    }

    const evalRun = async (model) => {
      ia_response.value = ""
      ia_section_points.value = 0
      console.log(selectedTab.value)
       await axios.post('/evalua',
          JSON.stringify({
              "idl": idLicita.value,
              "idof": selectedOf.value,
              'sect': selectedTab.value,
              'model': model
             }
           ),
           {headers: {'Content-Type': 'application/json'}}
        )
        .then((response) => {
          ia_response.value = response.data
          const regex = /<puntuacion>(.*?)<\/puntuacion>/g;

          let match;
          while ((match = regex.exec(ia_response.value)) !== null) {
            ia_section_points.value = match[1]
          }

          modal_evalua.value.evalShow(ia_response.value, ia_section_points.value)
        })
        .catch((error) => {
          modal_evalua.value.evalShow(error)
        })
    }

    const saveEval = async () => {
      await axios.post('/evaluaciones',
          JSON.stringify({
            "id_licitacion":idLicita.value,
            "licitacion":data.value.nombre,
            "oferta":selectedOfAlias.value,
            "seccion":data.value['secciones'][selectedTab.value]['tabtxt'],
            "evaluacion":ia_response.value,
            "puntos": ia_section_points.value,
            "pmax": data.value['pmax']
     }),
          {headers: {'Content-Type': 'application/json'}}
        )
        .then(() => {
          modal_evalua.value.closeModal()
          queryData()
        })
        .catch((error) => {
          vhead.value.showaviso(1, error)
          modal_evalua.value.evalShow(error)
        })
    }

    const evalRowClick = (row) => {
      console.log(row.pos)
      router.push({
        name: 'edata',
        query: { id: dataEval.value[row.pos].id }
      })
    }

    onMounted(() => {
      const p = route.query
      if (Object.prototype.hasOwnProperty.call(p, 'id')) {
        idLicita.value = p.id
        queryData()
      }
    })

    return { 
      data,
      dataEval,
      tabs,
      selectedTab,
      selectedOf,
      selectedOfAlias,
      header_data: { title: "Licitacion", icon: "bi-bank", btn: ['save', 'del'] },
      waiting,
      vhead,
      modal_evalua,
      ia_response,
      ia_section_points,
      queryData,
      queryEvaluacionesData,
      renderTabs,
      saveData,
      delData,
      selTab,
      addTab,
      delTab,
      selDoc,
      delDoc,
      uploadFile,
      check_points,
      evalmodal,
      evalRun,
      saveEval,
      evalRowClick
    };
  }
}
</script>
