import { Store } from '@/store';// path to store file
import mitt from 'mitt'
const emitter = mitt()

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
