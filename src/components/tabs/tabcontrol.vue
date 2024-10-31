<template>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation" v-for="t, i in tabs" :key="i">
      <a :class="['nav-link', { 'active': i==t.selindex}]" data-bs-toggle="tab" :href="'#' + t.header" aria-selected="false"
        role="tab" tabindex="-1" @click.prevent="$emit('selTab', i-1)">
        {{ $t(t.header.toUpperCase()) }}
        <span :class="['badge', { 'bg-light': i > 0, 'bg-warning': i == 0 }]">{{ t.badge }}</span>
      </a>
    </li>
    <li class="nav-item" role="presentation">
      <a :class="['nav-link']" href="#" data-bs-toggle="tab" @click.prevent="$emit('addTab')"
        aria-selected="false" role="tab" tabindex="-1">
        <i class="bi bi-plus-circle"></i>
      </a>
    </li>
  </ul>
  <div id="myTabContent" class="tab-content">
    <div v-for="t, i in tabs" :key="i" :class="['tab-pane fade', { 'show active': i == t.selindex}]" :id="t.header"
      role="tabpanel">
      <div v-if="t.tipo == 'seccion'">
        <SeccionTab :data="data" :row="i - 1" 
          @delTab="$emit('delTab', $event)"
          @evalTab="$emit('evalTab', $event)" 
          @evalTabComp="$emit('evalTabComp', $event)"
          @loadPages="$emit('loadPages', $event)"
          @pliegoQuery="$emit('pliegoQuery', $event)"/>
      </div>
      <div v-else-if="t.tipo == 'lgeneral'">
        <LicitaGeneral :data="data" :dataEval="dataEval" :dataComp="dataComp" :selpdf="selpdf"
          @rowClick="$emit('rowClick', $event)" 
          @selPliego="$emit('selPliego', $event)" 
          @delPliego="$emit('delPliego', $event)" 
          @delOF="$emit('delOF', $event)" 
          @uploadFile="$emit('uploadFile', $event)"
          @uploadPliegoFile="$emit('uploadPliegoFile', $event)"
          @evalRowClick="$emit('evalRowClick', $event)"
          @compRowClick="$emit('compRowClick', $event)"
        />
      </div>
    </div>
  </div>

</template>

<script>
import SeccionTab from '@/components/tabs/seccion_tab.vue'
import LicitaGeneral from '@/components/tabs/licitageneral_tab.vue'

export default {
  name: 'LTabs',
  props: ['data','tabs', 'dataEval', 'dataComp','selpdf'],
  components: { SeccionTab, LicitaGeneral },

}
</script>

<style scoped>
textarea {
  width: 100%;
}
</style>