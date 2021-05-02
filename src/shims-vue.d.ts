/* eslint-disable */
import mitt from 'mitt';

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
/*
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    emitter: mitt;
  }
}
*/
