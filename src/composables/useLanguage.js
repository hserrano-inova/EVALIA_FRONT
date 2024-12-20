import { ref } from 'vue';

export function useLanguage() {
  const language = ref('es'); // Idioma predeterminado

  const setLanguage = (lang) => {
    language.value = lang;
    localStorage.setItem('language', lang);
    window.location.reload();
  };

  return { language, setLanguage };
}