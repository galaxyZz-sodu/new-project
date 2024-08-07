import { createApp } from 'vue'
import App from './App.vue'
// import fabric from "fabric"
import { directives } from '@/utils/permission'
import './utils/rem';

const app = createApp(App)
// const perObj = {
//     name: true,
//     age: true,
//     id: false,
// }
// app.directive('permit', {
        
//     mounted(el, binding) {
//         console.log(binding, 'binding');
//         perObj[binding.value] ? {} : el.parentNode.removeChild(el);
//     }
// })
directives(app);
// app.use(fabric)
app.mount('#app')


// directives(app);
// createApp(App).mount('#app').use(fabric)
