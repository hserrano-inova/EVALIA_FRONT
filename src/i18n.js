// i18n.js
import { createI18n } from 'vue-i18n';

// Traducciones en distintos idiomas
const messages = {
  es: {
    Licitaciones: 'Licitaciones',
    Evaluaciones:'Evaluaciones',
    Comparaciones:'Comparaciones',
    Evaluar:'EVALUAR',
    Guardar:'GUARDAR',
    Copiar:'Copiar',
    GENERAL:'GENERAL',
    Selecciona:'SELECCIONA',
    Promotor:'Promotor',
    NLicitacion:'Nombre Licitacion',
    Actualizada:'Actualizada',
    Pliego:'Pliego',
    Ofertas:'Ofertas',
    Puntuacion:'Puntuación',
    LoadPliego:'Cargar Pliego',
    EvIndividual:'Eval. Individual',
    EvComparativa:'Eval. Comparativa',
    DelApartado:'Borrar Apartado',
    PlaceholdeConsultaPliego:'Consulta sobre el pliego...',
    ModLogico:'MODELO LÓGICO',
    ModCreativo:'MODELO CREATIVO',
  },
  ga: {
    Licitaciones: 'Licitacións',
    Evaluaciones:'Avaliacións',
    Comparaciones:'Comparacións',
    Evaluar:'AVALIAR',
    Guardar:'MANTER',
    Copiar:'Copiar',
    GENERAL:'XERAL',
    Selecciona:'SELECCIONA',
    Promotor:'Promotor',
    NLicitacion:'Nome Licitación',
    Actualizada:'Actualizada',
    Pliego:'Pliego',
    Ofertas:'Ofertas',
    Puntuacion:'Puntuación',
    LoadPliego:'Cargar Pliego',
    EvIndividual:'Aval. Individual',
    EvComparativa:'Aval. Comparativa',
    DelApartado:'Eliminar sección',
    PlaceholdeConsultaPliego:'Consulta sobre o pliego...',
    ModLogico:'MODELO LÓXICO',
    ModCreativo:'MODELO CREATIVO',
  },
  pt: {
    Licitaciones: 'Propostas',
    Evaluaciones:'Avaliações',
    Comparaciones:'Comparações',
    Evaluar:'AVALIAR',
    Guardar:'MANTER',
    Copiar:'Cópia',
    GENERAL:'GERAL',
    Selecciona:'SELECCIONE',
    Promotor:'Promotor',
    NLicitacion:'Nome proposta',
    Actualizada:'Atualizado',
    Pliego:'Folha',
    Ofertas:'Ofertas',
    Puntuacion:'Pontuação',
    LoadPliego:'Carregar uma folha',
    EvIndividual:'Aval. Individual',
    EvComparativa:'Aval. Comparativa',
    DelApartado:'Apagar seção',
    PlaceholdeConsultaPliego:'Consulta sobre as especificações...',
    ModLogico:'MODELO LÓGICO',
    ModCreativo:'MODELO CRIATIVO',
  },
  // Agrega más idiomas aquí...
};

// Crear instancia de i18n
const i18n = createI18n({
  locale: localStorage.getItem('language') || 'en', // idioma por defecto
  fallbackLocale: 'es', // idioma de respaldo
  messages, // mensajes de traducción
});

export default i18n;
