<template>
  <div class="hello">
    <button v-permit="'name'"  @click="koutu">抠图</button>
    <button v-permit="'age'" @click="draw">画画</button>
    <button v-permit="'id'" @click="changeBlack">切黑</button>
    <button @click="resetRem(40)">bian</button>
    <div class="now-write">
        <canvas
          id="write"
          style="border: 1px solid #ccc;"
        >

        </canvas>
    </div>
    <div class="kou">
      <canvas
          id="kou"
          style="border: 1px solid #ccc;"
        >

        </canvas>
    </div>
    <div class="back">
      <canvas
          id="write"
          style="border: 1px solid #ccc;"
        >

        </canvas>
    </div>
  </div>
</template>

<script setup>
import { fabric } from 'fabric'
import { onMounted, ref, reactive } from "vue";

// const writeSectionSpec = ref(150);

let canvasWriter = ref({});

let canvasWriterKou = reactive({});

let base64 = ref('');


// let timeout = ref(null);

// let currentValue = reactive({
//   src: '',
// })

// let fabricObj = reactive({
//   src: '',
// })

const changeBlack = () => {
  console.log(canvasWriterKou.value.backgroundColor, 'canvasWriterKou.value.backgroundColor');
  if (canvasWriterKou.value.backgroundColor === '#ccc') {
    canvasWriterKou.value.backgroundColor = 'black'
  } else {
    canvasWriterKou.value.backgroundColor = '#ccc'
  }
}

const draw = () => {
  canvasWriter.value.isDrawingMode = !canvasWriter.value.isDrawingMode;
}

const initKou = () => {
  console.log('xox');
  canvasWriterKou.value = new fabric.Canvas('kou', {
    // fill: "green",
    backgroundColor: 'black',
    // selectionLineWidth: 2,
    width: 700,
    height: 500,
    // isDrawingMode: true,
  });

}

const initWriteBoard = () => {
  console.log('xox');
  canvasWriter.value = new fabric.Canvas('write', {
    // fill: "green",
    backgroundColor: 'white',
    // selectionLineWidth: 2,
    width: 700,
    height: 500,
    isDrawingMode: true,
  });

  canvasWriter.value.freeDrawingBrush.color = '#000';
  // canvasWriter.value.freeDrawingBrush.width = 5;
  canvasWriter.value.freeDrawingBrush.width = 20
  canvasWriter.value.freeDrawingBrush.color = 'black'
}

const koutu = async () => {
  base64.value = canvasWriter.value.toDataURL({
    format: 'image/png',
    quality: 1,
  })
  let koutuImg = await transparentImg(base64.value);
  addImgtoKou(koutuImg);
  // canvasWriterKou.value.add(koutuImg);
  console.log(koutuImg, 'kout');
}

const addImgtoKou = (koutuImg) => {
  new fabric.Image.fromURL(koutuImg, (img) => {
    canvasWriterKou.value.add(img)
  })
}

const transparentImg = (base64) => {
  let imgHandler = document.createElement('canvas')
  let img = new Image();
  let imgHandlerCtx = imgHandler.getContext('2d');
  img.src = base64;
  let imgArr = [];
  let resImgArr = [];
  return new Promise((resolve, reject) => {
    try {
      img.onload = () => {
        imgHandler.width = img.width;
        imgHandler.height = img.height;
        imgHandlerCtx.drawImage(img, 0, 0);
        imgArr = imgHandlerCtx.getImageData(0, 0, img.width, img.height).data;
        autoTransparentImg(imgArr, resImgArr, imgHandlerCtx, img);
        resolve(imgHandler.toDataURL());
      }
    } catch (e) {
      reject(e);
    }
  
  })
}

const autoTransparentImg = (imgArr, resImgArr, imgHandlerCtx, img) => {
  if (imgArr.length === 0) return;
  if (resImgArr.length === 0) {
    resImgArr = imgArr.slice(0);
  }

  // for (let pos = img.width * img.height * 4 - 4; pos >= 0; pos -= 4) {
  //   handleGray(pos, resImgArr);
  // }
  for (let pos = 0; pos < img.width * img.height * 4; pos += 4) {
    handleGray(pos, resImgArr);
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(img.width, img.height);
  imgData.data.set(resImgArr)
  imgHandlerCtx.putImageData(imgData, 0, 0);
}

const handleGray = (pos, resImgArr) => {
  const [r0, g0, b0] = [255, 255, 255];

  const r = resImgArr[pos];
  const g = resImgArr[pos + 1];
  const b = resImgArr[pos + 2];

  const gray = Math.sqrt((r - r0) ** 2) * 0.3 + Math.sqrt((g - g0) ** 2) * 0.59 + Math.sqrt((b - b0) ** 2) * 0.11;

  if (gray <= 60) {
    resImgArr[pos + 3] = 0;
  }
}


onMounted(() => {
  initWriteBoard();
  initKou();
})
</script>

<style scoped>

</style>