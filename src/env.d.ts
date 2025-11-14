/// <reference types="vite/client" />

declare module 'vue-i18n' {
  import { DefineComponent } from 'vue'
  export interface DefineLocaleMessage { }
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
