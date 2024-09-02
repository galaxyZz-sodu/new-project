<template>
  <div>
      <!-- <button @click="postWokerMessagexixi">传</button>
      <button @click="add">哈哈</button>
      <div class="test">
        你数
      </div> -->
      <canvasBoard />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import canvasBoard from './components/canvas-board.vue'
// import Worker from 'worker-loader!@/woker/test.woker.js';

// const add = () => {
//   console.log('点了');
// }

// const postWokerMessage = () => {
//   const woker = new Worker();
//   console.log('洗澡线程开启');
//   let length_1 = 3000000000;
//   console.time('洗澡时长');
//   woker.postMessage(length_1);
//   woker.onmessage = (e) => {
//     console.log('洗完了', e.data)
//     console.timeEnd('洗澡时长');
//     // console.log('洗澡线程关闭');
//     woker.terminate();
//   }

    // let length_2 = 3000000000;
    // console.time('洗衣服时长');
    // let sum2 = 0
    // for (let i = 0; i <= length_2; i++) {
    //     sum2 += i
    // }
    // console.log(sum2);
    // console.timeEnd('洗衣服时长');
    // console.log('洗衣服加时', sum2);
// };

// const postWokerMessage2 = () => {
//   const woker = new Worker();
//   console.log('洗澡2线程开启');
//   let length_2 = 2000000000;
//   console.time('洗澡2时长2');
//   woker.postMessage(length_2);
//   woker.onmessage = (e) => {
//     console.log('洗完了', e.data)
//     console.timeEnd('洗澡2时长2');
//     // console.log('洗澡线程关闭');
//     woker.terminate();
//   }
// };

// const postWokerMessagexixi = () => {
//     postWokerMessage();
//     postWokerMessage2();
// }

onMounted(() => {
    // let length_2 = 3000000000;
    // console.time('洗衣服时长');
    // let sum2 = 0
    // for (let i = 0; i <= length_2; i++) {
    //     sum2 += i
    // }
    // console.log(sum2);
    // console.timeEnd('洗衣服时长');
    // console.log('洗衣服加时', sum2);
    
})
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.test {
  width: 200px;
  height: 200px;
  background-color: red;
  /* font-size: 14px; */
}
</style>
